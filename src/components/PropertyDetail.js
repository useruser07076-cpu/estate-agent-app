import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

/**
 * PropertyDetail Component
 * Displays detailed information about a property with image gallery and tabs
 */
function PropertyDetail({
  property,
  favourites,
  addToFavourites,
  removeFromFavourites,
  backToSearch
}) {
  // State for current displayed image
  const [currentImage, setCurrentImage] = useState(0);

  // Check if property is in favourites
  const isFavourite = favourites.some(fav => fav.id === property.id);

  /**
   * Toggle favourite status
   */
  const toggleFavourite = () => {
    if (isFavourite) {
      removeFromFavourites(property.id);
    } else {
      addToFavourites(property);
    }
  };

  /**
   * Handle drag start for adding to favourites
   */
  const handleDragStart = (e) => {
    e.dataTransfer.setData('property', JSON.stringify(property));
  };

  // Generate array of image URLs for gallery
  const images = [
    property.picture,
    property.picture.replace('small', '2'),
    property.picture.replace('small', '3'),
    property.picture.replace('small', '4'),
    property.picture.replace('small', '5'),
    property.picture.replace('small', '6'),
    property.picture.replace('small', '7'),
    property.picture.replace('small', '8')
  ];

  /**
   * Navigate to previous image
   */
  const previousImage = () => {
    setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  /**
   * Navigate to next image
   */
  const nextImage = () => {
    setCurrentImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Generate Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDVvBH0Nmg5xz2LHrAo5GIoUvL6XgNCo6Q&q=${encodeURIComponent(property.location)}`;

  return (
    <div className="property-detail">
      <header className="detail-header">
        <button onClick={backToSearch} className="btn btn-secondary">
          ← Back to Search
        </button>
        <button
          onClick={toggleFavourite}
          className={`btn favourite-toggle ${isFavourite ? 'is-favourite' : ''}`}
          draggable
          onDragStart={handleDragStart}
        >
          {isFavourite ? '★ Remove from Favourites' : '☆ Add to Favourites'}
        </button>
      </header>

      <div className="property-header-info">
        <h1>£{property.price.toLocaleString()}</h1>
        <p className="property-type-detail">
          {property.bedrooms} bedroom {property.type} - {property.tenure}
        </p>
        <p className="property-location-detail">{property.location}</p>
      </div>

      {/* Image Gallery */}
      <div className="image-gallery">
        <div className="main-image-container">
          <img
            src={images[currentImage]}
            alt={`Property view ${currentImage + 1}`}
            className="main-image"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdXNlfGVufDB8fDB8fHww';
            }}
          />
          <button className="gallery-nav prev" onClick={previousImage} aria-label="Previous image">
            ‹
          </button>
          <button className="gallery-nav next" onClick={nextImage} aria-label="Next image">
            ›
          </button>
          <div className="image-counter">
            {currentImage + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Images */}
        <div className="thumbnail-container">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${currentImage === index ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdXNlfGVufDB8fDB8fHww';
              }}
            />
          ))}
        </div>
      </div>

      {/* Property Details Tabs */}
      <div className="property-tabs">
        <Tabs>
          <TabList>
            <Tab>Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Map</Tab>
          </TabList>

          <TabPanel>
            <div className="tab-content">
              <h2>Property Description</h2>
              <p>{property.description}</p>
              <div className="property-features">
                <h3>Key Features</h3>
                <ul>
                  <li>{property.bedrooms} bedrooms</li>
                  <li>{property.type}</li>
                  <li>{property.tenure}</li>
                  <li>
                    Added: {property.added.month} {property.added.day}, {property.added.year}
                  </li>
                </ul>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              <h2>Floor Plan</h2>
              <div className="floor-plan">
                <img
                  src={`/images/${property.id}-floorplan.jpg`}
                  alt="Floor plan"
                  onError={(e) => {
                    e.target.src = 'https://plus.unsplash.com/premium_photo-1661908377130-772731de98f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdXNlfGVufDB8fDB8fHww';
                  }}
                />
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              <h2>Location</h2>
              <p className="map-address">{property.location}</p>
              <div className="map-container">
                <iframe
                  title="Property Location"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={mapUrl}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'map-placeholder';
                    placeholder.textContent = 'Map view unavailable. Location: ' + property.location;
                    e.target.parentNode.appendChild(placeholder);
                  }}
                ></iframe>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default PropertyDetail;
