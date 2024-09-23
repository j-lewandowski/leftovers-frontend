import { BookmarkBorderOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

const FavoritesButtonLong = () => {
  return (
    <Button variant="outlined" startIcon={<BookmarkBorderOutlined />}>
      Save
    </Button>
  );
};

export default FavoritesButtonLong;
