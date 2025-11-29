# 🎩 Six Thinking Hats AI

A creative AI chatbot powered by **Edward de Bono's Six Thinking Hats** methodology. Chat with 6 specialized AI personas simultaneously, each bringing a unique perspective to stimulate creative problem-solving.

## ✨ Features

- **🎭 6 Thinking Hats**: Each hat represents a different thinking style
  - **White Hat** (Facts & Logic) - Objective, data-focused thinking
  - **Red Hat** (Emotions & Intuition) - Feelings and gut reactions
  - **Black Hat** (Critical Thinking) - Caution and critical analysis
  - **Yellow Hat** (Optimism) - Positive possibilities and benefits
  - **Green Hat** (Creativity) - Creative alternatives using SCAMPER & random words
  - **Blue Hat** (Meta-thinking) - Process control and organization

- **🔄 Shared Context**: All hats see the full conversation history
- **⚡ Real-time Streaming**: Responses appear as they're generated
- **🎨 De Bono Techniques**:
  - Response deduplication (no repeated ideas)
  - SCAMPER prompts for creative alternatives
  - Random word injection for lateral thinking
  - Constraint-based generation
- **💾 Local Storage**: No database required - everything saved locally
- **🌐 OpenRouter**: Access to 100+ AI models
- **📱 Responsive UI**: Resizable panels with 2x3 grid layout

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/filiksyos/six-thinking-hats-ai.git
cd six-thinking-hats-ai
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenRouter API key:
```env
NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Enter your OpenRouter API key** in the settings dialog (top right)
2. **Type your question** in the shared input area
3. **Press Enter or click Send** to get responses from all 6 thinking hats
4. **Each hat will respond** with its unique perspective:
   - White Hat provides facts and data
   - Red Hat shares emotional responses
   - Black Hat points out risks and concerns
   - Yellow Hat highlights opportunities
   - Green Hat suggests creative alternatives
   - Blue Hat organizes the thinking process

## 🧠 Edward de Bono's Six Thinking Hats

This methodology helps you:
- **Avoid confusion** by separating different types of thinking
- **Explore all angles** of a problem systematically
- **Generate creative solutions** through structured brainstorming
- **Make better decisions** by considering multiple perspectives

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **AI SDK**: Vercel AI SDK with OpenRouter provider
- **State Management**: Zustand with localStorage persistence
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown with syntax highlighting

## 📁 Project Structure

```
six-thinking-hats-ai/
├── app/
│   ├── api/chat/route.ts    # Streaming API endpoint
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Main chat page
│   └── globals.css           # Global styles
├── components/
│   ├── six-hats-chat.tsx     # Main chat component
│   ├── hat-panel.tsx         # Individual hat panel
│   ├── chat-message.tsx      # Message display
│   ├── api-key-config.tsx    # API key form
│   └── settings-dialog.tsx   # Settings modal
├── lib/
│   ├── thinking-hats.ts      # Hat configurations
│   ├── de-bono-utils.ts      # Creativity techniques
│   ├── local-storage.ts      # Storage utilities
│   └── types.ts              # TypeScript types
├── stores/
│   ├── use-chat-store.ts     # Chat state
│   └── use-settings-store.ts # Settings state
└── hooks/
    └── use-streaming-message.ts # Streaming hook
```

## 🎨 Customization

### Change AI Models

Edit `lib/thinking-hats.ts` to customize which OpenRouter models each hat uses.

### Adjust Creativity Settings

- **Temperature**: Controls randomness (0.0 = deterministic, 1.0 = creative)
- **SCAMPER prompts**: Edit `lib/de-bono-utils.ts` for different creative constraints
- **Random words**: Customize the word list for lateral thinking

## 📝 License

MIT License - feel free to use this project however you like!

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 🙏 Acknowledgments

- Inspired by [open-fiesta](https://github.com/lokeswaran-aj/open-fiesta)
- Based on Edward de Bono's Six Thinking Hats methodology
- Powered by [OpenRouter](https://openrouter.ai)

---

**Built with ❤️ for creative thinkers**
