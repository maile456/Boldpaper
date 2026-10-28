#!/usr/bin/env node
import { constants } from 'node:fs';
import { copyFile, lstat, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('../assets/starter/', import.meta.url));
const requiredFiles = [
  'dist/index.html',
  'dist/tokens.css',
  'dist/styles.css',
  'dist/app.js',
  'scripts/serve.mjs',
  'scripts/check.mjs',
  'package.json',
];

function showHelp() {
  console.log(`使用 Boldpaper 创建前端项目（Node.js 18+，无依赖）

用法：
  node scripts/scaffold.mjs --dest <新项目目录>
  node scripts/scaffold.mjs --help

示例：
  node scripts/scaffold.mjs --dest "./my-website"

相对目标路径以当前工作目录为基准。目标目录必须尚不存在，父目录必须已经存在。
模板随 skill 一起移动时仍可使用；模板位置始终相对于本脚本解析。
发生复制错误时保留已经创建的目标目录，便于检查。`);
}

async function exists(target) {
  try {
    await lstat(target);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

async function inspectTemplate(directory, relative = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  const inventory = [];
  for (const entry of entries) {
    const entryRelative = path.posix.join(relative, entry.name);
    if (entry.isSymbolicLink()) {
      throw new Error(`模板包含符号链接，请先替换为普通文件或目录：${entryRelative}`);
    }
    if (entry.isDirectory()) {
      inventory.push({ relative: entryRelative, directory: true });
      inventory.push(...await inspectTemplate(path.join(directory, entry.name), entryRelative));
    } else if (entry.isFile()) {
      inventory.push({ relative: entryRelative, directory: false });
    } else {
      throw new Error(`模板包含非常规文件：${entryRelative}`);
    }
  }
  return inventory;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    showHelp();
    return;
  }
  if (args.length !== 2 || args[0] !== '--dest' || !args[1].trim() || args[1].startsWith('--')) {
    throw new Error('请使用 --dest <新项目目录> 指定目标。完整说明见 --help。');
  }

  const destination = path.resolve(args[1]);
  if (await exists(destination)) {
    throw new Error(`目标已经存在，请选择一个尚不存在的新目录：${destination}`);
  }
  const parent = path.dirname(destination);
  try {
    if (!(await stat(parent)).isDirectory()) {
      throw new Error(`目标父路径不是目录：${parent}`);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`请先创建目标的父目录，再运行本脚本：${parent}`);
    }
    throw error;
  }

  const relativeToSource = path.relative(source, destination);
  if (!relativeToSource || (!relativeToSource.startsWith(`..${path.sep}`)
    && relativeToSource !== '..' && !path.isAbsolute(relativeToSource))) {
    throw new Error('请将新项目放在 assets/starter 模板目录之外。');
  }
  try {
    if (!(await lstat(source)).isDirectory()) {
      throw new Error(`模板路径应为普通目录：${source}`);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`模板目录缺失，请保留完整的 skill 文件夹：${source}`);
    }
    throw error;
  }

  const inventory = await inspectTemplate(source);
  const availableFiles = new Set(inventory.filter(entry => !entry.directory).map(entry => entry.relative));
  const missing = requiredFiles.filter(file => !availableFiles.has(file));
  if (missing.length) {
    throw new Error(`模板缺少必要文件：${missing.join('、')}。请恢复完整模板后重试。`);
  }

  // mkdir is intentionally non-recursive: its exclusive creation closes the
  // gap between the existence check and the first write to the new project.
  await mkdir(destination);
  try {
    for (const entry of inventory) {
      const target = path.join(destination, entry.relative);
      if (entry.directory) {
        await mkdir(target);
      } else {
        await copyFile(path.join(source, entry.relative), target, constants.COPYFILE_EXCL);
      }
    }
  } catch (error) {
    throw new Error(`复制未完成；已创建的目录保留在 ${destination}。原因：${error.message}`);
  }

  console.log(`已创建项目：${destination}`);
  console.log(`已复制 ${availableFiles.size} 个文件。打开 README.md 查看使用说明。`);
}

main().catch(error => {
  console.error(`错误：${error.message}`);
  process.exitCode = 1;
});
