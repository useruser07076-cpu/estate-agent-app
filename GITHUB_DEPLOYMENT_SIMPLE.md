# Simple GitHub Deployment Guide

## Step-by-Step Instructions (Easiest Method)

### Part 1: Prepare Your Application (5 minutes)

1. **Extract the zip file** to a folder on your computer

2. **Open terminal/command prompt** in that folder
   - Windows: Right-click in folder → "Open in Terminal" or "Git Bash Here"
   - Mac: Right-click folder → "New Terminal at Folder"

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Test it works locally**
   ```bash
   npm start
   ```
   - Should open in browser at http://localhost:3000
   - Press Ctrl+C to stop the server

---

### Part 2: Create GitHub Repository (3 minutes)

1. **Go to GitHub** (https://github.com)
   - Log in to your account

2. **Create a new repository**
   - Click the **"+"** icon (top right) → "New repository"
   - Repository name: `estate-agent-app` (or any name you like)
   - Description: "Property search application for coursework"
   - **Keep it PUBLIC** (so GitHub Pages works for free)
   - **DON'T** check "Add a README file"
   - Click **"Create repository"**

3. **Copy the repository URL**
   - You'll see something like: `https://github.com/YOUR-USERNAME/estate-agent-app.git`
   - Keep this page open

---

### Part 3: Upload Your Code (5 minutes)

Back in your terminal (in the estate-agent-app folder):

```bash
# Step 1: Initialize Git
git init

# Step 2: Add all files
git add .

# Step 3: Create first commit
git commit -m "Initial commit - Estate Agent App"

# Step 4: Connect to GitHub (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR-USERNAME/estate-agent-app.git

# Step 5: Rename branch to main
git branch -M main

# Step 6: Push to GitHub
git push -u origin main
```

**Important:** Replace `YOUR-USERNAME` with your actual GitHub username!

If it asks for credentials:
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your password)
  - Get token at: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Check "repo" scope
  - Copy the token and use it as password

---

### Part 4: Deploy to GitHub Pages (2 minutes)

1. **Install gh-pages package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   
   Open `package.json` and add this line at the top (after `"private": true,`):
   ```json
   "homepage": "https://YOUR-USERNAME.github.io/estate-agent-app",
   ```

   And add these two lines in the `"scripts"` section:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

   Your scripts section should look like:
   ```json
   "scripts": {
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test",
     "eject": "react-scripts eject",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. **Deploy!**
   ```bash
   npm run deploy
   ```

   This will:
   - Build your app
   - Create a `gh-pages` branch
   - Upload to GitHub
   - Takes about 1-2 minutes

4. **Wait a moment** (30 seconds) then visit:
   ```
   https://YOUR-USERNAME.github.io/estate-agent-app
   ```

   Your app is now LIVE! 🎉

---

### Part 5: Final Git Commit (1 minute)

Save the package.json changes to GitHub:

```bash
git add package.json
git commit -m "Add deployment configuration"
git push
```

---

## Your Submission URLs

After deployment, you'll have:

1. **GitHub Repository URL:**
   ```
   https://github.com/YOUR-USERNAME/estate-agent-app
   ```

2. **Live Application URL:**
   ```
   https://YOUR-USERNAME.github.io/estate-agent-app
   ```

**Submit BOTH URLs to Blackboard!**

---

## Troubleshooting

### "gh-pages not found"
```bash
npm install --save-dev gh-pages
npm run deploy
```

### "Permission denied"
- Use Personal Access Token instead of password
- Get it from: https://github.com/settings/tokens

### "Cannot push to main"
```bash
git pull origin main --allow-unrelated-histories
git push
```

### Page shows 404
- Wait 1-2 minutes after deployment
- Check repository Settings → Pages is enabled
- Make sure repository is PUBLIC

### Blank page on GitHub Pages
- Check browser console for errors
- Verify `homepage` in package.json is correct
- Try `npm run build` locally first to check for errors

---

## Quick Reference Commands

```bash
# Start local development
npm start

# Run tests
npm test

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Check status
git status

# Commit changes
git add .
git commit -m "Your message here"
git push
```

---

## Making Updates Later

When you make changes to your code:

```bash
# 1. Test locally
npm start

# 2. Commit changes
git add .
git commit -m "Description of changes"
git push

# 3. Deploy updates
npm run deploy
```

---

## Video Tutorial Alternative

If you prefer video instructions, search YouTube for:
- "Deploy React App to GitHub Pages"
- "React gh-pages deployment tutorial"

Most tutorials follow the same steps as above.

---

## Need Help?

- GitHub Pages issues: Check https://pages.github.com
- Repository settings: Go to your repo → Settings → Pages
- Token creation: https://github.com/settings/tokens

---

## Expected Timeline

- Part 1 (Prepare): 5 minutes
- Part 2 (Create repo): 3 minutes
- Part 3 (Upload code): 5 minutes
- Part 4 (Deploy): 2 minutes
- Part 5 (Final commit): 1 minute

**Total: ~15 minutes** from start to live website! 🚀
