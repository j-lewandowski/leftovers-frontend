import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  styled,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSnackbar } from '../../context/SnackbarContext';

const RateRecipeModal = () => {
  const { control, formState, handleSubmit, reset } = useForm<{
    rating: number;
  }>({
    defaultValues: {
      rating: 0,
    },
  });
  const [searchParams] = useSearchParams();
  const { accessToken } = useAuth();
  const { setMessage } = useSnackbar();
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const rateRecipeMutation = useMutation({
    mutationFn: (data: { rating: number }) => {
      return axios.post(
        `recipes/${recipeId}/rate-recipe`,
        { value: +data.rating },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
    },
    onSuccess: () => {
      reset();
      navigate(-1);
      setMessage('⭐  Thank you for submitting your rating!');
    },
  });

  const onClose = () => {
    navigate(-1);
    reset();
  };

  return (
    <DialogContainer open={!!searchParams.get('rate-recipe')} onClose={onClose}>
      <Title>How would you rate this recipe?</Title>
      <Content>
        <Typography>
          We’d love to hear your feedback. Your rating helps us enhance the
          recipe and provide a better culinary experience.
        </Typography>
      </Content>
      <Content>
        <Controller
          control={control}
          name="rating"
          rules={{ min: 1, max: 5, required: true }}
          render={({ field: { onChange, value } }) => (
            <Rating size="large" onChange={onChange} value={value} />
          )}
        />
      </Content>
      <SubmitContainer>
        <Button variant="outlined" onClick={onClose}>
          Not now
        </Button>
        <Button
          variant="contained"
          disabled={!formState.isValid || formState.isSubmitting}
          onClick={handleSubmit(async (data) =>
            rateRecipeMutation.mutate(data),
          )}
        >
          {!formState.isSubmitting ? 'Submit' : <Spinner size="1.5rem" />}
        </Button>
      </SubmitContainer>
    </DialogContainer>
  );
};

export default RateRecipeModal;

const DialogContainer = styled(Dialog)(() => ({
  minWidth: '500px',
}));

const Title = styled(DialogTitle)(() => ({
  padding: '1rem 1.5rem 1rem 1.5rem',
}));

const Content = styled(DialogContent)(() => ({
  padding: '0 1.5rem 2rem 1.5rem',
  overflow: 'visible',
}));

const SubmitContainer = styled(DialogActions)(() => ({
  padding: '0.5rem 1.5rem 1.5rem 1.5rem',
}));

const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.action.disabled,
}));
