import json
import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

# Configuration
NEWS_DATA_PATH = '/home/ubuntu/nca-website/client/src/data/news.json'
OUTPUT_DIR = '/home/ubuntu/nca-website/client/public/images/og'
BASE_IMAGE_PATH = '/home/ubuntu/nca-website/client/public/images/news-bg.png' # Fallback/Base image
FONT_PATH = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' # Available in sandbox

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def create_og_image(article):
    # Create a blank image or load a base image
    # We'll create a gradient background if no base image is suitable, 
    # but for consistency let's generate a clean branded card.
    
    width = 1200
    height = 630
    
    # Create base image with a dark gradient background
    img = Image.new('RGB', (width, height), color='#1a1a1a')
    draw = ImageDraw.Draw(img)
    
    # Add a subtle gradient or pattern (simplified here as a solid color with overlay)
    # If article has a specific image, we could try to load it as background, 
    # but for reliability we'll stick to a generated card style.
    
    # Add branding strip at the top
    draw.rectangle([(0, 0), (width, 10)], fill='#ea580c') # Primary orange color
    
    # Add "National Credit Adviser" text
    try:
        font_brand = ImageFont.truetype(FONT_PATH, 30)
        font_title = ImageFont.truetype(FONT_PATH, 70)
        font_meta = ImageFont.truetype(FONT_PATH, 40)
    except IOError:
        # Fallback to default if font not found
        font_brand = ImageFont.load_default()
        font_title = ImageFont.load_default()
        font_meta = ImageFont.load_default()

    draw.text((60, 60), "NATIONAL CREDIT ADVISER", font=font_brand, fill='#ea580c')
    
    # Wrap title text
    title = article['title']
    lines = textwrap.wrap(title, width=25) # Adjust width based on font size
    
    y_text = 180
    for line in lines:
        draw.text((60, y_text), line, font=font_title, fill='white')
        y_text += 85
        
    # Add Category and Date
    meta_text = f"{article['category']} • {article['date']}"
    draw.text((60, height - 100), meta_text, font=font_meta, fill='#9ca3af')
    
    # Save image
    filename = f"og-news-{article['id']}.png"
    output_path = os.path.join(OUTPUT_DIR, filename)
    img.save(output_path)
    print(f"Generated: {output_path}")
    return f"/images/og/{filename}"

def main():
    with open(NEWS_DATA_PATH, 'r') as f:
        news_items = json.load(f)
    
    updated_items = []
    for item in news_items:
        og_image_path = create_og_image(item)
        # We don't necessarily need to update the JSON if we just name them predictably,
        # but updating the JSON makes it explicit.
        item['ogImage'] = og_image_path
        updated_items.append(item)
        
    # Optionally write back to JSON if we want to persist the specific path
    # For now, we will just generate the images and the frontend can infer the path 
    # or we can update the JSON. Let's update the JSON for clarity.
    with open(NEWS_DATA_PATH, 'w') as f:
        json.dump(updated_items, f, indent=2)
        
    print("All OG images generated and news.json updated.")

if __name__ == "__main__":
    main()
