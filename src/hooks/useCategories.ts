import { useState } from 'react';

export const useCategories = () => {
  const mockCategories = [
    {
      name: '🍽️ All recipes',
    },
    {
      name: '🥪 Breakfasts',
    },
    {
      name: '🍲 Soups',
    },
    {
      name: '🍔 Lunch',
    },
    {
      name: '🥐 Baking',
    },
    {
      name: '🧁 Desserts',
    },
    {
      name: '🍹 Drinks',
    },
    {
      name: '🍿 Snacks',
    },
    {
      name: '🥗 Salads',
    },
  ];
  const [categories, setCategories] =
    useState<Record<string, string>[]>(mockCategories);

  return { categories, setCategories };
};
