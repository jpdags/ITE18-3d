# Quick Setup Guide

## 📦 Model File Placement

For Vite to serve your GLB models correctly, you have two options:

### Option 1: Use Public Folder (Recommended)

1. Create a `public` folder in the root directory if it doesn't exist
2. Move or copy your `assets` folder into `public`:
   ```
   public/
     └── assets/
         └── models/
             ├── Cow.glb
             ├── Horse.glb
             └── ...
   ```

3. The paths in `animals.json` (`/assets/models/Cow.glb`) will work automatically

### Option 2: Keep Assets in Root

If you prefer to keep models in the root `assets` folder:

1. Update `vite.config.js` to include:
   ```js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     publicDir: false, // Disable default public dir
     server: {
       port: 3000,
       open: true
     }
   })
   ```

2. Or manually copy assets to `public/assets/models/` during build

## ✅ Verification

After setup, verify your models load by:

1. Starting the dev server: `npm run dev`
2. Opening browser console (F12)
3. Checking for any 404 errors on model files
4. If models don't load, check the Network tab for failed requests

## 🔧 Troubleshooting Model Paths

**Issue:** Models show 404 errors

**Solutions:**
- Ensure files are in `public/assets/models/` (for Option 1)
- Check file names match exactly (case-sensitive)
- Verify paths in `animals.json` match file locations
- Clear browser cache and restart dev server

**Issue:** Models load but appear black/white

**Solutions:**
- Check if GLB files are valid (try opening in a 3D viewer)
- Ensure models have materials/textures
- Check browser console for material errors

## 📝 Current Model Paths

Based on your existing structure, models are expected at:
- `/assets/models/Cow.glb`
- `/assets/models/Horse.glb`
- `/assets/models/Wolf.glb`
- etc.

These paths will work if models are in `public/assets/models/` folder.

