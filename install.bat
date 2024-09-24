@echo off
REM Open the required websites in the default browser


REM Check if the .env file exists
IF EXIST .env (
    echo .env file already exists.
    choice /M "Do you want to delete the existing .env file and create a new one?"
    IF ERRORLEVEL 2 (
        echo Keeping existing .env file.
        goto end
    ) ELSE (
        echo Deleting existing .env file...
        del .env
        echo Creating a new .env file...
    )
) ELSE (
    echo Creating .env file...
)
start https://nodejs.org/pt
REM Create the .env file
echo.> .env

REM Ask the user for the variables and write them to the .env file
set /p TWITCH_USER="Enter your Twitch Username: "
echo TWITCH_USER=%TWITCH_USER%>> .env

start https://twitchapps.com/tmi/
set /p TWITCH_TOKEN="Enter your Twitch Token: "
echo TWITCH_TOKEN=%TWITCH_TOKEN%>> .env

set /p CHANNEL="Enter the Twitch Channel: "
echo CHANNEL=%CHANNEL%>> .env

echo Environment variables saved in .env file.

:end
pause
