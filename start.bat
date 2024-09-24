@echo off
REM Check if Node.js is installed by looking for the 'node' command
node -v >nul 2>&1
IF ERRORLEVEL 1 (
    echo Node.js is not installed. Please install Node.js from https://nodejs.org/ and try again.
    pause
    exit /b
) ELSE (
    echo Node.js is installed, proceeding...
)

REM Check if package.json exists to ensure this is a Node.js project
IF NOT EXIST package.json (
    echo package.json not found. Please ensure you are in the correct project directory.
    pause
    exit /b
)

REM Check if node_modules exists, if not, run npm install
IF NOT EXIST node_modules (
    echo node_modules directory not found. Running 'npm install' to install dependencies...
    npm install
)

REM Start the application using npm run start
echo Starting the application...
npm run start

pause
