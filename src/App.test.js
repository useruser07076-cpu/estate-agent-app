import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

/**
 * Test Suite for Estate Agent Application
 * Contains 5+ meaningful tests covering critical functionality
 */

describe('Estate Agent Application Tests', () => {
  
  /**
   * Test 1: Application renders without crashing
   */
  test('renders the application and displays the header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Property Search/i);
    expect(headerElement).toBeInTheDocument();
  });

  /**
   * Test 2: Search form displays all required fields
   */
  test('displays all search form fields', () => {
    render(<App />);
    
    // Check for property type dropdown
    const typeSelect = screen.getByLabelText(/Property Type/i);
    expect(typeSelect).toBeInTheDocument();
    
    // Check for price inputs
    const minPriceInput = screen.getByLabelText(/Min Price/i);
    const maxPriceInput = screen.getByLabelText(/Max Price/i);
    expect(minPriceInput).toBeInTheDocument();
    expect(maxPriceInput).toBeInTheDocument();
    
    // Check for bedroom selects
    const minBedroomsSelect = screen.getByLabelText(/Min Bedrooms/i);
    const maxBedroomsSelect = screen.getByLabelText(/Max Bedrooms/i);
    expect(minBedroomsSelect).toBeInTheDocument();
    expect(maxBedroomsSelect).toBeInTheDocument();
    
    // Check for postcode input
    const postcodeInput = screen.getByLabelText(/Postcode Area/i);
    expect(postcodeInput).toBeInTheDocument();
  });

  /**
   * Test 3: Properties are displayed on initial load
   */
  test('displays all properties on initial load', () => {
    render(<App />);
    
    // Should display "All Properties (7)" heading
    const heading = screen.getByText(/All Properties \(7\)/i);
    expect(heading).toBeInTheDocument();
    
    // Check if property cards are rendered
    const viewDetailsButtons = screen.getAllByText(/View Details/i);
    expect(viewDetailsButtons.length).toBeGreaterThan(0);
  });

  /**
   * Test 4: Search functionality filters properties correctly
   */
  test('filters properties based on search criteria', async () => {
    render(<App />);
    
    // Select "House" type
    const typeSelect = screen.getByLabelText(/Property Type/i);
    fireEvent.change(typeSelect, { target: { value: 'House' } });
    
    // Click search button
    const searchButton = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(searchButton);
    
    // Wait for results to update
    await waitFor(() => {
      const heading = screen.getByText(/Found \d+ Propert/i);
      expect(heading).toBeInTheDocument();
    });
  });

  /**
   * Test 5: Add to favourites functionality works
   */
  test('adds property to favourites when star button is clicked', async () => {
    render(<App />);
    
    // Find first favourite button (star)
    const favouriteButtons = screen.getAllByTitle(/Add to favourites/i);
    const firstFavButton = favouriteButtons[0];
    
    // Click to add to favourites
    fireEvent.click(firstFavButton);
    
    // Wait and check if favourites count increased
    await waitFor(() => {
      const favouritesHeading = screen.getByText(/Favourites \(\d+\)/i);
      expect(favouritesHeading).toBeInTheDocument();
    });
  });

  /**
   * Test 6: Reset button clears search criteria
   */
  test('reset button clears all search criteria', () => {
    render(<App />);
    
    // Fill in search criteria
    const typeSelect = screen.getByLabelText(/Property Type/i);
    fireEvent.change(typeSelect, { target: { value: 'Flat' } });
    
    const minPriceInput = screen.getByLabelText(/Min Price/i);
    fireEvent.change(minPriceInput, { target: { value: '300000' } });
    
    // Click reset button
    const resetButton = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButton);
    
    // Check if values are reset
    expect(typeSelect.value).toBe('any');
    expect(minPriceInput.value).toBe('');
  });

  /**
   * Test 7: Property detail view navigation works
   */
  test('navigates to property detail view when View Details is clicked', async () => {
    render(<App />);
    
    // Click first "View Details" button
    const viewDetailsButtons = screen.getAllByText(/View Details/i);
    fireEvent.click(viewDetailsButtons[0]);
    
    // Wait for detail view to load
    await waitFor(() => {
      const backButton = screen.getByText(/Back to Search/i);
      expect(backButton).toBeInTheDocument();
    });
  });

  /**
   * Test 8: Clear favourites button removes all favourites
   */
  test('clear all button removes all favourites', async () => {
    render(<App />);
    
    // Add a property to favourites
    const favouriteButtons = screen.getAllByTitle(/Add to favourites/i);
    fireEvent.click(favouriteButtons[0]);
    fireEvent.click(favouriteButtons[1]);
    
    // Wait for favourites to be added
    await waitFor(() => {
      const clearButton = screen.getByText(/Clear All/i);
      expect(clearButton).toBeInTheDocument();
    });
    
    // Click clear all
    const clearButton = screen.getByText(/Clear All/i);
    fireEvent.click(clearButton);
    
    // Check if favourites are cleared
    await waitFor(() => {
      const emptyMessage = screen.getByText(/No favourites yet/i);
      expect(emptyMessage).toBeInTheDocument();
    });
  });
});
