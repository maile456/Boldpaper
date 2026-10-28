@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 18 or newer, then run this file again.
  pause
  exit /b 1
)
echo Open http://127.0.0.1:4173 in your browser.
echo Keep this window open while previewing the site.
node scripts\serve.mjs
if errorlevel 1 pause
