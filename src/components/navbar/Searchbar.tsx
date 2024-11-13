import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, IconButton, styled, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_ENDPOINTS } from '../../assets/constants/api';
import { Recipe } from '../../models/recipe.model';
import httpService from '../../services/http.service';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const onSearch = () => {
    if (searchTerm.trim() === '') {
      navigate('/recipes');
      return;
    }
    navigate(`/recipes?search=${searchTerm}`);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['search'],
    queryFn: async () => {
      const res = await httpService.get(
        DEFAULT_ENDPOINTS.RECIPES + `?title=${debouncedSearchTerm}`,
      );

      return res.data.recipes as Recipe[];
    },
    enabled: !!debouncedSearchTerm,
  });

  const onInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
  ) => {
    setSearchTerm(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (value.trim() === '') {
      setDebouncedSearchTerm('');
      return;
    }

    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(value);
    }, 3000);
    setDebounceTimeout(timeout);
  };

  return (
    <StyledAutoComplete
      id="searchbar"
      disableClearable
      freeSolo
      forcePopupIcon={false}
      loading={isLoading}
      options={data || []}
      getOptionLabel={(option) => (option as Recipe).title || ''}
      onInputChange={onInputChange}
      inputValue={searchTerm}
      size="small"
      renderInput={(params) => (
        <SearchBar
          {...params}
          variant="outlined"
          placeholder="Search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <IconButton onClick={onSearch} size="small">
                <Icon sx={{ cursor: 'pointer' }} />
              </IconButton>
            ),
          }}
          onSubmit={onSearch}
          onKeyDownCapture={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
        />
      )}
    />
  );
};

const StyledAutoComplete = styled(Autocomplete)({
  width: '100%',
});

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
  fontSize: '1.5rem',
  color: theme.palette.action.active,
}));

export default Searchbar;
