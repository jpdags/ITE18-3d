# 🚀 Quick Start Guide

Get your 3D Animal Learning Explorer running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Models

**Choose one option:**

### Option A: Use Public Folder (Easiest)
```bash
# Create public folder and move assets
mkdir public
cp -r assets public/  # On Windows: xcopy assets public\assets\ /E /I
```

### Option B: Keep Current Structure
Your models in `assets/models/` should work, but ensure they're accessible.

## Step 3: Verify Model Paths

Check that your model files match the paths in `src/data/animals.json`:
- `/assets/models/Cow.glb`
- `/assets/models/Horse.glb`
- etc.

## Step 4: Start Development Server

```bash
npm run dev
```

## Step 5: Open Browser

The app will automatically open at `http://localhost:3000`

## ✅ You're Ready!

- Use the dropdown to select animals
- Click and drag to rotate models
- Scroll to zoom
- Hover over animals to see highlights
- Read educational info in the right panel

## 🐛 Troubleshooting

**Models not loading?**
- Check browser console (F12) for errors
- Verify files are in `public/assets/models/` or accessible
- Ensure file names match exactly (case-sensitive)

**Port already in use?**
- Change port in `vite.config.js` or use: `npm run dev -- --port 3001`

**Dependencies error?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

---

**Need more help?** See `README.md` for detailed documentation.

