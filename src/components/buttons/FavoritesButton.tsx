import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { Fab, styled, useTheme } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LogInToSaveRecipeModal from '../modals/LogInToSaveRecipeModal';

const FavoritesButton = ({ saved = false }: { saved?: boolean }) => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const onClick = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    // const query = useQuery({
    //   queryKey: ['save'],
    //   queryFn: async () => {
    //     const res = await axios('/user/'+)
    //   }
    // })
  };

  return (
    <>
      <FloatingButton
        size="small"
        color="default"
        sx={{ boxShadow: 6 }}
        onClick={onClick}
      >
        {saved ? (
          <Bookmark style={{ color: theme.palette.primary.main }} />
        ) : (
          <BookmarkBorder style={{ color: theme.palette.action.disabled }} />
        )}
      </FloatingButton>
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
