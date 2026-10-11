@echo off
cd /d "%~dp0\.."
powershell -ExecutionPolicy Bypass -File ".\set-test-mode-local.ps1" -On
pause