@echo off
title Shibuya Invest - Serveur
cd /d "%~dp0"
echo =========================================
echo    Lancement de Shibuya Invest...
echo =========================================
echo.
echo Le site va s'ouvrir dans votre navigateur...
npm run dev -- --open
pause
