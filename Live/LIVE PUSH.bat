@echo off
cd /d "%~dp0"

echo ========================================
echo             LIVE PUSH
echo ========================================
echo.

git add -A

git diff --cached --quiet
if %errorlevel%==0 (
    echo No changes to push.
    echo.
    pause
    exit /b 0
)

git commit -m "Live update"

if errorlevel 1 (
    echo.
    echo ERROR: Commit failed.
    echo.
    pause
    exit /b 1
)

git push origin main

if errorlevel 1 (
    echo.
    echo ERROR: Push failed.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo       LIVE PUSH COMPLETED
echo ========================================
echo.
pause
