# Tic-Tac-Toe Farcaster MiniApp

A simple tic-tac-toe game built as a Farcaster miniapp for Base, where you play against the CPU.

## Features

- Classic tic-tac-toe gameplay
- CPU opponent with minimax algorithm (unbeatable)
- Responsive design optimized for Farcaster miniapp dimensions (424x695px)
- Lexend font with Arial fallback
- Farcaster MiniApp SDK integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Configuration

Before deploying, update the following:

1. **farcaster.json** (`public/.well-known/farcaster.json`):
   - Replace `https://yourdomain.com` with your actual domain
   - Add your icon, splash, hero, and screenshot image URLs
   - After deployment, use the [Base Build Account Association Tool](https://www.base.dev) to generate and add the `accountAssociation` fields

2. **index.html**:
   - Update the OG image URL in the meta tags
   - Update the domain in meta tags

## Deployment

1. Deploy your app to a hosting service (Vercel, Netlify, etc.)
2. Ensure `farcaster.json` is accessible at `https://yourdomain.com/.well-known/farcaster.json`
3. Sign your manifest using the [Base Build Account Association Tool](https://www.base.dev)
4. Test your miniapp in the Farcaster client

## Specifications

- **Dimensions**: 424×695 pixels (web)
- **Font**: Lexend with Arial fallback
- **Framework**: React + Vite
- **SDK**: @farcaster/miniapp-sdk

