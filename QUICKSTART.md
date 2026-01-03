# Quick Start Guide

## Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd estate-agent-app
npm install
```

This will install all required packages:
- React and React DOM
- React Tabs
- React DatePicker
- DOMPurify
- Testing libraries

### Step 2: Run the Application
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

### Step 3: Run Tests
```bash
npm test
```

Press `a` to run all tests. You should see 13 tests pass.

## What You'll See

1. **Search Page**: 
   - Search form with 5 filter options
   - 7 properties displayed initially
   - Favourites sidebar on the right

2. **Search Features**:
   - Filter by property type (House/Flat)
   - Set price range (min/max)
   - Select bedroom count (min/max)
   - Choose date range with calendar picker
   - Enter postcode area (e.g., BR5, BR6)

3. **Property Cards**:
   - Click ★ to add to favourites
   - Drag card to favourites sidebar
   - Click "View Details" for full information

4. **Property Details**:
   - Image gallery with 8 photos
   - Navigation arrows and thumbnails
   - Tabs: Description / Floor Plan / Map
   - Add/remove from favourites

5. **Favourites**:
   - Displayed in right sidebar
   - Click × to remove
   - Drag to drop zone to remove
   - Click "Clear All" to remove all

## Testing the Features

### Search Functionality
1. Select "House" from Property Type
2. Click "Search"
3. See only houses in results

### Price Filter
1. Enter Min Price: 300000
2. Enter Max Price: 500000
3. Click "Search"
4. See properties in that range

### Favourites
1. Click ★ on any property card
2. See it appear in favourites sidebar
3. Click × to remove
4. Or drag it to the drop zone

### Responsive Design
1. Open browser DevTools (F12)
2. Click device toolbar (mobile view)
3. Resize window
4. See layout change at 768px and 1024px

## Project Structure

```
estate-agent-app/
├── src/
│   ├── components/          # React components
│   │   ├── SearchPage.js    # Main search page
│   │   ├── SearchResults.js # Property cards grid
│   │   ├── FavouritesList.js # Sidebar favourites
│   │   └── PropertyDetail.js # Detail page
│   ├── App.js               # Main app component
│   ├── App.css              # All styling
│   ├── properties.json      # Property data (7 properties)
│   └── App.test.js          # Test suite
├── public/
│   └── index.html           # HTML template
└── package.json             # Dependencies
```

## Common Tasks

### Add More Properties
Edit `src/properties.json` and add new property objects.

### Change Colors
Edit `src/App.css` - main color is `#667eea`

### Modify Search Logic
Edit `src/components/SearchPage.js` - see `filterProperties()` function

### Add More Tests
Create new test files in `src/components/` with `.test.js` extension

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions to:
- GitHub Pages
- Netlify
- Vercel

## Troubleshooting

### Port 3000 already in use
```bash
# Kill the process on port 3000
npx kill-port 3000
# Or use a different port
PORT=3001 npm start
```

### Tests failing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm test
```

### Images not loading
- Images use placeholder URLs
- Upload actual images to `public/images/` folder
- Update paths in `properties.json`

## Need Help?

- Check README.md for full documentation
- Review IMPLEMENTATION_NOTES.md for detailed explanations
- See DEPLOYMENT.md for deployment issues

## Next Steps

1. ✅ Test all features locally
2. ✅ Run test suite (`npm test`)
3. ✅ Build for production (`npm run build`)
4. ✅ Set up GitHub repository
5. ✅ Deploy to GitHub Pages
6. ✅ Prepare for viva demonstration

## Features Checklist

- [x] Property search (5 criteria)
- [x] Results display with images
- [x] Property detail page
- [x] Image gallery (8 images)
- [x] React tabs (3 tabs)
- [x] Add to favourites (button + drag)
- [x] Remove from favourites (button + drag)
- [x] Clear all favourites
- [x] Responsive design (3 layouts)
- [x] Security (CSP + sanitization)
- [x] 13 JEST tests
- [x] Clean, commented code

All features are working and ready for demonstration!
