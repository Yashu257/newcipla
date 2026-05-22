# Cipla Medical Website

A modern medical website built with React, TanStack Router, and Vite.

## 🚀 Deployment on Vercel

### Quick Deploy

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `https://github.com/Yashu257/newcipla.git`
4. Vercel will auto-detect the framework settings
5. Click "Deploy"

### Environment Variables

If your project uses Supabase or other services, add these environment variables in Vercel:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add the variables from your `.env` file:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - Any other environment variables your app needs

### Build Settings

The project is configured with `vercel.json`:
- **Build Command**: `npm run build`
- **Output Directory**: `.output/public`
- **Framework**: Vite

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Tech Stack

- React 19
- TanStack Router & React Start
- Vite
- Tailwind CSS
- Radix UI Components
- Supabase (Authentication & Database)
- TypeScript

## 📝 License

Private project
