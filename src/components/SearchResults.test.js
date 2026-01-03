import { render, screen, fireEvent } from '@testing-library/react';
import SearchResults from './components/SearchResults';

/**
 * Test Suite for SearchResults Component
 */

describe('SearchResults Component Tests', () => {
  
  const mockProperties = [
    {
      id: 'prop1',
      type: 'House',
      bedrooms: 3,
      price: 750000,
      location: 'Petts Wood Road, BR5',
      description: 'A beautiful house',
      picture: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdXNlfGVufDB8fDB8fHww'
    },
    {
      id: 'prop2',
      type: 'Flat',
      bedrooms: 2,
      price: 399995,
      location: 'Crofton Road, BR6',
      description: 'Modern flat',
      picture: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdXNlfGVufDB8fDB8fHww'
    }
  ];

  const mockAddToFavourites = jest.fn();
  const mockViewProperty = jest.fn();

  /**
   * Test 1: Renders correct number of properties
   */
  test('renders all properties in the list', () => {
    render(
      <SearchResults
        properties={mockProperties}
        addToFavourites={mockAddToFavourites}
        viewProperty={mockViewProperty}
        hasSearched={false}
      />
    );

    const viewButtons = screen.getAllByText(/View Details/i);
    expect(viewButtons).toHaveLength(2);
  });

  /**
   * Test 2: Displays "no results" message when properties array is empty
   */
  test('displays no results message when no properties match', () => {
    render(
      <SearchResults
        properties={[]}
        addToFavourites={mockAddToFavourites}
        viewProperty={mockViewProperty}
        hasSearched={true}
      />
    );

    const noResultsMessage = screen.getByText(/No properties match your search criteria/i);
    expect(noResultsMessage).toBeInTheDocument();
  });

  /**
   * Test 3: Calls viewProperty when View Details is clicked
   */
  test('calls viewProperty function when View Details button is clicked', () => {
    render(
      <SearchResults
        properties={mockProperties}
        addToFavourites={mockAddToFavourites}
        viewProperty={mockViewProperty}
        hasSearched={false}
      />
    );

    const viewButtons = screen.getAllByText(/View Details/i);
    fireEvent.click(viewButtons[0]);

    expect(mockViewProperty).toHaveBeenCalledWith(mockProperties[0]);
  });

  /**
   * Test 4: Calls addToFavourites when star button is clicked
   */
  test('calls addToFavourites when favourite button is clicked', () => {
    render(
      <SearchResults
        properties={mockProperties}
        addToFavourites={mockAddToFavourites}
        viewProperty={mockViewProperty}
        hasSearched={false}
      />
    );

    const favouriteButtons = screen.getAllByTitle(/Add to favourites/i);
    fireEvent.click(favouriteButtons[0]);

    expect(mockAddToFavourites).toHaveBeenCalledWith(mockProperties[0]);
  });

  /**
   * Test 5: Displays property information correctly
   */
  test('displays property price and location correctly', () => {
    render(
      <SearchResults
        properties={mockProperties}
        addToFavourites={mockAddToFavourites}
        viewProperty={mockViewProperty}
        hasSearched={false}
      />
    );

    // Check if price is formatted correctly
    expect(screen.getByText('£750,000')).toBeInTheDocument();
    expect(screen.getByText('£399,995')).toBeInTheDocument();

    // Check if location is displayed
    expect(screen.getByText(/Petts Wood Road, BR5/i)).toBeInTheDocument();
    expect(screen.getByText(/Crofton Road, BR6/i)).toBeInTheDocument();
  });
});
