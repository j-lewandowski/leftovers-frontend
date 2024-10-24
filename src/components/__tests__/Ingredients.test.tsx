import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import MultistepFormProvider from '../../context/MultistepFormContext';
import { render, screen } from '../../test-utils';
import Ingredients from '../forms/add-recipe-form/Ingredients';

vi.mock('../../context/MultistepFormContext', async () => {
  const originalModule = await vi.importActual(
    '../../context/MultistepFormContext',
  );
  return {
    ...originalModule,
    useMultistepForm: () => ({
      back: vi.fn(),
      next: vi.fn(),
    }),
  };
});

describe('Ingredients Component', () => {
  const Wrapper = ({ isVisible }: { isVisible: boolean }) => {
    const methods = useForm({
      defaultValues: {
        ingredients: [{ name: '' }],
      },
    });
    return (
      <FormProvider {...methods}>
        <MultistepFormProvider>
          <Ingredients isVisible={isVisible} />
        </MultistepFormProvider>
      </FormProvider>
    );
  };

  const renderComponent = (isVisible = true) => {
    return render(<Wrapper isVisible={isVisible} />);
  };

  it('should render the component when visible', () => {
    renderComponent();
    expect(screen.getByText('Add ingredients')).toBeInTheDocument();
  });

  it('should disable the Next button if all ingredient fields are empty', () => {
    renderComponent();
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('should enable the Next button if at least one ingredient field is filled', async () => {
    const { user } = renderComponent();
    const ingredientInput = screen.getByLabelText('Ingredient #1');
    await user.type(ingredientInput, 'Salt');
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('should add a new ingredient field when "Add a new ingredient" button is clicked', async () => {
    const { user } = renderComponent();
    await user.click(screen.getByText('Add a new ingredient'));
    expect(screen.getByLabelText('Ingredient #2')).toBeInTheDocument();
  });
});
