# MyEra Sticker Canvas

A React application built with react-konva for the MyEra Frontend Internship assignment. This interactive canvas allows users to place, drag, and manage stickers on a 600×400 pixel canvas.

## 🚀 Features

### Core Requirements
- ✅ **600×400 pixel canvas** using react-konva
- ✅ **Three sticker buttons** with PNG images (fallback to emojis)
- ✅ **Click to add stickers** at default positions
- ✅ **Draggable stickers** within the canvas
- ✅ **Download canvas** as PNG file

### Bonus Features
- ✅ **Double-click to delete** stickers
- ✅ **40-pixel grid snapping** for new stickers
- ✅ **Grid toggle** for visual alignment
- ✅ **Responsive design** for mobile devices

## 🛠️ Technologies Used

- **React** (v18.2.0) - UI Framework
- **react-konva** (v18.2.10) - Canvas interactions
- **Konva** (v9.2.0) - 2D canvas library
- **use-image** (v1.1.1) - Image loading hook

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd myera-sticker-app

2. **Install dependencies**
   npm install

## Step 3: Optional PNG Sticker Images

Create these simple PNG files and place them in `public/stickers/`:

1. **sticker1.png** - Target/bullseye image (50x50px)
2. **sticker2.png** - Star image (50x50px)  
3. **sticker3.png** - Heart image (50x50px)

*Note: If you don't have PNG images, the app will automatically fall back to emojis (🎯, ⭐, ❤️)*

## Step 4: Complete Setup Commands

```bash
# 1. Create the project
npx create-react-app myera-sticker-app
cd myera-sticker-app

# 2. Install dependencies
npm install react-konva konva use-image

# 3. Create folder structure
mkdir public/stickers
mkdir src/components

# 4. Copy all the code files (provided above)
# Replace the contents of each file with the code provided

# 5. Start the development server
npm start

# 6. Initialize Git repository
git init
git add .
git commit -m "Initial commit: MyEra sticker canvas application"

# 7. Create GitHub repository and push
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main