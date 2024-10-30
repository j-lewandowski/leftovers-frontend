import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { API, DEFAULT_ENDPOINTS } from '../assets/constants/api';
import { Visibility } from '../assets/constants/enums';
import {
  CreateRecipeDto,
  NewRecipeFormInput,
  UpdateRecipeDto,
} from '../models/recipe.model';
import httpService from '../services/http.service';

export const useRecipeForm = () => {
  const { recipeId } = useParams();
  const { handleSubmit, setValue } = useFormContext<NewRecipeFormInput>();

  const createRecipeMutation = useMutation({
    mutationFn: async ({ data }: { data: NewRecipeFormInput }) => {
      const getUploadSignedUrlResponse = await httpService.get(
        DEFAULT_ENDPOINTS.UPLOAD_FILE,
      );
      const { fileKey, uploadUrl } = getUploadSignedUrlResponse.data;
      await axios.put(uploadUrl, data.imageFile);

      const payload: CreateRecipeDto = {
        ...data,
        ingredients: data.ingredients
          .map((ingredient) => ingredient.name)
          .filter((ingredient) => ingredient !== ''),
        preparationSteps: data.preparationSteps
          .map((step) => step.name)
          .filter((step) => step !== ''),
        imageKey: fileKey,
        servings: 2, // @TODO: Add servings to the form / 23.10.2024
      };

      const createRecipeResponse = await httpService.post(
        API.RECIPES.CREATE,
        payload,
      );
      return createRecipeResponse.data;
    },
  });

  const updateRecipeMutation = useMutation({
    mutationFn: async ({ data }: { data: NewRecipeFormInput }) => {
      const payload: UpdateRecipeDto = {
        ...data,
        ingredients: data.ingredients
          .map((ingredient) => ingredient.name)
          .filter((ingredient) => ingredient !== ''),
        preparationSteps: data.preparationSteps
          .map((step) => step.name)
          .filter((step) => step !== ''),
        servings: 2, // @TODO: Add servings to the form / 23.10.2024
      };

      if (data.imageFile) {
        const getUploadSignedUrlResponse = await httpService.get(
          DEFAULT_ENDPOINTS.UPLOAD_FILE,
        );
        const { fileKey, uploadUrl } = getUploadSignedUrlResponse.data;
        payload.imageKey = fileKey;
        await axios.put(uploadUrl, data.imageFile);
      }

      const updateRecipeResponse = await httpService.patch(
        `${DEFAULT_ENDPOINTS.RECIPES}/${recipeId}`,
        payload,
      );
      return updateRecipeResponse.data;
    },
  });

  const removeRecipeMutation = useMutation({
    mutationFn: async () => {
      await httpService.delete(`${DEFAULT_ENDPOINTS.RECIPES}/${recipeId}`);
    },
  });

  const submitCreateRecipe = async (visibility: Visibility) => {
    setValue('visibility', visibility);

    if (recipeId) {
      submitEditRecipe();
      return;
    }

    handleSubmit(async (data: NewRecipeFormInput) => {
      console.log(data);
      createRecipeMutation.mutate({
        data,
      });
    })();
  };

  const submitEditRecipe = () => {
    handleSubmit(async (data: NewRecipeFormInput) => {
      updateRecipeMutation.mutate({ data });
    })();
  };

  const deleteRecipe = () => {
    removeRecipeMutation.mutate();
  };

  return { submitCreateRecipe, submitEditRecipe, deleteRecipe };
};
