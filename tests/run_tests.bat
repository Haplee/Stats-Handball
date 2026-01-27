@echo off
setlocal
set "PROJECT_ROOT=%~dp0.."
set "RESULTS_DIR=%~dp0results"
set "TIMESTAMP=%date:~-4,4%-%date:~-7,2%-%date:~-10,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%"
set "TIMESTAMP=%TIMESTAMP: =0%"
set "LOG_FILE=%RESULTS_DIR%\test_run_%TIMESTAMP%.txt"

echo === Starting Test Suite at %TIMESTAMP% === > "%LOG_FILE%"
echo Project Root: %PROJECT_ROOT% >> "%LOG_FILE%"
echo. >> "%LOG_FILE%"

echo [1/3] Testing Frontend Build (Client App)...
echo [1/3] Testing Frontend Build (Client App)... >> "%LOG_FILE%"
cd "%PROJECT_ROOT%\client-app"
call npm run build >> "%LOG_FILE%" 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [FAILURE] Client App Build Failed. See log for details.
    echo [FAILURE] Client App Build Failed. >> "%LOG_FILE%"
) else (
    echo [SUCCESS] Client App Build Passed.
    echo [SUCCESS] Client App Build Passed. >> "%LOG_FILE%"
)
echo. >> "%LOG_FILE%"

echo [2/3] Testing Frontend Build (Progress Web)...
echo [2/3] Testing Frontend Build (Progress Web)... >> "%LOG_FILE%"
cd "%PROJECT_ROOT%\frontend"
call npm run build >> "%LOG_FILE%" 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [FAILURE] Progress Web Build Failed. See log for details.
    echo [FAILURE] Progress Web Build Failed. >> "%LOG_FILE%"
) else (
    echo [SUCCESS] Progress Web Build Passed.
    echo [SUCCESS] Progress Web Build Passed. >> "%LOG_FILE%"
)
echo. >> "%LOG_FILE%"

echo [3/3] Testing Backend API Availability...
echo [3/3] Testing Backend API Availability... >> "%LOG_FILE%"
cd "%PROJECT_ROOT%"
python tests\test_api.py >> "%LOG_FILE%" 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [FAILURE] Backend API Tests Failed. Is Docker running?
    echo [FAILURE] Backend API Tests Failed. >> "%LOG_FILE%"
) else (
    echo [SUCCESS] Backend API Tests Passed.
    echo [SUCCESS] Backend API Tests Passed. >> "%LOG_FILE%"
)

echo.
echo === Test Run Complete ===
echo Results saved to: %LOG_FILE%
echo === Test Run Complete === >> "%LOG_FILE%"

endlocal
pause
