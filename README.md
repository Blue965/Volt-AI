# Volt AI - AI Workspace for Roblox Creators

A modern, clean AI-powered workspace designed specifically for Roblox developers and creators. Built with Next.js, TypeScript, TailwindCSS, and Framer Motion.

## Features

- **AI Chat Interface**: Chat with AI to generate Roblox Lua scripts, debug code, and get development help
- **Artifact System**: Preview, edit, and download generated code with Monaco Editor integration
- **Project Management**: Organize your Roblox projects and chat history
- **Modern UI/UX**: Clean, light-themed design inspired by ChatGPT, Claude, Linear, and Notion
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Code Editor**: Monaco Editor (VS Code editor for the web)
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd "Volt AI"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
Volt AI/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and Tailwind imports
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Landing page
│   │   ├── workspace/
│   │   │   └── page.tsx         # AI workspace page
│   │   ├── settings/
│   │   │   └── page.tsx         # Settings page
│   │   └── pricing/
│   │       └── page.tsx         # Pricing page
│   ├── components/
│   │   ├── LandingPage.tsx      # Landing page component
│   │   ├── Workspace.tsx        # Main workspace layout
│   │   ├── Sidebar.tsx          # Chat history sidebar
│   │   ├── ChatArea.tsx         # AI chat interface
│   │   ├── ArtifactPanel.tsx    # Code preview panel with Monaco
│   │   ├── TopNav.tsx           # Top navigation bar
│   │   ├── SettingsPage.tsx     # Settings page component
│   │   └── PricingPage.tsx      # Pricing page component
│   └── lib/
│       └── utils.ts             # Utility functions
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # TailwindCSS configuration
├── next.config.js              # Next.js configuration
└── README.md                   # This file
```

## Pages

- **/** - Landing page with hero section, features, and CTA
- **/workspace** - Main AI workspace with chat and artifact panel
- **/settings** - User settings (profile, notifications, security, appearance)
- **/pricing** - Pricing plans and FAQ

## Key Components

### Workspace
- Collapsible sidebar with chat history
- AI chat interface with streaming responses
- Artifact panel with Monaco Editor for code preview
- Smooth animations for panel transitions

### Artifact System
- Syntax highlighting for Lua, JavaScript, TypeScript, and more
- Copy to clipboard functionality
- Download code as files
- Editable code in Monaco Editor

### Design System
- Light theme with soft gray tones
- Rounded corners and smooth shadows
- Modern typography with Inter font
- Subtle hover effects and transitions
- Consistent spacing and layout

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Colors
Edit `src/app/globals.css` to customize the color scheme:

```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  /* ... other color variables */
}
```

### Tailwind Theme
Modify `tailwind.config.ts` to extend the Tailwind theme with custom colors, fonts, or spacing.

## Future Enhancements

- [x] Real AI API integration (OpenAI, Claude, etc.) via backend proxy
- [ ] User authentication and accounts
- [ ] Database for chat history persistence
- [ ] More Roblox-specific AI templates
- [ ] Team collaboration features
- [ ] Advanced debugging tools
- [ ] Roblox Studio plugin integration

### Backend API keys

This project now includes a server proxy route at `src/app/api/chat/route.ts`.

Configure one of these environment variables to enable real AI responses:

- `OPENAI_API_KEY` for OpenAI
- `CLAUDE_KEY` for Anthropic Claude

The frontend calls `/api/chat`, so the API key stays hidden on the server side.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Design inspiration from ChatGPT, Claude, Linear, Notion, and Vercel
- Built with modern web technologies for the best developer experience
