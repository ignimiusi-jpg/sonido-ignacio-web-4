# Sonido Ignacio — Landing Page

## Deploy to Vercel (5 minutes)

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click **"+"** → **"New repository"**
3. Name: `sonido-ignacio`
4. Keep it **Public**
5. **DO NOT** check "Add README" (leave empty)
6. Click **"Create repository"**

### Step 2: Upload Files
1. On your new empty repo page, click **"uploading an existing file"**
2. **Extract this ZIP** on your computer
3. **Drag ALL files and folders** into GitHub (not the zip itself)
4. Click **"Commit changes"**

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/in with GitHub
3. Click **"Add New"** → **"Project"**
4. Find and select `sonido-ignacio`
5. Vercel auto-detects Vite — just click **"Deploy"**
6. Wait ~60 seconds
7. **Done!** Your site is live.

---

## Customize

### WhatsApp Number
In `src/App.jsx`, find line ~100:
```javascript
window.open(`https://wa.me/573001234567?text=...
```
Replace `573001234567` with your number (country code + number, no spaces).

### Email
Search for `ignacio@sonidoignacio.com` and replace with your email.

### Prices
Edit the `TIERS` and `EXTRAS` objects at the top of `src/App.jsx`.

---

Made in Medellín 🇨🇴
