# Estate Agent Property Search Application

A responsive React-based Single Page Application (SPA) for searching and managing property listings.

## Features

- **Advanced Search**: Filter properties by type, price range, bedrooms, date added, and postcode area
- **Property Details**: View detailed property information with image gallery and interactive tabs
- **Favourites System**: Add/remove properties to favourites using drag-and-drop or buttons
- **Responsive Design**: Optimized layouts for desktop, tablet, and mobile devices
- **Security**: Implements Content Security Policy (CSP) and input sanitization
- **Image Gallery**: Browse through multiple property images with thumbnail navigation
- **React Tabs**: Organized property information including description, floor plan, and map location

## Technologies Used

- React 18.2.0
- React Tabs
- React DatePicker
- DOMPurify (for XSS prevention)
- CSS Grid & Flexbox
- LocalStorage for persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## Project Structure

```
estate-agent-app/
├── public/
│   ├── index.html
│   └── images/          # Property images (placeholder)
├── src/
│   ├── components/
│   │   ├── SearchPage.js
│   │   ├── SearchResults.js
│   │   ├── FavouritesList.js
│   │   └── PropertyDetail.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── properties.json  # Property data (7 properties)
└── package.json
```

## Features Implementation

### Search Functionality (10%)
- Multi-criteria search supporting any combination of filters
- Type, price range, bedrooms, date range, and postcode filtering
- Real-time results updating

### React UI Widgets (8%)
- React DatePicker for date selection
- Custom select dropdowns
- Enhanced form controls

### Results Display (7%)
- Grid layout with property cards
- Images, descriptions, and pricing
- Responsive card design

### Property Gallery (5%)
- 8 images per property with navigation
- Thumbnail selection
- Full-screen image viewing

### React Tabs (7%)
- Description tab with property details
- Floor plan visualization
- Google Maps integration

### Favourites System (18%)
- Drag-and-drop to add properties
- Button-based add/remove
- Duplicate prevention
- Persistent storage using LocalStorage
- Clear all functionality

### Responsive Design (8%)
- Mobile-first approach
- Breakpoints at 768px and 1024px
- Flexible grid layouts
- Touch-friendly controls

### Security (3%)
- Content Security Policy in HTML
- Input sanitization to prevent XSS
- HTML encoding for user inputs

### Code Quality (4%)
- Comprehensive comments
- Proper indentation
- Modular component structure
- Semantic HTML

## Security Features

1. **Content Security Policy (CSP)**: Defined in index.html to restrict resource loading
2. **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
3. **HTML Encoding**: Special characters are encoded in user-generated content

## Responsive Breakpoints

- **Desktop**: > 1024px - Full layout with sidebar
- **Tablet**: 768px - 1024px - Stacked layout
- **Mobile**: < 768px - Single column, optimized for touch

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes for Deployment

Before deploying to GitHub Pages:
1. Update the `homepage` field in package.json
2. Run `npm run build`
3. Deploy the build folder

## Assignment Requirements Met

- ✅ 7 properties with diverse characteristics
- ✅ React UI widgets on all form elements
- ✅ Multi-criteria search functionality
- ✅ Attractive results display
- ✅ Image gallery with 6-8 images
- ✅ React tabs implementation
- ✅ Drag-and-drop favourites
- ✅ Duplicate prevention
- ✅ Remove and clear favourites
- ✅ Responsive design with media queries
- ✅ Client-side security (CSP + sanitization)
- ✅ Clean, commented code

## Author

Created for 5COSC026W Advanced Client-Side Web Development coursework

## License

This project is for educational purposes only.
