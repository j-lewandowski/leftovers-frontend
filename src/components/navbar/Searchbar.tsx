import SearchIcon from '@mui/icons-material/Search';
import { styled, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const onSearch = () => {
    if (searchTerm.trim() === '') return;
    navigate(`/recipes?search=${searchTerm}`);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchBar
      variant="outlined"
      size="small"
      placeholder="Search"
      InputProps={{
        endAdornment: <Icon sx={{ cursor: 'pointer' }} onClick={onSearch} />,
      }}
      onChange={onChange}
      value={searchTerm}
      onSubmit={onSearch}
      onKeyDownCapture={(e) => {
        if (e.key === 'Enter') {
          onSearch();
        }
      }}
    />
  );
};

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

export default Searchbar;
