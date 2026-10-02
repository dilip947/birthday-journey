@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0set-test-mode.ps1" -On
echo.
echo TEST MODE ON
echo.
pause
