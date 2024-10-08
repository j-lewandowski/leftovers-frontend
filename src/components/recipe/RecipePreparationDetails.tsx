import { Divider, Stack, styled, Typography } from '@mui/material';
import { Recipe } from '../../models/recipe.model';

const RecipePreparationDetails = ({ data }: { data: Recipe }) => {
  const { ingredients, preparationSteps } = data;

  return (
    <PreparationDetailsWrapper direction="row">
      <ListWrapper gap={2}>
        <Typography variant="h6">Ingerdients</Typography>
        <Stack gap={2}>
          {ingredients.map((ingredient) => (
            <ListItem variant="body2">{ingredient}</ListItem>
          ))}
        </Stack>
      </ListWrapper>
      <ListWrapper gap={2}>
        <Typography variant="h6">Preparation</Typography>
        <Stack gap={1.5}>
          {preparationSteps.map((step, i) => (
            <>
              {i !== 0 && <Divider />}
              <Step key={step}>
                <Typography variant="overline" color="primary">
                  Step {i + 1}
                </Typography>
                <ListItem variant="body1">{step}</ListItem>
              </Step>{' '}
            </>
          ))}
        </Stack>
      </ListWrapper>
    </PreparationDetailsWrapper>
  );
};

export default RecipePreparationDetails;

const PreparationDetailsWrapper = styled(Stack)({
  width: '100%',
});

const ListWrapper = styled(Stack)({
  width: '100%',
});

const ListItem = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const Step = styled(Stack)({
  width: '100%',
});
