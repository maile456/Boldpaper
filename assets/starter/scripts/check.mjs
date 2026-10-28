import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, readdir, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distRoot = path.join(projectRoot, 'dist');
const required = ['index.html', 'tokens.css', 'styles.css', 'app.js'];
const failures = [];
let checkedLinks = 0;
let checkedScripts = 0;

for (const filename of required) {
  try {
    const info = await stat(path.join(distRoot, filename));
    if (!info.isFile() || info.size === 0) failures.push(`Core file is empty or invalid: dist/${filename}`);
  } catch {
    failures.push(`Missing core file: dist/${filename}`);
  }
}

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory()
    ? filesIn(path.join(directory, entry.name))
    : entry.isFile() ? [path.join(directory, entry.name)] : []));
  return nested.flat();
}

async function checkLink(source, reference) {
  const link = reference.replaceAll('&amp;', '&').trim();
  if (!link || link.startsWith('#') || link.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(link)) return;
  checkedLinks += 1;
  let decoded;
  try {
    decoded = decodeURIComponent(link.split(/[?#]/, 1)[0]);
  } catch {
    failures.push(`Invalid link in ${path.relative(projectRoot, source)}: ${link}`);
    return;
  }
  const target = path.resolve(link.startsWith('/') ? distRoot : path.dirname(source), link.startsWith('/') ? `.${decoded}` : decoded);
  const relative = path.relative(distRoot, target);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    failures.push(`Link leaves dist in ${path.relative(projectRoot, source)}: ${link}`);
    return;
  }
  try {
    const info = await stat(target);
    if (info.isDirectory()) await stat(path.join(target, 'index.html'));
  } catch {
    failures.push(`Broken local link in ${path.relative(projectRoot, source)}: ${link}`);
  }
}

let files = [];
try {
  files = await filesIn(distRoot);
} catch (error) {
  failures.push(`Cannot read dist: ${error.message}`);
}

for (const filename of files) {
  const extension = path.extname(filename).toLowerCase();
  if (extension === '.html' || extension === '.css') {
    const source = await readFile(filename, 'utf8');
    if (extension === '.html') {
      const withoutComments = source.replace(/<!--[\s\S]*?-->/g, '');
      for (const match of withoutComments.matchAll(/\b(?:src|href|poster)\s*=\s*(["'])(.*?)\1/gi)) await checkLink(filename, match[2]);
    } else {
      const withoutComments = source.replace(/\/\*[\s\S]*?\*\//g, '');
      for (const match of withoutComments.matchAll(/url\(\s*(["']?)([^\s)'";]+)\1\s*\)/gi)) await checkLink(filename, match[2]);
      for (const match of withoutComments.matchAll(/@import\s+(["'])(.*?)\1/gi)) await checkLink(filename, match[2]);
    }
  }
}

const scriptFiles = [...files.filter(filename => /\.(?:m?js)$/.test(filename)), ...(await filesIn(path.join(projectRoot, 'scripts'))).filter(filename => /\.m?js$/.test(filename))];
for (const filename of scriptFiles) {
  const result = spawnSync(process.execPath, ['--check', filename], { encoding: 'utf8' });
  checkedScripts += 1;
  if (result.status !== 0) failures.push(`JavaScript syntax error: ${path.relative(projectRoot, filename)}\n${result.stderr || result.error?.message || 'Unknown syntax check failure'}`);
}

if (failures.length > 0) {
  console.error(`FAILED: ${failures.length} issue(s)\n${failures.map(issue => `- ${issue}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${required.length} core files, ${checkedLinks} local resource links, ${checkedScripts} JavaScript syntax checks.`);
  console.log('Browser interaction and responsive layout still need visual verification.');
}
