import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import MultistepFormProvider from '../../context/MultistepFormContext';
import { render, screen } from '../../test-utils';
import PreparationMethod from '../forms/add-recipe-form/PreparationMethod';

vi.mock('../../context/MultistepFormContext', async () => {
  const originalModule = await vi.importActual(
    '../../context/MultistepFormContext',
  );
  return {
    ...originalModule,
    useMultistepForm: () => ({
      goToNextStep: vi.fn(),
      goToPreviousStep: vi.fn(),
    }),
  };
});

describe('PreparationMethod Component', () => {
  const Wrapper = ({ isVisible }: { isVisible: boolean }) => {
    const methods = useForm({
      defaultValues: {
        preparationSteps: [{ name: '' }],
      },
    });
    return (
      <FormProvider {...methods}>
        <MultistepFormProvider>
          <PreparationMethod isVisible={isVisible} />
        </MultistepFormProvider>
      </FormProvider>
    );
  };

  const renderComponent = (isVisible = true) => {
    return render(<Wrapper isVisible={isVisible} />);
  };

  it('should render the component when visible', () => {
    renderComponent();
    expect(screen.getByText('Enter preparation method')).toBeInTheDocument();
  });

  it('should disable the Next button if all preparation steps are empty', () => {
    renderComponent();
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('should enable the Next button if at least one preparation step is filled', async () => {
    const { user } = renderComponent();
    const stepInput = screen.getByLabelText('Step 1');
    await user.type(stepInput, 'Preheat the oven');
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('should add a new preparation step field when "Add a new step" button is clicked', async () => {
    const { user } = renderComponent();
    await user.click(screen.getByText('Add a new step'));
    expect(screen.getByLabelText('Step 2')).toBeInTheDocument();
  });
});
