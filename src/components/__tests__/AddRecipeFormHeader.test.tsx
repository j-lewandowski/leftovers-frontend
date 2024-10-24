import { render, screen } from '@testing-library/react';
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

describe('AddRecipeFormHeader', () => {
  it('renders the component', () => {
    render(
      <MultistepFormProvider>
        <AddRecipeFormHeader />
      </MultistepFormProvider>,
    );
    expect(screen.getByText('Add Recipe')).toBeInTheDocument();
  });

  it('renders all tabs', () => {
    render(
      <MultistepFormProvider>
        <AddRecipeFormHeader />
      </MultistepFormProvider>,
    );
    expect(screen.getByText('Basic information')).toBeInTheDocument();
    expect(screen.getByText('Ingredients')).toBeInTheDocument();
    expect(screen.getByText('Preparation Method')).toBeInTheDocument();
    expect(screen.getByText('Publication')).toBeInTheDocument();
  });

  it('disables tabs based on stepNumber', () => {
    render(
      <MultistepFormProvider>
        <AddRecipeFormHeader />
      </MultistepFormProvider>,
    );
    expect(
      screen.getByText('Ingredients').closest('button'),
    ).not.toBeDisabled();
    expect(
      screen.getByText('Preparation Method').closest('button'),
    ).toBeDisabled();
    expect(screen.getByText('Publication').closest('button')).toBeDisabled();
  });
});
