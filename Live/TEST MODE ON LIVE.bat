@echo off
cd /d "%~dp0.."

echo ========================================
echo       TEST MODE ON - LIVE
echo ========================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "$files=@('app\week\page.tsx','app\week\[day]\page.tsx','app\week\fun\mines\page.tsx'); $utf8=New-Object System.Text.UTF8Encoding($false); foreach($p in $files){$t=[System.IO.File]::ReadAllText($p,[System.Text.Encoding]::UTF8); $t=$t.Replace('const TEST_MODE = true;','const TEST_MODE = true;').Replace('const TEST_MODE = false;','const TEST_MODE = true;'); [System.IO.File]::WriteAllText($p,$t,$utf8)}"

if errorlevel 1 (
    echo.
    echo ERROR: Could not enable Test Mode.
    echo.
    pause
    exit /b 1
)

echo Test Mode ON.
echo Pushing Test Mode version to GitHub...
echo.

git add -A
git commit -m "Enable live test mode"

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
echo     TEST MODE ON - LIVE COMPLETE
echo ========================================
echo.
pause
