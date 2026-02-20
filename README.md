**Dowry AI – Jahaiz Prank & Awareness**

A small **Flask web app** that starts as a serious-looking *jahaiz/dowry “AI calculator”*  
and ends as an **Islamic awareness experience** against demanding dowry.

The idea is simple: use a light prank to deliver a very serious message.

---

## Project idea

This app is designed around a user journey:

1. **Welcome screen**  
   - A modern landing screen titled “Dowry AI – Jahaiz Calculator”.
   - Invites the user to “start calculation” as if it’s a real dowry tool.

2. **Input form screen**  
   The user fills in:
   - Name + which side they’re from (groom / bride)
   - Financial details (monthly income, monthly expenses, savings)
   - Expectations:
     - Furniture level (Basic / Medium / Luxury)
     - Appliances (Fridge, AC, LED TV, Washing Machine)
     - Vehicle (“No vehicle”, Bike, Small Car, Luxury Car)

3. **Fake result screen**  
   The app:
   - Calls `/api/calculate` (Flask backend)  
   - Returns a **fake jahaiz estimate**, e.g. `PKR 3,500,000`  
   - Displays:
     - A big “recommended” amount
     - Furniture level
     - Selected appliances
     - Vehicle choice  
   - Looks like a real “smart calculator” result.

4. **Prank reveal + awareness**  
   When the user clicks **“Show Full Details”** (or after a few seconds), the UI switches to:
   - A bold **STOP** message
   - Explanation that:
     - In Islam, **mahr** is from groom to bride, not jahaiz from bride’s family  
     - Demanding dowry is a **cultural practice**, not an Islamic requirement  
     - It causes financial pressure, stress, and injustice
   - Short Qur’an and Hadith references (simplified/summary form)
   - A final call to **Say NO to dowry** and support simple nikah

5. **Pledge**  
   There’s a button: **“I Say NO to Dowry”**  
   - Sends a POST to `/api/pledge` (for now, just logs in the backend)
   - Shows a “Thank you” modal with a message encouraging real-life conversations

---

## Features

- **Modern one-page web experience**
  - Smooth screen transitions (welcome → form → result)
  - Step indicator (1 → 2 → 3)
  - Clean animations and subtle effects

- **Tech stack**
  - **Backend:** Python + Flask
    - `GET /` → serves the main HTML page
    - `POST /api/calculate` → returns a fake jahaiz calculation JSON
    - `POST /api/pledge` → logs a simple pledge (no database yet)
  - **Frontend:** HTML, CSS, vanilla JavaScript
    - Custom responsive layout
    - No heavy front-end frameworks
    - Uses `fetch()` to call the Flask APIs

- **Prank with a purpose**
  - Hooks the user with a fake “AI calculator”
  - Switches to a serious Islamic and social awareness message
  - Encourages taking a stand: “I Say NO to Dowry”

- **Beginner-friendly code structure**
  - Clear separation:
    - `app.py` – Flask routes and simple JSON APIs
    - `templates/index.html` – main page
    - `static/css/style.css` – all styling
    - `static/js/app.js` – page logic and API calls
  - No databases or complex auth – easy to read and extend

---

## Tech stack

- **Backend:**
  - Python 3
  - Flask

- **Frontend:**
  - HTML5
  - CSS3 (custom design, responsive)
  - Vanilla JavaScript (no frameworks)

- **Architecture:**
  - Single-page style app with multiple “screens” shown/hidden via JS
  - Simple JSON APIs for calculate and pledge

---

## Project structure

Example layout:

```text
dowry-ai-awareness/
│
├─ app.py                
│
├─ templates/
│   └─ index.html         
│
└─ static/
    ├─ css/
    │   └─ style.css     
    └─ js/
        └─ app.js
```
---

##Getting started

**1. Clone the repo**
```
git clone https://github.com/<your-username>/dowry-awareness.git
cd dowry-awareness
```
**2. Create & activate a virtual environment (recommended)**
```
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate
```

**3. Install dependencies**
```
pip install flask

(If you have a requirements.txt, you can also do pip install -r requirements.txt.)
```

**4. Run the app**
By default, app.py runs Flask on port 5000:

```
python app.py

```
You should see something like:

```
Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```
Then open your browser and go to
```
http://127.0.0.1:5000/
```



