import { Rating as MUIRating, Stack, Typography } from '@mui/material';

interface RatingProps {
  rating: number;
  numberOfRatings: number;
  allStars?: boolean;
}

const Rating = ({ rating, numberOfRatings, allStars = true }: RatingProps) => {
  return (
    <Stack direction="row" alignItems={'center'}>
      <Typography variant="overline">{rating}</Typography>
      <MUIRating
        readOnly
        defaultValue={allStars ? rating : 1}
        max={allStars ? 5 : 1}
      />
      <Typography variant="overline">({numberOfRatings})</Typography>
    </Stack>
  );
};

export default Rating;
