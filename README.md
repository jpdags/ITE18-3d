# 3D Animal Learning Explorer

An interactive 3D educational application that allows users to explore, rotate, and study different animals in 3D space. Built with React, Three.js, and @react-three/fiber for an immersive virtual learning experience.

## 🎯 Project Overview

This is a **FINAL SCHOOL PROJECT** focused on **3D Learning / Virtual Learning**. The application provides a guided learning experience where users can:

- Explore 3D animal models with interactive controls
- Learn about animal habitats, diets, and key traits
- Compare different animals side-by-side
- Interact with animal models through hover and click events
- Experience smooth camera transitions and animations

## ✨ Features

### Core Functionality
- ✅ **Dynamic Model Loading** - Loads animal models from GLB files
- ✅ **Animal Selection** - Switch between animals using UI controls
- ✅ **Orbit Controls** - Rotate, zoom, and pan around models
- ✅ **Smooth Camera Transitions** - Animated camera movements when switching models
- ✅ **Body Part Highlighting** - Hover effects on animal parts
- ✅ **Educational Info Panel** - Displays habitat, diet, traits, and fun facts
- ✅ **Reset View Button** - Returns camera to default position
- ✅ **Idle Animations** - Subtle breathing and rotation effects

### UI/UX Features
- 🎨 Modern, clean educational interface
- 🌙 Dark theme with soft lighting
- 📱 Responsive design
- 🎯 Immersive UI overlays
- ⚡ Smooth animations and transitions

## 🛠️ Tech Stack

- **React 18** - UI framework
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three/fiber
- **Three.js** - 3D graphics library
- **Vite** - Build tool and dev server

## 📁 Project Structure

```
ITE18-3d/
├── public/                  # Public assets (served at root)
│   └── assets/
│       └── models/          # Place your .glb files here
│           ├── Cow.glb
│           ├── Horse.glb
│           ├── Wolf.glb
│           └── ... (other animal models)
├── assets/                  # Alternative: keep models here (see setup)
│   └── models/
├── src/
│   ├── components/
│   │   ├── Scene.jsx        # Main 3D canvas and lighting
│   │   ├── AnimalModel.jsx  # GLB loading and interaction
│   │   ├── UIControls.jsx   # Animal selection UI
│   │   ├── InfoPanel.jsx    # Educational information display
│   │   └── *.css            # Component styles
│   ├── data/
│   │   └── animals.json     # Animal data (habitat, diet, traits)
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "C:\Users\Carl Ivan\Documents\18 Last Project\ITE18-3d"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Place your GLB models:**
   - **Option A (Recommended):** Create a `public` folder in the root and move/copy your `assets` folder into it:
     ```
     public/
       └── assets/
           └── models/
               ├── Cow.glb
               ├── Horse.glb
               └── ...
     ```
   - **Option B:** Keep models in root `assets/models/` and they'll be accessible
   - The models should match the paths specified in `src/data/animals.json`
   - Example paths: `/assets/models/Cow.glb`, `/assets/models/Horse.glb`, etc.
   - **Note:** Vite serves files from the `public` folder at the root URL path

4. **Update animal data (if needed):**
   - Edit `src/data/animals.json` to match your available models
   - Update `modelPath` to point to your GLB files
   - Add or modify animal information (habitat, diet, traits, etc.)

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   - The app will automatically open at `http://localhost:3000`
   - If not, navigate to the URL shown in the terminal

## 📝 Configuring Animal Models

### Adding New Animals

1. **Place the GLB file:**
   - Add your `.glb` file to `assets/models/`
   - Example: `assets/models/Elephant.glb`

2. **Update `src/data/animals.json`:**
   ```json
   {
     "id": "elephant",
     "name": "Elephant",
     "scientificName": "Loxodonta africana",
     "modelPath": "/assets/models/Elephant.glb",
     "habitat": "Savannas and forests of Africa",
     "diet": "Herbivore - grass, leaves, fruits",
     "size": "Height: 2.5-4m, Weight: 2,000-6,000kg",
     "traits": [
       "Largest land mammal",
       "Excellent memory",
       "Complex social structures"
     ],
     "funFact": "Elephants can recognize themselves in mirrors!"
   }
   ```

