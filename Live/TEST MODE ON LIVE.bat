@echo off
cd /d "%~dp0\.."
powershell -ExecutionPolicy Bypass -File ".\set-test-mode-local.ps1" -On
echo.
echo TEST MODE LIVE: ON
echo.
echo Pushing TEST MODE ON version to GitHub for Vercel...
call ".\Live\LIVE PUSH.bat"
pause