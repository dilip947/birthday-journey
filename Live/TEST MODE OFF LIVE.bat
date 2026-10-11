@echo off
cd /d "%~dp0\.."
powershell -ExecutionPolicy Bypass -File ".\set-test-mode-local.ps1"
echo.
echo TEST MODE LIVE: OFF
echo.
echo Pushing NORMAL LIVE version to GitHub for Vercel...
call ".\Live\LIVE PUSH.bat"
pause