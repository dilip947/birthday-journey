@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0set-test-mode.ps1"
echo.
echo TEST MODE OFF
echo.
pause
