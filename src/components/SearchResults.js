import React from 'react';

/**
 * SearchResults Component
 * Displays the list of properties matching search criteria
 */
function SearchResults({ properties, addToFavourites, viewProperty, hasSearched }) {
  /**
   * Handle drag start event
   */
  const handleDragStart = (e, property) => {
    e.dataTransfer.setData('property', JSON.stringify(property));
  };

  return (
    <div className="search-results">
      <h2>
        {hasSearched
          ? `Found ${properties.length} ${properties.length === 1 ? 'Property' : 'Properties'}`
          : `All Properties (${properties.length})`}
      </h2>

      {properties.length === 0 ? (
        <div className="no-results">
          <p>No properties match your search criteria. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="results-grid">
          {properties.map(property => (
            <div
              key={property.id}
              className="property-card"
              draggable
              onDragStart={(e) => handleDragStart(e, property)}
            >
              <div className="property-image">
                <img
                  src={property.picture}
                  alt={`${property.type} in ${property.location}`}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdXNlfGVufDB8fDB8fHww';
                  }}
                />
                <button
                  className="favourite-btn"
                  onClick={() => addToFavourites(property)}
                  title="Add to favourites"
                  aria-label="Add to favourites"
                >
                  ★
                </button>
              </div>
              <div className="property-info">
                <h3 className="property-price">£{property.price.toLocaleString()}</h3>
                <p className="property-type">
                  {property.bedrooms} bed {property.type}
                </p>
                <p className="property-location">{property.location}</p>
                <p className="property-description">
                  {property.description.substring(0, 120)}...
                </p>
                <button
                  className="btn btn-primary view-details-btn"
                  onClick={() => viewProperty(property)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
