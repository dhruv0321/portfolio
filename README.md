# Portfolio

A bold, modern fullstack developer portfolio built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Bold Design** - Vibrant blue-to-purple gradient aesthetic
- 📱 **Responsive** - Mobile-first design that works on all devices  
- ⚡ **Fast** - Optimized production build with Vite
- 🎯 **4 Complete Pages** - Home hero, Projects showcase, Experience timeline, Resume
- 🧭 **Navigation** - Sticky nav with mobile menu
- ✨ **Animations** - Smooth transitions and micro-interactions

## Tech Stack

- React 19.2.0 + TypeScript
- Tailwind CSS v4
- React Router v7
- Vite + ESLint
- Lucide React icons

## Getting Started

```bash
npm install          # Install dependencies
npm run dev         # Start dev server (http://localhost:5173/portfolio/)
npm run build       # Build for production
npm run deploy      # Deploy to GitHub Pages
npm run lint        # Check code quality
```

## Project Structure

```
src/
├── Home.tsx                 # Home/hero page
├── main.tsx                 # App entry with routing
├── index.css               # Tailwind CSS styles
├── components/
│   ├── Navigation.tsx      # Sticky navigation
│   ├── Layout.tsx          # Page wrapper
│   └── Footer.tsx          # Contact footer
└── pages/
    ├── Projects.tsx        # Projects showcase
    ├── Experience.tsx      # Timeline + skills
    └── Resume.tsx          # Resume page
```

## Customization

Update these files with your content:

- `src/pages/Projects.tsx` - Your actual projects
- `src/pages/Experience.tsx` - Your work history
- `src/pages/Resume.tsx` - Your qualifications  
- `src/components/Footer.tsx` - Your contact info
- `public/resume.pdf` - Your resume file

## Live

🌐 [https://dhruv0321.github.io/portfolio/](https://dhruv0321.github.io/portfolio/)

## Build Specs

- JavaScript: 253KB (79.60KB gzipped)
- CSS: 34KB (5.84KB gzipped)
- TypeScript: 100% type-safe
- ESLint: Zero errors
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
