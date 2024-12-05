import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import MultistepFormProvider from '../../context/MultistepFormContext';
import AddRecipeFormHeader from '../forms/add-recipe-form/AddRecipeFormHeader';

vi.mock('../../context/MultistepFormContext', async () => {
  const originalModule = await vi.importActual(
    '../../context/MultistepFormContext',
  );
  return {
    ...originalModule,
    useMultistepForm: () => ({
      stepNumber: 1,
      onTabClick: vi.fn(),
    }),
  };
});

vi.mock('react-hook-form', async () => {
  const originalModule = await vi.importActual('react-hook-form');
  return {
    ...originalModule,
    useFormContext: () => ({
      getValues: vi.fn().mockReturnValue('title'),
    }),
  };
});

describe('AddRecipeFormHeader', () => {
  it('renders the component', () => {
    render(
      <MemoryRouter>
        <MultistepFormProvider>
          <AddRecipeFormHeader />
        </MultistepFormProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Add Recipe')).toBeInTheDocument();
  });

  it('renders all tabs', () => {
    render(
      <MemoryRouter>
        <MultistepFormProvider>
          <AddRecipeFormHeader />
        </MultistepFormProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Basic information')).toBeInTheDocument();
    expect(screen.getByText('Ingredients')).toBeInTheDocument();
    expect(screen.getByText('Preparation Method')).toBeInTheDocument();
    expect(screen.getByText('Publication')).toBeInTheDocument();
  });
});
