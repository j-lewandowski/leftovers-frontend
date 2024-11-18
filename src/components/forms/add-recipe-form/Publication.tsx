import { DeleteForeverOutlined, Lock, Public } from '@mui/icons-material';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Visibility } from '../../../assets/constants/enums';
import { useMultistepForm } from '../../../context/MultistepFormContext';
import { useRecipeForm } from '../../../hooks/useRecipeForm';
import { NewRecipeFormInput } from '../../../models/recipe.model';

const Publication = ({ isVisible }: { isVisible: boolean }) => {
  const { getValues } = useFormContext<NewRecipeFormInput>();
  const { submitCreateRecipe, deleteRecipe } = useRecipeForm();
  const { isEditMode } = useMultistepForm();

  return (
    <Stack sx={{ display: isVisible ? 'flex' : 'none' }} gap={8}>
      <Typography variant="h6">Publication</Typography>
      <Stack gap={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography>Save recipe as private</Typography>
            <Typography variant="body2" color="secondary">
              Keep your recipe to yourself. You can always go back and edit it
              or publish it when it's ready.
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            startIcon={<Lock />}
            onClick={() => submitCreateRecipe(Visibility.Private)}
            type="submit"
            disabled={getValues('visibility') === Visibility.Private}
            data-cy="add-private-recipe"
          >
            {getValues('visibility') === Visibility.Private
              ? 'Saved as private'
              : 'Save as private'}
          </Button>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography>Publish your recipe</Typography>
            <Typography variant="body2" color="secondary">
              Share your recipe with the world! Your culinary masterpiece will
              go to our community and will be available to other users.
              Double-check the recipe details and then click to publish.
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<Public />}
            onClick={() => submitCreateRecipe(Visibility.Public)}
            type="submit"
            disabled={getValues('visibility') === Visibility.Public}
          >
            {getValues('visibility') === Visibility.Public
              ? 'Recipe published'
              : 'Publish the recipe'}
          </Button>
        </Stack>
        {isEditMode && (
          <>
            <Divider />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack>
                <Typography>Delete your recipe</Typography>
                <Typography variant="body2" color="secondary">
                  Deleting a recipe will permanently remove it from the
                  platform.
                </Typography>
              </Stack>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteForeverOutlined />}
                onClick={deleteRecipe}
              >
                Delete the recipe
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Publication;
