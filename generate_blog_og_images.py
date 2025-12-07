import json
import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

# Configuration
BLOG_DATA_PATH = '/home/ubuntu/nca-website/client/src/data/blog.json'
OUTPUT_DIR = '/home/ubuntu/nca-website/client/public/images/og'
FONT_PATH = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' # Available in sandbox

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def create_og_image(post):
    width = 1200
    height = 630
    
    # Create base image with a dark gradient background (slightly different hue for blog)
    # Using a deep blue/slate background for blog to distinguish from news
    img = Image.new('RGB', (width, height), color='#0f172a') 
    draw = ImageDraw.Draw(img)
    
    # Add branding strip at the top
    draw.rectangle([(0, 0), (width, 10)], fill='#ea580c') # Primary orange color
    
    # Add "National Credit Adviser Blog" text
    try:
        font_brand = ImageFont.truetype(FONT_PATH, 30)
        font_title = ImageFont.truetype(FONT_PATH, 70)
        font_meta = ImageFont.truetype(FONT_PATH, 40)
    except IOError:
        # Fallback to default if font not found
        font_brand = ImageFont.load_default()
        font_title = ImageFont.load_default()
        font_meta = ImageFont.load_default()

    draw.text((60, 60), "NCA BLOG", font=font_brand, fill='#ea580c')
    
    # Wrap title text
    title = post['title']
    lines = textwrap.wrap(title, width=25) # Adjust width based on font size
    
    y_text = 180
    for line in lines:
        draw.text((60, y_text), line, font=font_title, fill='white')
        y_text += 85
        
    # Add Category and Date
    meta_text = f"{post['category']} • {post['date']}"
    draw.text((60, height - 100), meta_text, font=font_meta, fill='#94a3b8')
    
    # Save image
    filename = f"og-blog-{post['id']}.png"
    output_path = os.path.join(OUTPUT_DIR, filename)
    img.save(output_path)
    print(f"Generated: {output_path}")
    return f"/images/og/{filename}"

def main():
    with open(BLOG_DATA_PATH, 'r') as f:
        blog_items = json.load(f)
    
    updated_items = []
    for item in blog_items:
        og_image_path = create_og_image(item)
        item['ogImage'] = og_image_path
        updated_items.append(item)
        
    with open(BLOG_DATA_PATH, 'w') as f:
        json.dump(updated_items, f, indent=2)
        
    print("All Blog OG images generated and blog.json updated.")

if __name__ == "__main__":
    main()
