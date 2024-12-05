import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import MultistepFormProvider from '../../context/MultistepFormContext';
import { render, screen } from '../../test-utils';
import BasicInformation from '../forms/add-recipe-form/BasicInformation';

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

vi.mock('../../hooks/useCategories', () => ({
  useCategories: () => ({
    categories: [
      { filter: 'category1', name: 'Category 1' },
      { filter: 'category2', name: 'Category 2' },
    ],
  }),
}));

vi.mock('../../hooks/usePreparationTime', () => ({
  usePreparationTime: () => ({
    preparationTime: [
      { value: '10', label: '10 minutes' },
      { value: '20', label: '20 minutes' },
    ],
  }),
}));

describe('BasicInformation Component', () => {
  const Wrapper = ({ isVisible }: { isVisible: boolean }) => {
    const methods = useForm({
      defaultValues: {
        imageFile: new File([''], 'image.png', { type: 'image/png' }),
        title: '',
        description: '',
        categoryName: '',
        preparationTime: '',
      },
    });
    return (
      <FormProvider {...methods}>
        <MultistepFormProvider>
          <BasicInformation isVisible={isVisible} />
        </MultistepFormProvider>
      </FormProvider>
    );
  };

  const renderComponent = (isVisible = true) => {
    return render(<Wrapper isVisible={isVisible} />);
  };

  it('should render the component when visible', () => {
    renderComponent();
    expect(screen.getByText('Add photo')).toBeInTheDocument();
    expect(screen.getByText('Add basic information')).toBeInTheDocument();
  });

  it('should disable the Next button if required fields are empty', () => {
    renderComponent();
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('should enable the Next button if all required fields are filled', async () => {
    const { user } = renderComponent();
    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description');
    const categoryInput = screen.getAllByRole('combobox')[0];
    const preparationTimeInput = screen.getAllByRole('combobox')[1];

    await user.type(titleInput, 'Test Title');
    await user.type(descriptionInput, 'Test Description');
    await user.click(categoryInput);

    const category = screen.getByText('Category 1');
    await user.click(category);

    await user.click(preparationTimeInput);
    const preparationTime = screen.getByText('10 minutes');
    await user.click(preparationTime);

    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('should render categories in the Category select input', async () => {
    const { user } = renderComponent();
    const categoryInput = screen.getAllByRole('combobox')[0];
    await user.click(categoryInput);

    const mockCategories = [
      { filter: 'category1', name: 'Category 1' },
      { filter: 'category2', name: 'Category 2' },
    ];
    mockCategories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it('should render preparation times in the Preparation time select input', async () => {
    const { user } = renderComponent();
    const preparationTimeInput = screen.getAllByRole('combobox')[1];
    await user.click(preparationTimeInput);

    const mockPreparationTime = [
      { value: '10', label: '10 minutes' },
      { value: '20', label: '20 minutes' },
    ];
    mockPreparationTime.forEach((time) => {
      expect(screen.getByText(time.label)).toBeInTheDocument();
    });
  });
});
