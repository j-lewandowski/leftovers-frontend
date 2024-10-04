import { PREPARATION_TIME } from '../assets/constants/enums';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  rating: number;
  numberOfRatings: number;
  preparationTime: PREPARATION_TIME;
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
