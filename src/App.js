import React, { useState } from 'react';
import './App.css';
import SearchPage from './components/SearchPage';
import PropertyDetail from './components/PropertyDetail';
import propertiesData from './properties.json';

/**
 * Main App Component
 * Manages routing between search page and property detail page
 * Handles global state for favourites list
 */
function App() {
  // State to track current page view
  const [currentView, setCurrentView] = useState('search');
  // State to track selected property for detail view
  const [selectedProperty, setSelectedProperty] = useState(null);
  // State to manage favourites list with localStorage persistence
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  });

  /**
   * Add a property to favourites
   * Prevents duplicates and persists to localStorage
   */
  const addToFavourites = (property) => {
    setFavourites(prev => {
      // Check if property already exists in favourites
      const exists = prev.some(fav => fav.id === property.id);
      if (exists) {
        return prev;
      }
      const updated = [...prev, property];
      localStorage.setItem('favourites', JSON.stringify(updated));
      return updated;
    });
  };

  /**
   * Remove a property from favourites by ID
   */
  const removeFromFavourites = (propertyId) => {
    setFavourites(prev => {
      const updated = prev.filter(fav => fav.id !== propertyId);
      localStorage.setItem('favourites', JSON.stringify(updated));
      return updated;
    });
  };

  /**
   * Clear all favourites
   */
  const clearFavourites = () => {
    setFavourites([]);
    localStorage.setItem('favourites', JSON.stringify([]));
  };

  /**
   * Navigate to property detail view
   */
  const viewProperty = (property) => {
    setSelectedProperty(property);
    setCurrentView('detail');
  };

  /**
   * Navigate back to search view
   */
  const backToSearch = () => {
    setCurrentView('search');
    setSelectedProperty(null);
  };

  return (
    <div className="App">
      {currentView === 'search' ? (
        <SearchPage
          properties={propertiesData.properties}
          favourites={favourites}
          addToFavourites={addToFavourites}
          removeFromFavourites={removeFromFavourites}
          clearFavourites={clearFavourites}
          viewProperty={viewProperty}
        />
      ) : (
        <PropertyDetail
          property={selectedProperty}
          favourites={favourites}
          addToFavourites={addToFavourites}
          removeFromFavourites={removeFromFavourites}
          backToSearch={backToSearch}
        />
      )}
    </div>
  );
}

export default App;