3. **Restart the dev server** to see your new animal

### Model Path Format

- **Development:** Use `/assets/models/AnimalName.glb`
- **Production:** The path will be resolved automatically by Vite
- **Important:** Paths are case-sensitive on some systems

## 🎮 Usage Guide

### Controls

- **Rotate:** Click and drag the model
- **Zoom:** Scroll with mouse wheel or pinch on trackpad
- **Pan:** Right-click and drag (or middle mouse button)
- **Select Animal:** Use the dropdown or quick-select buttons
- **Reset View:** Click the "Reset View" button
- **View Info:** Educational panel appears automatically on the right

### Features

1. **Animal Selection:**
   - Click the dropdown to see all available animals
   - Use quick-select buttons for fast switching
   - Active animal is highlighted

2. **Model Interaction:**
   - Hover over animal parts to see highlighting
   - Models have subtle breathing/idle animations
   - Smooth transitions when switching animals

3. **Learning:**
   - Read habitat, diet, and trait information
   - Discover fun facts about each animal
   - Compare different animals by switching between them

## 🏗️ Building for Production

### Build Command

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🚢 Deployment

### Vercel Deployment

1. **Install Vercel CLI (optional):**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   Or connect your GitHub repository to Vercel for automatic deployments.

3. **Configuration:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### GitHub Pages Deployment

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **Update base path in `vite.config.js`:**
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```

### Netlify Deployment

1. **Drag and drop** the `dist` folder to Netlify
2. Or connect your Git repository for automatic deployments
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## 🐛 Troubleshooting

### Models Not Loading

- **Check file paths:** Ensure model paths in `animals.json` match actual file locations
- **Case sensitivity:** File names are case-sensitive
- **File format:** Ensure files are in `.glb` format (not `.gltf`)
- **Console errors:** Check browser console for specific error messages

### Performance Issues

- **Large models:** Optimize GLB files using tools like glTF-Pipeline
- **Too many models:** Consider lazy loading or reducing model complexity
- **Browser:** Use a modern browser (Chrome, Firefox, Edge)

### Camera Not Resetting

- **Clear browser cache:** Sometimes cached state causes issues
- **Refresh page:** Hard refresh with `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## 📚 Educational Goals

This project achieves the following learning objectives:

1. **3D Visualization:** Students can see animals in three dimensions
2. **Interactive Learning:** Hands-on exploration enhances understanding
3. **Comparative Study:** Easy switching between animals for comparison
4. **Information Integration:** Visual and textual information combined
5. **Engagement:** Interactive 3D models increase student interest

## 🎓 Project Requirements Met

✅ **Dynamic Model Loading** - Models loaded from folder  
✅ **Animal Switching** - UI buttons and dropdown  
✅ **Orbit/Zoom/Pan** - Full camera controls  
✅ **Smooth Transitions** - Animated camera movements  
✅ **Body Part Highlighting** - Hover effects  
✅ **Educational Info Panel** - Habitat, diet, traits  
✅ **Reset View** - Camera reset functionality  
✅ **Idle Animations** - Breathing and rotation effects  
✅ **Modern UI** - Clean, educational design  
✅ **React + Three.js** - Required tech stack  

## 📄 License

This project is created for educational purposes as a final school project.

## 👨‍💻 Development Notes

### Code Structure

- **Modular Components:** Each component has a single responsibility
- **Clear Comments:** Code is well-documented for educational purposes
- **Reusable Logic:** Components can be easily extended
- **Performance Optimized:** Efficient rendering and memory management

### Future Enhancements (Optional)

- Add audio narration for each animal
- Implement comparison mode (side-by-side view)
- Add quiz functionality
- Include more detailed anatomical labels
- Support for AR/VR viewing
- Multi-language support

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify all model files are in the correct location
3. Ensure all dependencies are installed
4. Review the configuration in `animals.json`

---

**Built with ❤️ for Educational Purposes**

*Happy Learning! 🦁🐴🐺*

