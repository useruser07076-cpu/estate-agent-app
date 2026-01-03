import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchResults from './SearchResults';
import FavouritesList from './FavouritesList';
import DOMPurify from 'dompurify';

/**
 * SearchPage Component
 * Displays search form, results, and favourites list
 */
function SearchPage({
  properties,
  favourites,
  addToFavourites,
  removeFromFavourites,
  clearFavourites,
  viewProperty
}) {
  // Search criteria state
  const [searchCriteria, setSearchCriteria] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAfter: null,
    dateBefore: null,
    postcode: ''
  });

  // State to track if search has been performed
  const [hasSearched, setHasSearched] = useState(false);

  /**
   * Handle input changes for text and select fields
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Sanitize input to prevent XSS using HTML encoding
    const sanitizedValue = value.replace(/[<>]/g, '');
    setSearchCriteria(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  /**
   * Handle date input changes
   */
  const handleDateChange = (date, field) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: date
    }));
  };

  /**
   * Filter properties based on search criteria
   */
  const filterProperties = () => {
    return properties.filter(property => {
      // Filter by type
      if (searchCriteria.type !== 'any' && property.type !== searchCriteria.type) {
        return false;
      }

      // Filter by minimum price
      if (searchCriteria.minPrice && property.price < parseInt(searchCriteria.minPrice)) {
        return false;
      }

      // Filter by maximum price
      if (searchCriteria.maxPrice && property.price > parseInt(searchCriteria.maxPrice)) {
        return false;
      }

      // Filter by minimum bedrooms
      if (searchCriteria.minBedrooms && property.bedrooms < parseInt(searchCriteria.minBedrooms)) {
        return false;
      }

      // Filter by maximum bedrooms
      if (searchCriteria.maxBedrooms && property.bedrooms > parseInt(searchCriteria.maxBedrooms)) {
        return false;
      }

      // Filter by date added
      if (searchCriteria.dateAfter || searchCriteria.dateBefore) {
        const propertyDate = new Date(
          property.added.year,
          getMonthNumber(property.added.month),
          property.added.day
        );

        if (searchCriteria.dateAfter && propertyDate < searchCriteria.dateAfter) {
          return false;
        }

        if (searchCriteria.dateBefore && propertyDate > searchCriteria.dateBefore) {
          return false;
        }
      }

      // Filter by postcode area
      if (searchCriteria.postcode) {
        const postcodeArea = property.location.split(' ').pop().split(/\d/)[0];
        const searchPostcode = searchCriteria.postcode.toUpperCase().trim();
        if (!postcodeArea.toUpperCase().startsWith(searchPostcode)) {
          return false;
        }
      }

      return true;
    });
  };

  /**
   * Convert month name to number
   */
  const getMonthNumber = (monthName) => {
    const months = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
    };
    return months[monthName] || 0;
  };

  /**
   * Handle search form submission
   */
  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
  };

  /**
   * Reset search form
   */
  const handleReset = () => {
    setSearchCriteria({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateAfter: null,
      dateBefore: null,
      postcode: ''
    });
    setHasSearched(false);
  };

  const filteredProperties = hasSearched ? filterProperties() : properties;

  return (
    <div className="search-page">
      <header className="header">
        <h1>Property Search</h1>
        <p>Find your dream home</p>
      </header>

      <div className="main-content">
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <h2>Search Properties</h2>

            {/* Property Type */}
            <div className="form-group">
              <label htmlFor="type">Property Type</label>
              <select
                id="type"
                name="type"
                value={searchCriteria.type}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="any">Any</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="minPrice">Min Price (£)</label>
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  value={searchCriteria.minPrice}
                  onChange={handleInputChange}
                  placeholder="e.g. 200000"
                  className="form-control"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="maxPrice">Max Price (£)</label>
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  value={searchCriteria.maxPrice}
                  onChange={handleInputChange}
                  placeholder="e.g. 500000"
                  className="form-control"
                  min="0"
                />
              </div>
            </div>

            {/* Bedroom Range */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="minBedrooms">Min Bedrooms</label>
                <select
                  id="minBedrooms"
                  name="minBedrooms"
                  value={searchCriteria.minBedrooms}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="maxBedrooms">Max Bedrooms</label>
                <select
                  id="maxBedrooms"
                  name="maxBedrooms"
                  value={searchCriteria.maxBedrooms}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>

            {/* Date Range */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dateAfter">Added After</label>
                <DatePicker
                  id="dateAfter"
                  selected={searchCriteria.dateAfter}
                  onChange={(date) => handleDateChange(date, 'dateAfter')}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date"
                  className="form-control"
                  isClearable
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateBefore">Added Before</label>
                <DatePicker
                  id="dateBefore"
                  selected={searchCriteria.dateBefore}
                  onChange={(date) => handleDateChange(date, 'dateBefore')}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date"
                  className="form-control"
                  isClearable
                />
              </div>
            </div>

            {/* Postcode Area */}
            <div className="form-group">
              <label htmlFor="postcode">Postcode Area</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={searchCriteria.postcode}
                onChange={handleInputChange}
                placeholder="e.g. BR1, BR5"
                className="form-control"
                maxLength="10"
              />
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Search</button>
              <button type="button" onClick={handleReset} className="btn btn-secondary">Reset</button>
            </div>
          </form>

          {/* Search Results */}
          <SearchResults
            properties={filteredProperties}
            addToFavourites={addToFavourites}
            viewProperty={viewProperty}
            hasSearched={hasSearched}
          />
        </div>

        {/* Favourites Sidebar */}
        <aside className="favourites-sidebar">
          <FavouritesList
            favourites={favourites}
            removeFromFavourites={removeFromFavourites}
            clearFavourites={clearFavourites}
            viewProperty={viewProperty}
          />
        </aside>
      </div>
    </div>
  );
}

export default SearchPage;
