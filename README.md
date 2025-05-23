# 4x4 Sudoku Game

A modern, interactive 4x4 Sudoku game built with React, TypeScript, and Vite. This project features a clean, responsive design and engaging gameplay mechanics.

## 🎮 Features

- **4x4 Sudoku Grid**: A compact and challenging variant of the classic Sudoku game
- **Real-time Scoring**: Earn points for correct moves and lose points for incorrect ones
- **Timer**: Track your solving time
- **Responsive Design**: Play on any device with a beautiful, adaptive interface
- **Visual Feedback**: Clear indicators for correct and incorrect moves
- **Game Controls**: Solve and restart the game.

## 🎯 Game Rules

1. Fill the 4x4 grid with numbers 1-4
2. Each row must contain numbers 1-4 without repetition
3. Each column must contain numbers 1-4 without repetition
4. Each 2x2 box must contain numbers 1-4 without repetition
5. Earn points for correct moves
6. Lose points for incorrect moves
7. Use hints wisely - they're limited!

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/sudoku-4x4.git
cd sudoku-4x4
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `dist` directory.

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Animations**: React Confetti

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

```

## 🏗️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

### Code Style

The project uses TypeScript for type safety and better development experience. Follow these guidelines:

- Use functional components with hooks
- Implement proper TypeScript types
- Follow React best practices
- Write tests for new features

## 🌐 Deployment

The project is configured for deployment on Netlify.

```
