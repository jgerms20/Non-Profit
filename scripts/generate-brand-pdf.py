#!/usr/bin/env python3
"""Generate a styled PDF from the Figma brand guide markdown."""

import markdown
from weasyprint import HTML

INPUT = "docs/figma-brand-guide.md"
OUTPUT = "docs/SCAiL-Brand-Guide.pdf"

with open(INPUT, "r") as f:
    md_content = f.read()

html_body = markdown.markdown(md_content, extensions=["tables", "fenced_code"])

html_doc = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  @page {{
    size: letter;
    margin: 0.75in 0.85in;
    @bottom-center {{
      content: "SCAiL Brand Guide — Page " counter(page);
      font-family: Inter, sans-serif;
      font-size: 9px;
      color: #94A3B8;
    }}
  }}

  body {{
    font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 11px;
    line-height: 1.6;
    color: #334155;
    max-width: 100%;
  }}

  h1 {{
    font-size: 28px;
    font-weight: 700;
    color: #1B365D;
    border-bottom: 3px solid #D4A843;
    padding-bottom: 8px;
    margin-top: 0;
  }}

  h2 {{
    font-size: 18px;
    font-weight: 700;
    color: #1B365D;
    margin-top: 28px;
    border-bottom: 1px solid #E2E8F0;
    padding-bottom: 4px;
    page-break-after: avoid;
  }}

  h3 {{
    font-size: 14px;
    font-weight: 600;
    color: #1B365D;
    margin-top: 18px;
    page-break-after: avoid;
  }}

  h4 {{
    font-size: 12px;
    font-weight: 600;
    color: #334155;
    margin-top: 14px;
    page-break-after: avoid;
  }}

  p {{
    margin: 6px 0;
  }}

  strong {{
    color: #1B365D;
  }}

  code {{
    background: #F1F5F9;
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 10px;
    color: #1B365D;
    font-family: 'JetBrains Mono', monospace;
  }}

  pre {{
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 6px;
    padding: 12px;
    font-size: 10px;
    line-height: 1.5;
    overflow-x: auto;
    page-break-inside: avoid;
  }}

  pre code {{
    background: none;
    padding: 0;
  }}

  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    font-size: 10.5px;
    page-break-inside: avoid;
  }}

  th {{
    background: #1B365D;
    color: white;
    font-weight: 600;
    text-align: left;
    padding: 6px 10px;
    font-size: 10px;
  }}

  td {{
    border-bottom: 1px solid #E2E8F0;
    padding: 5px 10px;
    vertical-align: top;
  }}

  tr:nth-child(even) td {{
    background: #F8FAFC;
  }}

  blockquote {{
    border-left: 3px solid #2EC4B6;
    margin: 12px 0;
    padding: 8px 16px;
    background: #F8FAFC;
    color: #334155;
    font-style: italic;
    page-break-inside: avoid;
  }}

  hr {{
    border: none;
    border-top: 2px solid #D4A843;
    margin: 24px 0;
  }}

  ul, ol {{
    margin: 6px 0;
    padding-left: 20px;
  }}

  li {{
    margin: 3px 0;
  }}

  em {{
    color: #64748B;
  }}
</style>
</head>
<body>
{html_body}
</body>
</html>"""

HTML(string=html_doc).write_pdf(OUTPUT)
print(f"PDF generated: {OUTPUT}")
