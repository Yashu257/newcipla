# Deployment Guide for Cloudflare Pages

## 🚀 Deploy to Cloudflare Pages

### Step 1: Go to Cloudflare Dashboard

1. Visit [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages**
3. Click **Create Application** → **Pages** → **Connect to Git**

### Step 2: Connect Your Repository

1. Authorize Cloudflare to access your GitHub account
2. Select repository: `Yashu257/newcipla`

### Step 3: Configure Build Settings

**IMPORTANT**: Use these exact settings:

- **Project name**: `newcipla` (or your preferred name)
- **Production branch**: `main`
- **Framework preset**: `None` (leave blank)
- **Build command**: `npm run build`
- **Build output directory**: `.output/public`
- **Root directory**: `newcipla2-main`

### Step 4: Add Environment Variables

Click **Add variable** and add these:

| Variable Name | Value |
|--------------|-------|
| `NODE_VERSION` | `20` |
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |

**To find your Supabase credentials:**
1. Go to your Supabase project dashboard
2. Click on Settings → API
3. Copy the Project URL and anon/public key

### Step 5: Deploy

1. Click **Save and Deploy**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at `https://newcipla.pages.dev`

## 🔧 Troubleshooting

### If build fails with "Could not detect static files":

Make sure you set:
- **Build command**: `npm run build` (NOT `npx wrangler deploy`)
- **Build output directory**: `.output/public`
- **Root directory**: `newcipla2-main`

### If you see "Module not found" errors:

Add environment variable:
- `NODE_VERSION` = `20`

### If Supabase doesn't work:

Make sure you added both environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📝 Custom Domain (Optional)

After deployment:
1. Go to your Pages project
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Follow the instructions to add your domain

## 🔄 Automatic Deployments

Every time you push to the `main` branch on GitHub, Cloudflare will automatically rebuild and deploy your site.

## 💡 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## ⚡ Why Cloudflare Pages?

- ✅ Free unlimited bandwidth
- ✅ Global CDN with 300+ locations
- ✅ Automatic HTTPS
- ✅ Built-in DDoS protection
- ✅ Instant rollbacks
- ✅ Preview deployments for every commit
