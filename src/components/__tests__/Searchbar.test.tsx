import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Searchbar from '../navbar/Searchbar';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@tanstack/react-query', async () => {
  const original = await vi.importActual('@tanstack/react-query');
  return {
    ...original,
    useQuery: () => ({ data: [], isLoading: false }),
  };
});

describe('Searchbar', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the search input', () => {
    render(
      <MemoryRouter>
        <Searchbar />
      </MemoryRouter>,
    );
    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
  });

  it('updates the search term on input change', () => {
    render(
      <MemoryRouter>
        <Searchbar />
      </MemoryRouter>,
    );
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });

  it('navigates to the search results page on search icon click', () => {
    render(
      <MemoryRouter>
        <Searchbar />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'test' } });

    const icon = screen.getByRole('button');
    fireEvent.click(icon);

    expect(mockNavigate).toHaveBeenCalledWith('/recipes?search=test');
  });

  it('navigates to the search results page on Enter key press', () => {
    render(
      <MemoryRouter>
        <Searchbar />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockNavigate).toHaveBeenCalledWith('/recipes?search=test');
  });
});
