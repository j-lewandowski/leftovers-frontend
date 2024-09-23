import { Rating as MUIRating, Stack, Typography } from '@mui/material';

interface RatingProps {
  rating: number;
  numberOfRatings: number;
  short?: boolean;
}

const Rating = ({ rating, numberOfRatings, short = false }: RatingProps) => {
  return (
    <Stack direction="row" alignItems={'center'}>
      <Typography variant="overline">{rating}</Typography>
      <MUIRating
        readOnly
        defaultValue={short ? 1 : rating}
        max={short ? 1 : 5}
      />
      <Typography variant="overline">({numberOfRatings})</Typography>
    </Stack>
  );
};

export default Rating;
