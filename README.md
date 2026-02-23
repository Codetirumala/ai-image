# 🌟 NeonAI - AI Image Generator

<div align="center">

![NeonAI Banner](https://img.shields.io/badge/NeonAI-Image%20Generator-ff00ff?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmMDBmZiIgZD0iTTEyIDJMMyAxNGwxLjUgMUwxMiA2bDcuNSA5IDEuNS0xeiIvPjwvc3ZnPg==)

**A stunning AI-powered image generator with a beautiful neon cyberpunk theme**

[![React](https://img.shields.io/badge/React-18.2.0-00ffff?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.5-ff00ff?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16-bf00ff?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-5.0-00ff80?style=flat-square&logo=vite)](https://vitejs.dev/)

</div>

---

## ✨ Features

- 🎨 **Stunning Neon Theme** - Beautiful cyberpunk-inspired design with glowing effects
- 🚀 **High-End Animations** - Smooth animations powered by Framer Motion
- 🖼️ **AI Image Generation** - Generate images from text prompts
- 🎭 **Multiple Art Styles** - Choose from Realistic, Anime, Digital Art, Oil Painting, Cyberpunk, and 3D
- 📱 **Fully Responsive** - Works beautifully on all devices
- 🔓 **No Authentication** - Start creating immediately without any signup
- 💾 **Download Images** - Save your generated images instantly
- 🖼️ **Gallery View** - Browse and manage your creations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🎨 Theme Features

### Neon Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Neon Pink | `#ff00ff` | Primary accent, buttons |
| Neon Cyan | `#00ffff` | Secondary accent, highlights |
| Neon Purple | `#bf00ff` | Gradients, borders |
| Dark Background | `#0a0a0f` | Main background |

### Animations Included

- ✅ Pulse Neon Effect
- ✅ Floating Animation
- ✅ Gradient Flow
- ✅ Particle System
- ✅ Glowing Borders
- ✅ Loading Spinner
- ✅ Text Glow
- ✅ Hover Effects
- ✅ Page Transitions

## 📁 Project Structure

```
ai-image/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ImageGenerator.jsx
│   │   ├── Gallery.jsx
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── ParticleBackground.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🔧 Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

## 🎯 Customization

### Adding Your AI API

Replace the mock image generation in `src/components/ImageGenerator.jsx`:

```javascript
const generateImage = async () => {
  setIsGenerating(true)
  
  // Replace with your API call
  const response = await fetch('YOUR_AI_API_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      prompt: prompt,
      style: selectedStyle 
    })
  })
  
  const data = await response.json()
  // Handle the response
  
  setIsGenerating(false)
}
```

### Modifying Colors

Edit `tailwind.config.js` to customize the neon colors:

```javascript
colors: {
  neon: {
    pink: '#ff00ff',    // Change your pink
    cyan: '#00ffff',    // Change your cyan
    purple: '#bf00ff',  // Change your purple
  }
}
```

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

<div align="center">

**Made with 💜 and lots of ✨ neon glow**

</div>