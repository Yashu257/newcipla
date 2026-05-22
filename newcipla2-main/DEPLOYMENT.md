# ✅ CORRECT Deployment Guide for Cloudflare Pages

## 🚨 IMPORTANT: Use These EXACT Settings

Your build creates files in `dist/client`, not `.output/public`!

## 🚀 Step-by-Step Deployment

### Step 1: Go to Cloudflare Pages (NOT Workers!)

1. Visit [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Workers & Pages** in the left sidebar
3. Click **Create Application**
4. Choose **Pages** tab (NOT Workers!)
5. Click **Connect to Git**

### Step 2: Connect Repository

1. Authorize GitHub if needed
2. Select: `Yashu257/newcipla`
3. Click **Begin setup**

### Step 3: Configure Build Settings - COPY THESE EXACTLY

```
Project name: newcipla
Production branch: main
Framework preset: None
Build command: npm run build
Build output directory: dist/client
Root directory (path): newcipla2-main
```

**⚠️ CRITICAL**: The build output directory MUST be `dist/client` (not `.output/public`)

### Step 4: Environment Variables

Click **Add variable** for each:

| Variable Name | Value |
|--------------|-------|
| `NODE_VERSION` | `20` |
| `VITE_SUPABASE_URL` | (from your .env file) |
| `VITE_SUPABASE_ANON_KEY` | (from your .env file) |

### Step 5: Deploy

1. Click **Save and Deploy**
2. Wait 2-3 minutes
3. Your site will be live at `https://newcipla.pages.dev`

## 🔧 If You Already Created a Project

If you already have a project that's failing:

1. Go to your project in Cloudflare Pages
2. Click **Settings** → **Builds & deployments**
3. Update **Build output directory** to: `dist/client`
4. Update **Root directory** to: `newcipla2-main`
5. Go to **Deployments** tab
6. Click **Retry deployment**

## 📋 Quick Checklist

- ✅ Using Cloudflare **Pages** (not Workers)
- ✅ Build command: `npm run build`
- ✅ Build output directory: `dist/client` ← IMPORTANT!
- ✅ Root directory: `newcipla2-main`
- ✅ NODE_VERSION = 20
- ✅ Supabase env vars added

## 🎯 Why This Failed Before

The error "Could not detect static files" happened because:
1. You might have used Workers instead of Pages
2. The build output directory was wrong (`.output/public` instead of `dist/client`)
3. The build command might have been `npx wrangler deploy` instead of `npm run build`

## 💡 After Successful Deployment

Your site will be at: `https://newcipla.pages.dev`

To add a custom domain:
1. Go to your Pages project
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Follow the DNS instructions

## 🔄 Automatic Deployments

Every push to `main` branch will automatically trigger a new deployment.

## 🧪 Local Testing

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# The output will be in dist/client/
```
