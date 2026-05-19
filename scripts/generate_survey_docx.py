#!/usr/bin/env python3
"""Generate a Word document from the SCAiL focus group survey options."""

from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

doc = Document()

# -- Style setup --
style = doc.styles['Normal']
font = style.font
font.name = 'Calibri'
font.size = Pt(11)

# Colors
NAVY = RGBColor(0x1B, 0x36, 0x5D)
GOLD = RGBColor(0xD4, 0xA8, 0x43)
TEAL = RGBColor(0x2E, 0xC4, 0xB6)
DARK = RGBColor(0x33, 0x33, 0x33)
GRAY = RGBColor(0x66, 0x66, 0x66)

def add_title(text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    run.bold = True
    run.font.size = Pt(22)
    run.font.color.rgb = NAVY

def add_subtitle(text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    run.font.size = Pt(12)
    run.font.color.rgb = GRAY

def add_heading_navy(text, level=1):
    h = doc.add_heading(text, level=level)
    for run in h.runs:
        run.font.color.rgb = NAVY

def add_heading_gold(text, level=2):
    h = doc.add_heading(text, level=level)
    for run in h.runs:
        run.font.color.rgb = GOLD

def add_question(num, text, qtype=""):
    p = doc.add_paragraph()
    run_num = p.add_run(f"{num}. ")
    run_num.bold = True
    run_num.font.color.rgb = NAVY
    run_q = p.add_run(text)
    run_q.bold = True
    run_q.font.size = Pt(11)
    if qtype:
        run_t = p.add_run(f"  ({qtype})")
        run_t.italic = True
        run_t.font.color.rgb = GRAY
        run_t.font.size = Pt(10)

def add_option(text):
    p = doc.add_paragraph(style='List Bullet')
    run = p.add_run(text)
    run.font.size = Pt(10)
    run.font.color.rgb = DARK

def add_body(text):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.font.size = Pt(11)
    run.font.color.rgb = DARK

def add_note(text):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.italic = True
    run.font.size = Pt(10)
    run.font.color.rgb = GRAY

def add_spacer():
    doc.add_paragraph()

# ========== DOCUMENT CONTENT ==========

add_title("SCAiL Pilot Session")
add_subtitle("Intake Survey Options")
add_spacer()

add_body("Three survey approaches to gauge AI knowledge, attitudes, and usage across your pilot cohorts.")
add_spacer()

# Cohorts box
add_heading_navy("Cohorts", level=2)
add_body("Cohort A: Younger Adults (20–35)")
add_body("Cohort B: Working Adults (35–60)")
add_body("Cohort C: Older Adults (60+)")

doc.add_page_break()

# ═══════════════════════════════════════════════════
# OPTION 1
# ═══════════════════════════════════════════════════
add_heading_navy("OPTION 1: Quick & Casual", level=1)
add_note("Estimated time: 5–7 minutes")
add_body("Best for: Getting people in the door without intimidating them. Low friction. Works well sent via text.")
add_spacer()

add_heading_gold("Questions", level=2)

add_question(1, "What’s your name?", "Short answer")

add_question(2, "Which age group are you in?", "Select one")
add_option("20–35")
add_option("35–60")
add_option("60+")

add_question(3, "What do you do for work (or what did you do)?", "Short answer")

add_question(4, "How would you describe your comfort level with technology in general?", "Select one")
add_option("Very comfortable — I’m usually the one helping others")
add_option("Comfortable — I use it daily without much trouble")
add_option("Okay — I get by but I’m not super confident")
add_option("Not very comfortable — I avoid it when I can")

add_question(5, "Have you ever used an AI tool? (ChatGPT, Siri, Google Assistant, Alexa, etc.)", "Select one")
add_option("Yes, regularly")
add_option("Yes, a few times")
add_option("I’ve heard of them but haven’t really used one")
add_option("I’m not sure what counts as AI")

add_question(6, 'In one sentence, what comes to mind when you hear "artificial intelligence"?', "Short answer")

add_question(7, "What would you most want to learn about AI?", "Check all that apply")
add_option("How to use it for my job or business")
add_option("How to use it for everyday tasks (writing, planning, searching)")
add_option("How it actually works (the basics)")
add_option("How to know if something is AI-generated")
add_option("How to protect myself from AI scams/misinfo")
add_option("I’m just curious — open to anything")

add_question(8, "Any concerns or fears about AI you’d want us to address?", "Short answer, optional")

add_question(9, "Best way to reach you for scheduling?", "Email / Phone / Text")

doc.add_page_break()

# ═══════════════════════════════════════════════════
# OPTION 2
# ═══════════════════════════════════════════════════
add_heading_navy("OPTION 2: Detailed Intake", level=1)
add_note("Estimated time: 10–12 minutes")
add_body("Best for: Getting rich data you can use for curriculum design and grant reporting. Good for people who’ve committed to participating.")
add_spacer()

add_heading_gold("Section 1: About You", level=2)

add_question(1, "Full name", "Short answer")

add_question(2, "Age range", "Select one")
for r in ["20–25", "26–30", "31–35", "36–45", "46–55", "56–65", "66–75", "75+"]:
    add_option(r)

add_question(3, "City/Town in South Carolina", "Short answer")

add_question(4, "Current employment status", "Select one")
for s in ["Employed full-time", "Employed part-time", "Self-employed / Business owner", "Looking for work", "Student", "Retired", "Other"]:
    add_option(s)

add_question(5, "What’s your job title or field?", "Short answer")

add_question(6, "Highest level of education completed", "Select one")
for e in ["Some high school", "High school diploma / GED", "Some college or trade school", "Associate’s degree", "Bachelor’s degree", "Master’s degree or higher"]:
    add_option(e)

add_heading_gold("Section 2: Technology Comfort", level=2)

add_question(7, "How often do you use the internet?", "Select one")
for i in ["Multiple times a day", "Once a day", "A few times a week", "Rarely", "Never"]:
    add_option(i)

add_question(8, "Which devices do you use regularly?", "Check all that apply")
for d in ["Smartphone", "Laptop", "Desktop computer", "Tablet", "Smart speaker (Alexa, Google Home)", "None of the above"]:
    add_option(d)

add_question(9, "Rate your overall technology confidence (1–5)", "Scale")
add_option("1 = I struggle with basic tasks")
add_option("3 = I can do what I need to but nothing fancy")
add_option("5 = I’m very tech-savvy")

add_heading_gold("Section 3: AI Knowledge & Attitudes", level=2)

add_question(10, "Before today, how would you rate your understanding of AI?", "Select one")
for u in ["I don’t really know what AI is", "I’ve heard of it but couldn’t explain it", "I have a basic understanding", "I understand it well", "I work with AI or have studied it"]:
    add_option(u)

add_question(11, "Which of these have you used?", "Check all that apply")
for t in ["ChatGPT / Claude / Gemini", "Siri or Google Assistant", "Alexa or smart home devices", "AI writing tools (Grammarly, etc.)", "AI image generators (DALL-E, Midjourney)", "AI in social media (TikTok recommendations, etc.)", "None that I know of"]:
    add_option(t)

add_question(12, "If you’ve used AI, what did you use it for?", "Short answer, optional")

add_question(13, "How do you feel about AI overall?", "Select one")
for f in ["Excited — I think it’s going to help people", "Curious — I want to know more before I decide", "Neutral — I don’t have strong feelings", "Cautious — I think there are real risks", "Worried — I think it’s mostly dangerous"]:
    add_option(f)

add_question(14, "What concerns you most about AI?", "Check all that apply")
for c in ["It might take jobs away", "I don’t understand how it works", "It could be used to manipulate or scam people", "It feels like it’s moving too fast", "Privacy and data collection", "Bias and unfairness in AI systems", "Nothing — I’m not really concerned", "Other: ___"]:
    add_option(c)

add_question(15, "What excites you most about AI?", "Check all that apply")
for x in ["Saving time on repetitive tasks", "Learning new things faster", "Starting or growing a business", "Helping my community", "Getting a better job or advancing my career", "Creating content (art, writing, music)", "Nothing excites me about it yet", "Other: ___"]:
    add_option(x)

add_heading_gold("Section 4: What You Want", level=2)

add_question(16, "What would make this session worthwhile for you?", "Short answer")
add_question(17, "Is there anything specific you’d want to be able to DO with AI after this session?", "Short answer")
add_question(18, "Any accessibility needs we should know about?", "Short answer, optional")
add_question(19, "Preferred contact method", "Email / Phone / Text")
add_question(20, "Email or phone number", "Short answer")

doc.add_page_break()

# ═══════════════════════════════════════════════════
# OPTION 3
# ═══════════════════════════════════════════════════
add_heading_navy("OPTION 3: Conversational / Storytelling Format", level=1)
add_note("Estimated time: 8–10 minutes")
add_body("Best for: Older adults or people who might be put off by a traditional survey. Feels more like a conversation. Great for qualitative data and quotes you can use in grant applications.")
add_spacer()

add_heading_gold("Questions", level=2)

add_question(1, "What’s your name and where in South Carolina are you from?", "Short answer")

add_question(2, "Which group fits you best?", "Select one")
add_option("20–35 years old")
add_option("35–60 years old")
add_option("60 and up")

add_question(3, "Tell us a little about yourself — what do you do (or what did you do for work)?", "Paragraph")

add_question(4, 'When you hear "AI" or "artificial intelligence," what’s the first thing that pops into your head?', "Paragraph")

add_question(5, 'Have you ever used something with AI and thought "whoa, that’s actually useful" — or "that’s actually scary"? Tell us about it.', "Paragraph")

add_question(6, "On a scale of 1–10, how confident do you feel using technology day-to-day?", "Scale: 1 = not at all, 10 = totally confident")

add_question(7, 'If someone told you "AI can help you with [blank]," what would you fill in the blank with? What do you WISH AI could help you with?', "Paragraph")

add_question(8, "What’s one thing about AI that makes you nervous, skeptical, or uncomfortable?", "Paragraph")

add_question(9, 'Have you ever felt "left behind" when it comes to technology? What happened?', "Paragraph")

add_question(10, "If you could sit down with an AI expert for 30 minutes and ask them anything, what would you ask?", "Paragraph")

add_question(11, "What would make you feel like this session was time well spent?", "Short answer")

add_question(12, "Anything else you want us to know before we meet?", "Paragraph, optional")

add_question(13, "Best way to reach you?", "Email / Phone / Text + contact info")

doc.add_page_break()

# ═══════════════════════════════════════════════════
# RECOMMENDATIONS
# ═══════════════════════════════════════════════════
add_heading_navy("Recommendations by Cohort", level=1)
add_spacer()

table = doc.add_table(rows=4, cols=3)
table.style = 'Light Grid Accent 1'
table.alignment = WD_TABLE_ALIGNMENT.CENTER

headers = ["Cohort", "Recommended Option", "Why"]
for i, h in enumerate(headers):
    cell = table.rows[0].cells[i]
    cell.text = ""
    run = cell.paragraphs[0].add_run(h)
    run.bold = True
    run.font.size = Pt(10)
    run.font.color.rgb = NAVY

data = [
    ["Younger Adults (20–35)", "Option 1 or 2", "Used to forms, won’t mind checkboxes. Option 1 via text, Option 2 if committed."],
    ["Working Adults (35–60)", "Option 2", "Richest career/job context. Detailed version captures professional needs."],
    ["Older Adults (60+)", "Option 3", "Open-ended feels less like a test. Stories = powerful quotes for grants."],
]

for r, row_data in enumerate(data, 1):
    for c, val in enumerate(row_data):
        cell = table.rows[r].cells[c]
        cell.text = ""
        run = cell.paragraphs[0].add_run(val)
        run.font.size = Pt(10)

add_spacer()

# ═══════════════════════════════════════════════════
# BONUS QUESTIONS
# ═══════════════════════════════════════════════════
add_heading_navy("Bonus: Universal Add-On Questions", level=2)
add_body("These work for any cohort and can be added to any option above:")
add_spacer()

bonus = [
    ("How did you hear about SCAiL?", "Word of mouth / Social media / Church or community org / Friend or family / Other"),
    ("Would you be interested in future sessions or programs?", "Yes / Maybe / No"),
    ("Would you be willing to share your experience with others after the session?", "Testimonial, social media post, etc."),
    ("Do you know anyone else who might benefit from a session like this?", "Name/contact, optional"),
]

for i, (q, t) in enumerate(bonus, 1):
    add_question(i, q, t)

add_spacer()
add_spacer()

# Footer
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("The SCAiL Initiative — South Carolina AI Literacy")
run.font.size = Pt(9)
run.font.color.rgb = GRAY
p2 = doc.add_paragraph()
p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
run2 = p2.add_run("Pilot Session Intake Surveys — May 2026")
run2.font.size = Pt(9)
run2.font.color.rgb = GRAY

# Save
doc.save('/home/user/Non-Profit/docs/SCAiL-Pilot-Survey-Options.docx')
print("Done: docs/SCAiL-Pilot-Survey-Options.docx")
