@"
@echo off
set PORT=5001
:port_check
netstat -ano | findstr ":%PORT%" >nul
if not errorlevel 1 (
  set /a PORT+=1
  goto port_check
)
echo Starting on port %PORT%
node index.js --port %PORT%
"@ | Out-File -FilePath "start-server.bat" -Encoding ASCII