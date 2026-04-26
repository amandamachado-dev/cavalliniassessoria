from PIL import Image
import os

images = [
    'assets/images/logo-c-removebg.png',
    'assets/images/logo-preto-laranja-c.png',
    'assets/images/logo-semfundo.png',
    'assets/images/logo-completa.png'
]

for img_path in images:
    if os.path.exists(img_path):
        with Image.open(img_path) as img:
            print(f"{img_path}: {img.size}")
    else:
        print(f"{img_path}: NOT FOUND")
