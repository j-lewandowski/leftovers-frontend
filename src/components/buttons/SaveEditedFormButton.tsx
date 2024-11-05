import { Button } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useRecipeForm } from '../../hooks/useRecipeForm';

const SaveEditedFormButton = () => {
  const { formState } = useFormContext();
  const { submitEditRecipe } = useRecipeForm();

  return (
    <Button
      variant="contained"
      disabled={!formState.isDirty}
      onClick={submitEditRecipe}
    >
      Save
    </Button>
  );
};

export default SaveEditedFormButton;
