import { Star } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';

interface RatingProps {
  rating: number;
  numberOfRatings: number;
}

const Rating = ({ rating, numberOfRatings }: RatingProps) => {
  // @TODO logic for the stars
  return (
    <Stack direction="row" alignItems={'center'}>
      <Typography variant="overline">{rating}</Typography>
      <Stack direction="row" color={yellow[600]}>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </Stack>
      <Typography variant="overline">({numberOfRatings})</Typography>
    </Stack>
  );
};

export default Rating;
