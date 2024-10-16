import { PreparationTime } from '../assets/constants/enums';

export const usePreparationTime = () => {
  const preparationTime = [];

  for (const key in PreparationTime) {
    console.log(key);
    preparationTime.push({
      value: key,
      label: PreparationTime[key as keyof typeof PreparationTime],
    });
  }

  return { preparationTime };
};
