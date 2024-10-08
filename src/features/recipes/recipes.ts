import { PreparationTime } from '../../assets/constants/enums';

export function getPreparationTimeLabel(preparationTime: string) {
  return (
    PreparationTime[preparationTime as keyof typeof PreparationTime] ||
    'Unknown'
  );
}
