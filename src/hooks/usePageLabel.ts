import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePageLabel = () => {
  const [searchParams] = useSearchParams();
  const [label, setLabel] = useState<string>('All Recipes');

  useEffect(() => {
    if (
      searchParams.keys.length === 0 ||
      searchParams.getAll('category').length > 1
    ) {
      setLabel('All Recipes');
    }

    if (
      searchParams.get('category') &&
      searchParams.get('category')?.length === 1
    ) {
      const categoryName = searchParams.get('category') as string;

      setLabel(categoryName.charAt(0).toUpperCase() + categoryName.slice(1));
    }

    if (searchParams.get('saved')) {
      setLabel('Saved Recipes');
    }

    if (searchParams.get('myRecipes')) {
      setLabel('My Recipes');
    }
  }, [searchParams]);

  return { label };
};
