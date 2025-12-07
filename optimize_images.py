import os
from PIL import Image

IMAGE_DIR = '/home/ubuntu/nca-website/client/public/images'
LOGO_PATH = os.path.join(IMAGE_DIR, 'logo.png')

def optimize_logo():
    if os.path.exists(LOGO_PATH):
        try:
            with Image.open(LOGO_PATH) as img:
                # Resize to 150x150 (3x for 48x48 display) to maintain quality on high DPI screens
                # while significantly reducing file size compared to 500x500
                img.thumbnail((150, 150))
                img.save(LOGO_PATH, optimize=True)
                print(f"Optimized logo.png")
        except Exception as e:
            print(f"Error optimizing logo: {e}")

def convert_to_webp():
    for filename in os.listdir(IMAGE_DIR):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')) and filename != 'logo.png':
            file_path = os.path.join(IMAGE_DIR, filename)
            webp_path = os.path.splitext(file_path)[0] + '.webp'
            
            try:
                with Image.open(file_path) as img:
                    img.save(webp_path, 'WEBP', quality=85)
                    print(f"Converted {filename} to {os.path.basename(webp_path)}")
            except Exception as e:
                print(f"Error converting {filename}: {e}")

if __name__ == "__main__":
    optimize_logo()
    convert_to_webp()
