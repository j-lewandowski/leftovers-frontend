import { useState } from 'react';
import { Category } from '../models/category.model';

export const useCategories = () => {
  const mockCategories = [
    {
      name: '🥪 Breakfasts',
      filter: 'breakfast',
    },
    {
      name: '🍲 Soups',
      filter: 'soup',
    },
    {
      name: '🍔 Lunch',
      filter: 'lunch',
    },
    {
      name: '🥐 Baking',
      filter: 'baking',
    },
    {
      name: '🧁 Desserts',
      filter: 'desserts',
    },
    {
      name: '🍹 Drinks',
      filter: 'drinks',
    },
    {
      name: '🍿 Snacks',
      filter: 'snacks',
    },
    {
      name: '🥗 Salads',
      filter: 'salads',
    },
  ];
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  return { categories, setCategories };
};
