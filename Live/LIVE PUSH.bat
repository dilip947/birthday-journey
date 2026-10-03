@echo off
title CLEAN LIVE PUSH
cd /d "%~dp0.."

echo.
echo ========================================
echo          CLEAN LIVE PUSH
echo ========================================
echo.
echo This will make the live repository
echo exactly match the current local project.
echo Stale/deleted files will be removed.
echo.
pause

echo.
echo [1/4] Refreshing Git index...
git rm -r --cached . 2>nul
if errorlevel 1 (
    echo Git index refresh encountered an issue.
    echo Continuing...
    echo.
)

echo [2/4] Adding current project files...
git add -A
if errorlevel 1 (
    echo.
    echo ERROR: Could not stage files.
    pause
    exit /b 1
)

echo [3/4] Creating clean commit...
git commit -m "Clean live update"
if errorlevel 1 (
    echo.
    echo No changes to commit, or commit failed.
    echo.
    git status
    pause
    exit /b 1
)

echo [4/4] Uploading clean copy to GitHub...
git push origin main
if errorlevel 1 (
    echo.
    echo ERROR: Push failed.
    pause
    exit /b 1
)

echo.
echo ========================================
echo       CLEAN LIVE PUSH COMPLETED
echo ========================================
echo.
echo GitHub now matches the current local
echo project, with old tracked files removed.
echo.
pause