# Boldpaper

**让 AI 做出有性格的前端。**

A frontend design skill for bold typography, playful colors, and crisp shadows.

Boldpaper 是一个可复用的前端设计 skill，把大标题、鲜明色块、深色描边和硬阴影落实为可运行的页面。默认视觉语言受 Gumroad 启发，附带原创的 goodthings 示例与本地模板。

它可以新建个人博客、作品集、落地页或商店，也可以改造已有的 React、Vue 等项目。已有项目沿用原框架和功能；商店模板中的商品、价格与收藏按实际用途取舍。

## 安装到 Codex

需要 Git。运行模板生成和本地预览脚本时，另需 Node.js 18 或更新版本。

### Windows · PowerShell

```powershell
$skillRoot = if ($env:CODEX_HOME) {
  Join-Path $env:CODEX_HOME 'skills'
} else {
  Join-Path $env:USERPROFILE '.codex\skills'
}
New-Item -ItemType Directory -Path $skillRoot -Force | Out-Null
git clone https://github.com/maile456/Boldpaper.git (Join-Path $skillRoot 'boldpaper')
```

### macOS / Linux

```sh
skill_root="${CODEX_HOME:-$HOME/.codex}/skills"
mkdir -p "$skill_root"
git clone https://github.com/maile456/Boldpaper.git "$skill_root/boldpaper"
```

默认安装位置是 `~/.codex/skills/boldpaper`。设置了 `CODEX_HOME` 时使用其 `skills/boldpaper` 子目录。目标目录已有文件时，Git 会停止克隆，保留已有内容。

安装后在 Codex 的新对话中调用 `$boldpaper`。

## 使用

描述用途、内容和必要功能即可；有框架偏好时一起说明。

**新建个人博客：**

```text
使用 $boldpaper 为我制作一个个人博客。
栏目包含文章、学习笔记和关于我，支持分类、搜索与文章阅读。
用原创示例内容起步，完成桌面和手机布局，以及实际可操作的前端。
```

**改造已有 React 页面：**

```text
使用 $boldpaper 调整当前 React 项目的视觉。
采用醒目的大标题、鲜明色块、深色描边和硬阴影。
保留现有路由、数据和搜索功能，复用现有组件，完成相关验证。
```

新项目未指定框架时，默认使用原生 HTML / CSS / JavaScript。指定框架时按该框架实现；已有项目直接在原代码上修改。

## 内置设计与代码

- [Skill 指令](SKILL.md)：任务选择、实现要点与交付要求。
- [设计规范](references/design-system.md)：配色、字体、构图、边框与组件参考。
- [示例前端入口](assets/starter/dist/index.html)：原创静态商店示例的源码文件。

默认配色使用墨黑 `#242323`、米白 `#f5f1e8`、粉色 `#ff90e8`、黄色 `#ffc900`、薄荷绿 `#c5f1cf` 与蓝色 `#b8c8ff`。用户指定的品牌色与内容优先。

示例包含分类搜索、详情弹窗、本地收藏和演示文本下载。它是可改造的起点；商品价格仅用于界面展示，下载为免费示例内容。

## 手动生成与预览

在本仓库目录运行，将目标替换为实际路径：

```sh
node scripts/scaffold.mjs --dest "<新项目的绝对路径>"
```

目标目录须尚不存在，其父目录须已存在。脚本检查并复制完整模板，之后由你或 AI 根据实际需求修改品牌、内容与功能。

进入生成的项目目录：

```sh
npm run check
npm run dev
```

无需运行 `npm install`。浏览器打开终端显示的本地地址即可预览；Windows 也可以双击生成目录中的 `start.cmd`。

快速查看时，可以直接打开生成目录中的 `dist/index.html`，或本仓库的 `assets/starter/dist/index.html`。这些都是本地文件入口，GitHub 中的文件链接展示源码，不是已部署的网站。通过稳定的本地服务地址访问，有利于保持收藏的浏览器存储来源一致。

`npm run check` 检查核心文件、静态资源引用和 JavaScript 语法。视觉布局、真实交互、键盘操作与浏览器权限仍需实际检查。

## 仓库结构

```text
Boldpaper/
├─ SKILL.md                   Skill 入口
├─ agents/openai.yaml         显示名称与默认提示词
├─ references/design-system.md
├─ scripts/scaffold.mjs       模板生成脚本
├─ assets/starter/            可运行的原创前端模板
├─ README.md
└─ LICENSE
```

模板中的 `dist/` 是维护的源码目录，直接编辑其中的 HTML、CSS 和 JavaScript。它不是可以删除后自动重建的临时输出。

## 许可证

[MIT License](LICENSE)。
