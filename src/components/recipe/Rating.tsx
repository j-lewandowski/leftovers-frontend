import { Rating as MUIRating, Stack, Typography } from '@mui/material';

interface RatingProps {
  rating: number;
  numberOfRatings: number;
  oneStar?: boolean;
}

const Rating = ({ rating, numberOfRatings, oneStar = false }: RatingProps) => {
  return (
    <Stack direction="row" alignItems={'center'}>
      <Typography variant="overline">{rating}</Typography>
      <MUIRating
        readOnly
        defaultValue={oneStar ? 1 : rating}
        max={oneStar ? 1 : 5}
      />
      <Typography variant="overline">({numberOfRatings})</Typography>
    </Stack>
  );
};

export default Rating;
