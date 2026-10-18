from PIL import Image
import os

# Compress social-share.png to JPEG for WhatsApp (<300KB)
img = Image.open('social-share.png')
print(f'Source: {img.size}, {os.path.getsize("social-share.png")} bytes')

# JPEG at quality 68 - good balance
img.save('social-share.jpg', 'JPEG', quality=68, optimize=True)
sz = os.path.getsize('social-share.jpg')
print(f'social-share.jpg: {sz} bytes')

# Also re-optimize PNG
img.save('social-share.png', optimize=True)
sz2 = os.path.getsize('social-share.png')
print(f'social-share.png (opt): {sz2} bytes')

print('Done!')
