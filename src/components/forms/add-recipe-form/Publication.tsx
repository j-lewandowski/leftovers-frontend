import { DeleteForeverOutlined, Lock, Public } from '@mui/icons-material';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useFormContext } from 'react-hook-form';
import { API, DEFAULT_ENDPOINTS } from '../../../assets/constants/api';
import {
  CreateRecipeDto,
  NewRecipeFormInput,
} from '../../../models/recipe.model';
import httpService from '../../../services/http.service';

const Publication = ({ isVisible }: { isVisible: boolean }) => {
  const { handleSubmit } = useFormContext<NewRecipeFormInput>();

  const createRecipeMutation = useMutation({
    mutationFn: async ({
      data,
      visibility,
    }: {
      data: NewRecipeFormInput;
      visibility: 'PUBLIC' | 'PRIVATE';
    }) => {
      const getUploadSignedUrlResponse = await httpService.get(
        DEFAULT_ENDPOINTS.UPLOAD_FILE,
      );
      const { fileKey, uploadUrl } = getUploadSignedUrlResponse.data;
      await axios.put(uploadUrl, data.image);

      const payload: CreateRecipeDto = {
        ...data,
        ingredients: data.ingredients
          .map((ingredient) => ingredient.name)
          .filter((ingredient) => ingredient !== ''),
        preparationSteps: data.preparationSteps
          .map((step) => step.name)
          .filter((step) => step !== ''),
        imageKey: fileKey,
        visibility,
        servings: 2, // @TODO: Add servings to the form
      };

      const createRecipeResponse = await httpService.post(
        API.RECIPES.CREATE,
        payload,
      );
      return createRecipeResponse.data;
    },
  });

  const submitForm = async (isPublic: boolean) => {
    handleSubmit(async (data: NewRecipeFormInput) => {
      createRecipeMutation.mutate({
        data,
        visibility: isPublic ? 'PUBLIC' : 'PRIVATE',
      });
    })();
  };

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
            onClick={() => submitForm(false)}
            type="submit"
          >
            Save as private
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
            onClick={() => submitForm(true)}
            type="submit"
          >
            Publish the recipe
          </Button>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography>Delete your recipe</Typography>
            <Typography variant="body2" color="secondary">
              Deleting a recipe will permanently remove it from the platform.
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteForeverOutlined />}
          >
            Delete the recipe
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Publication;
