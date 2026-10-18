@echo off
echo Compressing social-share.png for WhatsApp...
cd /d "C:\Users\Thom\Desktop\brie-tables-netlify"
python -c "from PIL import Image; import os; img=Image.open('social-share.png'); img.save('social-share.jpg','JPEG',quality=68,optimize=True); img.save('social-share.png',optimize=True); print(f'JPEG: {os.path.getsize(\"social-share.jpg\")} bytes'); print(f'PNG: {os.path.getsize(\"social-share.png\")} bytes')"
echo.
echo Done! Check the folder.
pause
