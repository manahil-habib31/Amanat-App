# 🛡️ AMANAT (امانت)
### *"Kho gaya hai? Agla qadam hum batayenge."*
**Pakistan’s 1st Lost Important Document Recovery Assistant & Tracker**

[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Built For](https://img.shields.io/badge/Built_for-Pakistan_🇵🇰-01411C)](https://amanat.pk)

---

## 📌 The Problem
Losing an important document in Pakistan (such as a **CNIC, Pakistani Passport, Driving License, BISE Degree, Vehicle Registration Book, Bank Card, or Smartphone**) is an overwhelming, high-anxiety ordeal. 

Citizens face critical questions:
- *What should I do first to prevent identity theft or fraudulent SIM usage?*
- *Do I need a Police Roznamcha (DDR) or an FIR?*
- *What exact photocopies, stamp papers, relative CNICs, or fee challans does NADRA, DGIP, or DLIMS need before I stand in long queues?*
- *Which official portal or counter handles duplicate issuance?*
- *What steps have I completed so far?*

**Amanat** replaces this stress and bureaucratic confusion with a clear, calm, and actionable **step-by-step Pakistani recovery plan**.

---

## 🌟 Key Features

### 1. 📝 5-Step Intuitive Report Wizard
- **Question 1 (Category)**: Visual cards with Urdu labels across 9 Pakistani document types.
- **Question 2 (Date & Time)**: Quick presets (*Today, Yesterday, 3 Days Ago, Last Week*) and time of day.
- **Question 3 (Location)**: Major Pakistani cities (*Rawalpindi, Islamabad, Lahore, Karachi, Peshawar, Quetta, Multan, Faisalabad, etc.*) + Area (*Saddar, Gulberg, Blue Area, F-10, DHA*) + Landmark notes.
- **Question 4 (Identifying Notes)**: Safe, non-sensitive descriptions (*e.g., "Navy holder with Metro card"*).
- **Question 5 (Photocopy Check)**: Zero-copy vs scanned copy branch with privacy-first demo attachment simulation.

### 2. 🧭 Dynamic Step-by-Step Recovery Checklists
Tailored recovery workflows customized for Pakistani institutions:
- **CNIC (NADRA)**: Pak-ID online vs NRC Mega Center, Police Roznamcha DDR, Relative CNIC validation, tracking token.
- **Passport (DGIP)**: Passports Fee Asaan app / NBP challan, Police lost report, Regional Passport Office token flow.
- **Driving License (DLIMS)**: Provincial traffic police records, Medical Form B, test-exempt duplicate card collection.
- **Bank / Payment Card**: Instant 24/7 bank hotline freeze, transaction dispute window, replacement reissuance.
- **Mobile Phone (PTA DIRBS)**: Telecom SIM block, PTA nationwide IMEI block (`0800-55055`), CPLC / Police 15 record.
- **Educational Certificate (BISE / HEC)**: Mandatory daily newspaper classified ad, Rs. 100 Stamp paper affidavit, Board challan.
- **Vehicle Document (Excise)**: Police Roznamcha, Excise Form "F", token tax verification, Smart Card reprint.

### 3. 📋 Office Preparation Checklist & Safety Tips
- **"What to Prepare"**: Prerequisite checklist to avoid repeated trips to government offices in extreme weather.
- **"Keep This Information Safe"**: Critical identity theft warnings (never posting 13-digit CNIC numbers on social media).
- **Official Links & Timeline**: Direct references to official government portals with estimated processing windows.

### 4. 📊 Recovery Tracker Dashboard ("My Lost Items")
- Overview KPI stats: *Total Tracked, In Progress, Recovered, Awaiting Steps*.
- Interactive status filter tabs (`All`, `🟡 In Progress`, `🔴 Lost`, `🟢 Recovered`).
- Real-time search across cities, areas, and item notes.

### 5. 🎉 "I Found It!" (Mil Gaya) Celebration
- Interactive **multi-colored confetti animation** upon finding misplaced items.
- Recovery timestamp logging and resolution note archiving.

### 6. 🤝 Privacy-Protected Community Lost & Found
- Anonymous board connecting finders and owners across Pakistani cities.
- **Real-Time Client-Side Privacy Regex Filters** that automatically block full CNIC numbers (`XXXXX-XXXXXXX-X`) or bank card digits from being posted publicly.

### 7. 🚨 24/7 Pakistani Helplines & "Pehle 3 Kaam"
- Emergency guide: *Secure accounts ➔ Obtain Police DDR ➔ Organize prerequisites*.
- Clear explanation of **Daily Diary Report (DDR / Roznamcha)** vs **FIR**.
- Direct hotlines: Police 15, NADRA (1777), PTA (0800-55055), Passports (051-9107044), CPLC (1102), HBL, Meezan, Alfalah, MCB, EasyPaisa, JazzCash.

---

## 🔒 Privacy & Safety Guarantee
- **Zero Sensitive Data Storage**: Amanat never requests or stores 13-digit CNIC numbers, passwords, OTPs, or financial credentials.
- **Local Browser Persistence**: All test data and progress are stored safely inside the user's browser `localStorage`.
- **Independent Citizen Tool**: Built to inform and empower citizens; does not claim official government affiliation.

---

## ⏱️ 30-Second Hackathon Demo Flow for Judges

```
Landing Page
   ↓ (Click "Open Live Plan" on CNIC Rawalpindi Demo)
Checklist View (Progress: 3/6 - 50%)
   ↓ (Check off Task 4: "Prepare required prerequisites")
Live Progress Updates to 4/6 (67%)
   ↓ (Click "What to Prepare" tab to see NADRA prerequisites)
   ↓ (Click "I Found It! (Mil Gaya)")
Confetti Celebration Burst 🎉
   ↓ (Click "Yes, Mark Recovered")
Recovery Tracker Dashboard (Updated to Recovered 🟢)
```

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Outfit*)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: Canvas Confetti

---

## 🚀 Quick Start (Local Setup)

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/amanat-app.git
cd amanat-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 📦 Deployment (Vercel)

1. Push this repository to **GitHub**.
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import the `amanat-app` repository.
4. Framework preset **Vite** will be auto-detected. Click **Deploy**.

---

## 🇵🇰 Proudly Designed for Pakistan
*Created during the Vibe Coding Hackathon with a focus on high civic impact, frictionless UX, and citizen empowerment.*
