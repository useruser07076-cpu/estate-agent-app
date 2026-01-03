# Deployment Guide

## Prerequisites
- Node.js installed (v14 or higher)
- Git installed
- GitHub account

## Local Development Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm start
```
The application will open at `http://localhost:3000`

3. **Run Tests**
```bash
npm test
```

4. **Build for Production**
```bash
npm run build
```

## GitHub Pages Deployment

### Option 1: Using gh-pages package (Recommended)

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
Add the following to your package.json:
```json
{
  "homepage": "https://yourusername.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. **Deploy**
```bash
npm run deploy
```

### Option 2: Manual Deployment

1. **Build the application**
```bash
npm run build
```

2. **Initialize Git (if not already done)**
```bash
git init
git add .
git commit -m "Initial commit"
```

3. **Create GitHub Repository**
- Go to GitHub and create a new repository
- Don't initialize with README

4. **Push to GitHub**
```bash
git remote add origin https://github.com/yourusername/repository-name.git
git branch -M main
git push -u origin main
```

5. **Configure GitHub Pages**
- Go to repository Settings > Pages
- Source: Deploy from a branch
- Branch: Select `gh-pages` and `/(root)`
- Click Save

6. **Deploy using gh-pages**
```bash
npm run deploy
```

## Alternative: Netlify Deployment

1. **Build the application**
```bash
npm run build
```

2. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

3. **Deploy**
```bash
netlify deploy --prod --dir=build
```

## Alternative: Vercel Deployment

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

## Environment Configuration

For GitHub Pages, update `package.json`:
```json
"homepage": "."
```

This ensures assets load correctly regardless of deployment path.

## Important Notes

1. **Before Deployment:**
   - Test all functionality locally
   - Run `npm test` to ensure all tests pass
   - Check responsive design on different screen sizes
   - Verify security headers are in place

2. **After Deployment:**
   - Verify all images load correctly
   - Test search functionality
   - Test favourites system
   - Check responsive layouts on mobile devices
   - Verify Google Maps integration (if API key configured)

3. **Common Issues:**
   - **404 on refresh**: Add a 404.html that redirects to index.html
   - **Images not loading**: Check image paths are relative
   - **CSS not applied**: Verify build process completed successfully

## Testing Deployment

After deployment, test:
1. ✅ Search functionality with various criteria
2. ✅ Add/remove favourites
3. ✅ Property detail view
4. ✅ Image gallery navigation
5. ✅ Responsive design on mobile
6. ✅ Tabs functionality
7. ✅ Drag and drop features

## Maintenance

To update the deployed version:
```bash
npm run deploy
```

## Rollback

If you need to rollback to a previous version:
```bash
git checkout <previous-commit-hash>
npm run deploy
```

## Support

For issues with deployment:
1. Check GitHub Pages documentation
2. Verify package.json configuration
3. Check browser console for errors
4. Verify all dependencies are installed

## Performance Optimization

Before deploying:
1. Optimize images (compress to web-friendly sizes)
2. Run `npm run build` to create optimized production build
3. Enable caching headers if possible
4. Consider lazy loading for images

## Security Checklist

Before deployment, verify:
- ✅ CSP headers configured in index.html
- ✅ Input sanitization implemented
- ✅ No sensitive data in code
- ✅ HTTPS enabled (automatic with GitHub Pages)
- ✅ Dependencies up to date (run `npm audit`)
