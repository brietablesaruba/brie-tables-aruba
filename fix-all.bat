@echo off
echo ============================================
echo  Brie Tables - Fix Social Share Image
echo ============================================
cd /d "%~dp0"

echo.
echo [1/3] Converting PNG to real JPEG (under 300KB for WhatsApp)...
python -c "from PIL import Image; img=Image.open('social-share.png').convert('RGB'); img.save('social-share.jpg','JPEG',quality=75,optimize=True); import os; print(f'Created social-share.jpg: {os.path.getsize(\"social-share.jpg\")} bytes')"
if %errorlevel% neq 0 (
    echo Python failed! Trying ffmpeg...
    ffmpeg -y -i "social-share.png" -q:v 3 "social-share.jpg" 2>&1
)

echo.
echo [2/3] Cleaning up unused files...
REM Remove PNG duplicates in platter-photos (only JPGs are used)
del "platter-photos\*.png" 2>nul
REM Remove compress scripts (not needed for deploy)
del "compress.py" 2>nul
del "compress.bat" 2>nul
del "fix-share.bat" 2>nul
del "social-share.png" 2>nul
REM Remove the large jar log file
del "*.jar" 2>nul
echo Cleaned.

echo.
echo [3/3] Final folder contents:
dir /b
echo.
echo platter-photos:
dir /b "platter-photos"

echo.
echo ============================================
echo  DONE! Deploy this entire folder to Netlify.
echo  The social-share.jpg is now a real JPEG.
echo ============================================
pause
