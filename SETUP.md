# Setup Instructions

## 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

If you run into issues with the package.json, use this updated version:
```bash
rm package.json package-lock.json
cp package.json.backup package.json
npm install
```

## 2. Environment Setup

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenRouter API key:

```env
NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
```

### Get Your OpenRouter API Key

1. Go to [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up or login
3. Generate a new API key
4. Copy it to your `.env.local` file

## 3. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 4. First Run

1. You'll see a "Welcome to Six Hats AI" message
2. Click the ⚙️ Settings icon in the top right
3. Paste your OpenRouter API key and click "Save API Key"
4. Type a question in the input area (e.g., "How can I improve my productivity?")
5. Press Enter or click Send
6. Watch as all 6 thinking hats respond with their unique perspectives!

## Troubleshooting

### "API key not set" error
- Make sure you've saved your OpenRouter API key in settings
- Check that the key is correctly copied from openrouter.ai

### Build errors with dependencies
- Try deleting `node_modules` and `.next` folder
- Run `npm install` again
- Then `npm run dev`

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Streaming responses not working
- Check your OpenRouter account has sufficient credits
- Verify your API key hasn't expired
- Check browser console (F12) for error messages

## Next Steps

- **Customize Models**: Edit `lib/thinking-hats.ts` to change which OpenRouter models each hat uses
- **Adjust Creativity**: Modify temperature values in `lib/thinking-hats.ts`
- **Add More Hats**: The system is designed to be easily extended to more than 6 perspectives
- **Deploy**: Build with `npm run build` and deploy to Vercel, Netlify, or your preferred hosting

## Features Included

✅ 6 Thinking Hats with unique personalities  
✅ Real-time streaming responses  
✅ Shared conversation context  
✅ Local storage (no database)  
✅ OpenRouter multi-model support  
✅ De Bono creativity techniques  
✅ Dark/light theme support  
✅ Responsive design  

## Support

For issues:
1. Check the README.md
2. Review the GitHub Issues
3. Check your OpenRouter API key and credits
