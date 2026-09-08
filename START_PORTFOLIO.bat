@echo off
title LumiaStudio Portfolio Server
echo ========================================================
echo Starting LumiaStudio Portfolio Local Web Server...
echo ========================================================
echo.
node server.js
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Node.js not found in PATH! Trying Python web server fallback...
    python -m http.server 8080
)
pause
