# Deployment Guide - Anand Sweets

This guide will help you deploy your application to get a live website URL.

## Overview
- **Frontend**: Deploy to Vercel (Free)
- **Backend**: Deploy to Render (Free)

## Prerequisites
1. GitHub account (you already have this)
2. Vercel account (sign up at vercel.com with GitHub)
3. Render account (sign up at render.com with GitHub)

---

## Part 1: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment
The backend is already configured. We'll use Render's free tier.

### Step 2: Deploy on Render
1. Go to https://render.com and sign up/login with GitHub
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `anandajmeera/Anand-Sweets`
4. Configure the service:
   - **Name**: `anand-sweets-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`

5. Add Environment Variables:
   - Click "Advanced" → "Add Environment Variable"
   - Add: `SECRET_KEY` = `your-secret-key-here-change-this-in-production`
   - Add: `ALGORITHM` = `HS256`

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (will be like: `https://anand-sweets-backend.onrender.com`)

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Update Frontend API URL
Before deploying, we need to update the frontend to use the deployed backend URL.

1. In `frontend/src/api.js`, update the baseURL to your Render backend URL
2. Commit and push the change

### Step 2: Deploy on Vercel
1. Go to https://vercel.com and sign up/login with GitHub
2. Click "Add New..." → "Project"
3. Import your repository: `anandajmeera/Anand-Sweets`
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Click "Deploy"
6. Wait for deployment (2-3 minutes)
7. Your live website URL will be like: `https://anand-sweets.vercel.app`

---

## Part 3: Update README with Live Links

Once deployed, update your README.md with the live URLs:
- Live Website: `https://anand-sweets.vercel.app`
- Backend API: `https://anand-sweets-backend.onrender.com`

---

## Important Notes

### Free Tier Limitations
- **Render**: Backend may sleep after 15 minutes of inactivity (first request takes ~30 seconds to wake up)
- **Vercel**: Frontend is always fast and available

### Database
- SQLite database will reset on Render free tier when the service restarts
- For production, consider upgrading to PostgreSQL (Render offers free PostgreSQL)

### CORS
- The backend is already configured to allow CORS from any origin
- For production, update CORS settings to only allow your Vercel domain

---

## Troubleshooting

**Backend not working?**
- Check Render logs for errors
- Verify environment variables are set
- Ensure build command completed successfully

**Frontend can't connect to backend?**
- Verify the API URL in `frontend/src/api.js` matches your Render URL
- Check browser console for CORS errors

**Need help?**
- Render docs: https://render.com/docs
- Vercel docs: https://vercel.com/docs
