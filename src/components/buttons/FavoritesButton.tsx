import {
  Bookmark,
  BookmarkBorder,
  BookmarkBorderOutlined,
} from '@mui/icons-material';
import { Button, Fab, styled, useTheme } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { API } from '../../assets/constants/api';
import { useAuth } from '../../context/AuthContext';
import { useSnackbar } from '../../context/SnackbarContext';
import httpService from '../../services/http.service';
import LogInToSaveRecipeModal from '../modals/LogInToSaveRecipeModal';

const FavoritesButton = ({
  isSaved = false,
  isFloatingButton = true,
  recipeId,
}: {
  isSaved?: boolean;
  isFloatingButton?: boolean;
  recipeId: string;
}) => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { setMessage } = useSnackbar();

  const mutation = useMutation({
    mutationFn: async () => {
      await httpService.put(API.USERS.SAVE_RECIPES, {
        save: !isSaved,
        recipeId,
      });
    },
    onSuccess: () => {
      if (!isSaved) {
        setMessage('✅ The recipe was added to Saved Recipes in your profile.');
      }
      queryClient.invalidateQueries({
        queryKey: ['save-recipes'],
      });
    },
  });

  const onClick = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    mutation.mutate();
  };

  return (
    <>
      {isFloatingButton ? (
        <FloatingButton
          size="small"
          color="default"
          sx={{ boxShadow: 6 }}
          onClick={onClick}
        >
          {isSaved ? (
            <Bookmark style={{ color: theme.palette.primary.main }} />
          ) : (
            <BookmarkBorder style={{ color: theme.palette.action.disabled }} />
          )}
        </FloatingButton>
      ) : (
        <Button
          variant="outlined"
          startIcon={isSaved ? <Bookmark /> : <BookmarkBorderOutlined />}
          onClick={onClick}
        >
          {isSaved ? 'Saved' : 'Save'}
        </Button>
      )}
      <LogInToSaveRecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FavoritesButton;

const FloatingButton = styled(Fab)(() => ({
  position: 'absolute',
  top: '.5rem',
  right: '.5rem',
}));
