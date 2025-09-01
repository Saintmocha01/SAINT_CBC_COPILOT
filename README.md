 # SAINT CBC Copilot

**SAINT CBC Copilot** is an AI-powered lesson planning and parent communication tool designed for the **Kenya Competency-Based Curriculum (CBC)**. It helps teachers generate:

- **Lesson Plans** aligned with Kenyan CBC standards  
- **Parent Notes** in English or Kiswahili  
- **Downloadable reports** in PDF, DOCX, CSV, or Excel  

Built using **Flask**, **OpenAI API**, **MySQL**, and Python libraries for document generation.

---

## 🌍 Features

1. **AI Lesson Plans**  
   - Select subject, grade, competency, and duration  
   - Generate lesson plans instantly via AI

2. **AI Parent Notes**  
   - Enter student name, progress, and language  
   - Generate concise, personalized parent notes

3. **Export Reports**  
   - Download reports in multiple formats (PDF, DOCX, CSV, Excel)

4. **Kenya CBC Focus**  
   - Subjects, competencies, and grade levels match the Kenya CBC curriculum  
   - User interface with Kenyan-inspired theme colors: red, black, green, and white  

---

## 💻 Installation

1. **Clone the repository**

```bash
git clone https://github.com/Saintmocha01/SAINT_CBC_COPILOT.git
cd saint-cbc-copilot
Create a virtual environment

bash
Copy code
python -m venv venv
# Activate venv:
# Windows: venv\Scripts\activate
# Linux/macOS: source venv/bin/activate
Install dependencies

bash
Copy code
pip install -r requirements.txt
Create a .env file in the root directory:

env
Copy code
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_NAME=saint_cbc
AI_API_KEY=your_openai_api_key
LLM_MODEL=gpt-4o-mini
Run the Flask server

bash
Copy code
python app.py
Open your browser at http://127.0.0.1:5000

📁 Project Structure
bash
Copy code
saint-cbc-copilot/
│
├─ backend/
│   ├─ app.py                  # Main Flask application
│   ├─ db/                     # Database scripts / mock data
│   └─ .env                    # Environment variables
│
├─ frontend/
│   ├─ index.html              # UI for lesson plans & parent notes
│   ├─ style.css               # Kenyan-themed styles
│   └─ app.js                  # Frontend JS logic
│
├─ requirements.txt            # Python dependencies
└─ README.md                   # Project documentation
⚡ Usage
Lesson Plan: Select subject, grade, competency, and duration → Click Generate Lesson Plan

Parent Note: Enter student name, progress, language → Click Generate Parent Note

Download Reports: Click any export button to download in desired format

🎨 Kenyan Theme
The interface uses colors inspired by the Kenya flag:

Red – Courage & sacrifice

Black – The people of Kenya

Green – Land & prosperity

White – Peace

Subtle stripes and patterns inspired by Kenyan fabrics make the UI familiar and locally appealing.

🛠 Tech Stack
Backend: Python, Flask, MySQL

Frontend: HTML, CSS, JavaScript

AI: OpenAI GPT API

Exports: ReportLab (PDF), python-docx, pandas & openpyxl (Excel & CSV)

🔗 Links
Kenya CBC Curriculum

OpenAI API

⚠️ Notes
Ensure your OpenAI API key has sufficient quota

Database must have required tables (students, assessments, etc.)

