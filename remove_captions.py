
import re

file_path = 'src/content/gallery.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

for i in range(1, 44):
    num = f"{i:04d}"
    # Regex to match the src, albumId and alt, capturing the prefix to keep it, and replacing the alt text
    # We look for src: '/images/XXXX.jpg' followed by albumId: 'personal' followed by alt: 'Фото XXXX'
    # We replace 'Фото XXXX' with ''
    
    pattern = re.compile(rf"(src:\s*'/images/{num}\.jpg',\s*albumId:\s*'personal',\s*alt:\s*)'Фото {num}'")
    
    # Check if it exists before replacing to be sure
    if pattern.search(content):
        content = pattern.sub(r"\1''", content)
    else:
        print(f"Pattern not found for {num}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done removing captions")
