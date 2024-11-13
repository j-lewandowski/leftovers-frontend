import { PreparationTime } from '../assets/constants/enums';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  rating: number;
  numberOfRatings: number;
  preparationTime: PreparationTime;
  ingredients: string[];
  preparationSteps: string[];
  visibility: string;
  createdAt: Date;
  authorId: string;
  category: string;
  servings: number;
  imageUrl: string;
  isSaved: boolean;
}

export interface CreateRecipeDto {
  title: string;
  description: string;
  preparationTime: string;
  ingredients: string[];
  preparationSteps: string[];
  visibility: string;
  categoryName: string;
  servings: number;
  imageKey: string;
}

export interface NewRecipeFormInput {
  title: string;
  description: string;
  categoryName: string;
  preparationTime: string;
  imageFile: string | null;
  imagePreview: string | null;
  ingredients: Array<{ name: string }>;
  preparationSteps: Array<{ name: string }>;
  visibility: string;
}

export interface PaginatedRecipes {
  recipes: Recipe[];
  page: number;
  limit: number;
  totalRecipes: number;
}

export interface UpdateRecipeDto extends Partial<CreateRecipeDto> {}
