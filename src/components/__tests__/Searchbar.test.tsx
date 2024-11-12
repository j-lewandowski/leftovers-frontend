import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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

describe('Searchbar', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the search input', () => {
    render(
      <BrowserRouter>
        <Searchbar />
      </BrowserRouter>,
    );
    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
  });

  it('updates the search term on input change', () => {
    render(
      <BrowserRouter>
        <Searchbar />
      </BrowserRouter>,
    );
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });

  it('navigates to the search results page on search icon click', () => {
    render(
      <BrowserRouter>
        <Searchbar />
      </BrowserRouter>,
    );

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'test' } });

    const icon = screen.getByRole('button');
    fireEvent.click(icon);

    expect(mockNavigate).toHaveBeenCalledWith('/recipes?search=test');
  });

  it('does not navigate if search term is empty', () => {
    render(
      <BrowserRouter>
        <Searchbar />
      </BrowserRouter>,
    );

    const icon = screen.getByRole('button');
    fireEvent.click(icon);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('navigates to the search results page on Enter key press', () => {
    render(
      <BrowserRouter>
        <Searchbar />
      </BrowserRouter>,
    );

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockNavigate).toHaveBeenCalledWith('/recipes?search=test');
  });
});
