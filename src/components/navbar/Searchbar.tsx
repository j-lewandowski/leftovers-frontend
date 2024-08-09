import { styled, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = () => {
  const SearchBar = styled(TextField)(({ theme }) => ({
    maxWidth: '570px',
    width: '100%',
    color: theme.palette.text.primary,
    fontWeight: '400',
    '& .MuiInputBase-input::placeholder': {
      fontWeight: '400',
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  }));

  const Icon = styled(SearchIcon)(({ theme }) => ({
    color: theme.palette.action.active,
  }));

  return (
    <SearchBar
      variant="outlined"
      size="small"
      placeholder="Search"
      InputProps={{ endAdornment: <Icon /> }}
    />
  );
};

export default Searchbar;
