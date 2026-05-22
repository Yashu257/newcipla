# Deployment Guide

## ⚠️ Important: This app is built for Cloudflare Workers

This TanStack Start application is configured to deploy on **Cloudflare Pages/Workers**, not Vercel. 

## 🚀 Recommended: Deploy to Cloudflare Pages

### Option 1: Cloudflare Pages (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **Create Application** → **Pages**
3. Connect your GitHub repository: `https://github.com/Yashu257/newcipla.git`
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.output/public`
   - **Root directory**: `newcipla2-main`
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Save and Deploy**

### Option 2: Deploy with Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run build
wrangler pages deploy .output/public --project-name=newcipla
```

## 🔧 Alternative: Deploy to Vercel (Requires Changes)

If you must use Vercel, you'll need to:

1. **Change the build adapter** from Cloudflare to Vercel
2. **Modify vite.config.ts** to use Vercel's adapter
3. **Update dependencies** to include Vercel-specific packages

This requires significant code changes and is not recommended for this project.

## 📝 Why Cloudflare?

- Your app uses `@cloudflare/vite-plugin`
- The `wrangler.jsonc` configuration is for Cloudflare Workers
- TanStack Start is configured with Cloudflare compatibility flags
- The build output (`.output`) is structured for Cloudflare's edge runtime

## 🌐 After Deployment

Once deployed on Cloudflare Pages, your site will be available at:
`https://newcipla.pages.dev`

You can also add a custom domain in the Cloudflare Pages settings.
