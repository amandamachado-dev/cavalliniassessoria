import fitz

pdf_path = "BrandBook-2026-Cavallini (2).pdf"
md_path = "extracted_brandbook.md"

doc = fitz.open(pdf_path)
with open(md_path, "w", encoding="utf-8") as f:
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text("text")
        f.write(f"## Page {page_num + 1}\n\n")
        f.write(text)
        f.write("\n\n---\n\n")

print(f"Extracted {len(doc)} pages to {md_path}")
