import React from 'react';

/**
 * FavouritesList Component
 * Displays user's favourite properties in sidebar with drag-and-drop support
 */
function FavouritesList({ favourites, removeFromFavourites, clearFavourites, viewProperty }) {
  /**
   * Handle drop event for adding to favourites
   */
  const handleDrop = (e) => {
    e.preventDefault();
    // Property is added via drag from SearchResults
  };

  /**
   * Handle drag over event
   */
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  /**
   * Handle drag start for removal
   */
  const handleDragStart = (e, propertyId) => {
    e.dataTransfer.setData('removePropertyId', propertyId);
  };

  return (
    <div
      className="favourites-list"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="favourites-header">
        <h2>Favourites ({favourites.length})</h2>
        {favourites.length > 0 && (
          <button
            onClick={clearFavourites}
            className="btn btn-danger btn-small"
            title="Clear all favourites"
          >
            Clear All
          </button>
        )}
      </div>

      {favourites.length === 0 ? (
        <div className="favourites-empty">
          <p>No favourites yet</p>
          <p className="help-text">Drag properties here or click the ★ button to add favourites</p>
        </div>
      ) : (
        <div className="favourites-items">
          {favourites.map(property => (
            <div
              key={property.id}
              className="favourite-item"
              draggable
              onDragStart={(e) => handleDragStart(e, property.id)}
            >
              <div className="favourite-content" onClick={() => viewProperty(property)}>
                <img
                  src={property.picture}
                  alt={property.location}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x60?text=Property';
                  }}
                />
                <div className="favourite-details">
                  <p className="favourite-price">£{property.price.toLocaleString()}</p>
                  <p className="favourite-location">{property.location}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromFavourites(property.id)}
                className="remove-favourite-btn"
                title="Remove from favourites"
                aria-label="Remove from favourites"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {favourites.length > 0 && (
        <div
          className="drop-zone-remove"
          onDrop={(e) => {
            e.preventDefault();
            const propertyId = e.dataTransfer.getData('removePropertyId');
            if (propertyId) {
              removeFromFavourites(propertyId);
            }
          }}
          onDragOver={handleDragOver}
        >
          Drop here to remove
        </div>
      )}
    </div>
  );
}

export default FavouritesList;
