import { PREPARATION_TIME } from '../../assets/constants/enums';

export function getPreparationTimeLabel(preparationTime: string) {
  return (
    PREPARATION_TIME[preparationTime as keyof typeof PREPARATION_TIME] ||
    'Unknown'
  );
}
