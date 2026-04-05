# 😎 NickCrafter — Setup & Deployment Guide

## 📁 Project Structure
```
nickname-generator/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    └── App.css
```

---

## 🖥️ Step 1: Setup in VS Code

### 1.1 Install Prerequisites
Make sure you have these installed:
- **Node.js** → https://nodejs.org (download LTS version)
- **VS Code** → https://code.visualstudio.com

Check if Node is installed — open terminal and run:
```bash
node -v    # should show v18 or above
npm -v     # should show 9 or above
```

---

### 1.2 Create the Project
Open VS Code → open Terminal (Ctrl + ` ) and run:

```bash
# Go to wherever you keep projects
cd Desktop

# Create a new React + Vite project
npm create vite@latest nickname-generator -- --template react

# Go into the folder
cd nickname-generator

# Install dependencies
npm install
```

---

### 1.3 Replace the Files
Now replace the generated files with the ones provided:

- Copy `src/App.jsx` → replace the generated `src/App.jsx`
- Copy `src/App.css` → replace the generated `src/App.css`
- Copy `index.html` → replace the generated `index.html`
- Delete `src/index.css` (not needed)

In `src/main.jsx`, make sure it looks like:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

### 1.4 Run Locally
```bash
npm run dev
```
Open your browser → go to **http://localhost:5173**

You should see the NickCrafter app running! 🎉

---

## 🚀 Step 2: Deploy to Vercel (FREE, get a live URL)

### 2.1 Push to GitHub
First, create a GitHub account at https://github.com if you don't have one.

In VS Code terminal:
```bash
# Initialize git
git init
git add .
git commit -m "first commit: NickCrafter app"
```

Go to https://github.com/new → create a new repository named `nickname-generator`

Then run (replace YOUR_USERNAME):
```bash
git remote add origin https://github.com/YOUR_USERNAME/nickname-generator.git
git branch -M main
git push -u origin main
```

---

### 2.2 Deploy on Vercel
1. Go to **https://vercel.com** and sign up with your GitHub account
2. Click **"Add New Project"**
3. Select your `nickname-generator` repository
4. Vercel auto-detects it's a Vite project ✅
5. Click **"Deploy"** — that's it!

In ~1 minute you'll get a live URL like:
```
https://nickname-generator-yourname.vercel.app
```

🎉 Share this link anywhere — resume, WhatsApp, friends!

---

### 2.3 Custom Domain (Optional but Free)
In Vercel dashboard → Settings → Domains
You can add a free subdomain like: `nickcrafter.vercel.app`

---

## ✨ Features Included
- 😂 Funny / 😈 Savage / 🥺 Cute mood selector
- First-letter based personality archetype (A→Z)
- Name length logic (short name = cute prefix, long name = epic prefix)
- 🎲 Random Surprise button (generates without input)
- 📋 Copy nickname to clipboard
- 💬 Share directly on WhatsApp
- 📜 History of last 7 nicknames
- Fully responsive (mobile + desktop)

---

## 🎯 Interview Answer
> "I built a fun React web application called NickCrafter that generates personalized nicknames using rule-based logic and name analysis. It uses first-letter archetypes, name length detection, and mood-based categorization to create unique combinations. The app is deployed on Vercel with zero cost."

---

## 💡 Future Upgrades (When You're Ready)
- Add Spring Boot backend to save nicknames to a database
- Add user accounts with Supabase
- Add avatar generator
- Add a leaderboard of most-generated nicknames

---

Total Cost = ₹0 😎