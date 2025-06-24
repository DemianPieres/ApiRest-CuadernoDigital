@echo off
REM ---- Arrancamos la API empaquetada ----
start "" "%~dp0\miApi.exe"

REM ---- Esperar para que la API esté lista ----
timeout /t 5 /nobreak > nul

REM ---- Abrir el navegador con la aplicación ----
start "" "http://localhost:5000"

REM ---- Mantener la ventana abierta para ver posibles errores ----
echo ----------------------------------------------
echo  Aplicación iniciada usando MongoDB Atlas
echo  Cluster: cluster0.y5vx2cd.mongodb.net
echo  Base de datos: inventario
echo ----------------------------------------------
echo Si tienes problemas de conexión, verifica:
echo 1. Tu conexión a internet
echo 2. Que MongoDB Atlas esté funcionando
echo 3. Que las credenciales sean correctas
echo ----------------------------------------------
pause