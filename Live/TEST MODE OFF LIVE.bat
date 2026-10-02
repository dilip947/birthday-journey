@echo off
cd /d "%~dp0"

echo ========================================
echo       TEST MODE OFF - LIVE
echo ========================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0set-test-mode.ps1"

if errorlevel 1 (
    echo.
    echo ERROR: Could not disable Test Mode.
    echo.
    pause
    exit /b 1
)

echo.
echo Test Mode is OFF locally.
echo Now pushing this version to GitHub...
echo.

call "%~dp0LIVE PUSH.bat"

