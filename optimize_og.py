import sys
from PIL import Image

input_path = r"C:\Users\검달프\.gemini\antigravity\brain\66fd4932-a9c2-4ce1-9c7e-04f1f88c028f\media__1787810974667.jpg"
output_path = r"h:\peacechurch\public\og-image.jpg"

try:
    with Image.open(input_path) as img:
        # Convert to RGB if not
        if img.mode != "RGB":
            img = img.convert("RGB")
        
        target_size = (1200, 630)
        
        img_ratio = img.width / img.height
        target_ratio = target_size[0] / target_size[1]
        
        if img_ratio > target_ratio:
            new_width = int(target_ratio * img.height)
            offset = (img.width - new_width) / 2
            crop_box = (offset, 0, img.width - offset, img.height)
            img = img.crop(crop_box)
        else:
            new_height = int(img.width / target_ratio)
            offset = (img.height - new_height) / 2
            crop_box = (0, offset, img.width, img.height - offset)
            img = img.crop(crop_box)
            
        img = img.resize(target_size, Image.Resampling.LANCZOS)
        
        # Save as optimized JPEG
        img.save(output_path, "JPEG", quality=85, optimize=True)
        print("Success")
except Exception as e:
    print(f"Error: {e}")
