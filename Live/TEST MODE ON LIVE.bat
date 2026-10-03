@echo off
title TEST MODE ON - LIVE
cd /d "%~dp0.."

echo.
echo ========================================
echo       TURNING TEST MODE ON - LIVE
echo ========================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "$p='lib\testMode.ts'; $content='export const TEST_MODE = true;' + [Environment]::NewLine; [System.IO.File]::WriteAllText($p,$content,(New-Object System.Text.UTF8Encoding($false)))"
if errorlevel 1 (
    echo.
    echo ERROR: Could not update Test Mode.
    pause
    exit /b 1
)
git add "lib\testMode.ts"
git commit -m "Enable Test Mode"
if errorlevel 1 (
    echo.
    echo ERROR: Commit failed.
    pause
    exit /b 1
)
git push origin main
if errorlevel 1 (
    echo.
    echo ERROR: Push failed.
    pause
    exit /b 1
)
echo.
echo ========================================
echo       TEST MODE IS NOW ON - LIVE
echo ========================================
echo.
pause