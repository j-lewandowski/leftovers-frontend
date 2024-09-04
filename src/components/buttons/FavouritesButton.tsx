import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { Fab, styled, useTheme } from '@mui/material';

const FavouritesButton = ({ selected = false }: { selected?: boolean }) => {
  const theme = useTheme();

  return (
    <FloatingButton size="small" color="default" sx={{ boxShadow: 6 }}>
      {selected ? (
        <Bookmark style={{ color: theme.palette.primary.main }} />
      ) : (
        <BookmarkBorder style={{ color: theme.palette.action.disabled }} />
      )}
    </FloatingButton>
  );
};

export default FavouritesButton;

const FloatingButton = styled(Fab)(() => ({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
}));
