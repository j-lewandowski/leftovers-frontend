import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Skeleton,
  Stack,
  styled,
  Typography,
  Zoom,
} from '@mui/material';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import { API } from '../assets/constants/api';
import FilterButton from '../components/buttons/FilterButton';
import SortingButton from '../components/buttons/SortingButton';
import RecipeCard from '../components/cards/RecipeCard';
import { usePageLabel } from '../hooks/usePageLabel';
import { PaginatedRecipes } from '../models/recipe.model';
import httpService from '../services/http.service';

const RecipesList = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { label } = usePageLabel();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['recipes', searchParams.toString()],
    });
  }, [searchParams]);

  const fetchRecipes = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<PaginatedRecipes> => {
    const res = await httpService.get(API.RECIPES.ALL, {
      params: {
        category: searchParams.getAll('category'),
        saved: searchParams.get('saved'),
        sort: searchParams.get('sort'),
        myRecipes: searchParams.get('myRecipes'),
        title: searchParams.get('search'),
        page: pageParam,
      },
    });
    return res.data as PaginatedRecipes;
  };

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['recipes', searchParams.toString()],
    queryFn: fetchRecipes,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page * lastPage.limit < lastPage.totalRecipes
        ? lastPage.page + 1
        : undefined,
  });

  return (
    <Wrapper gap={2}>
      <Stack gap={1}>
        {searchParams.get('search') && (
          <Typography variant="body2" color="secondary">
            Search results for
          </Typography>
        )}
        <Typography variant="h5" sx={{ paddingBottom: '.5rem' }}>
          {label}
        </Typography>
        <Divider />
      </Stack>
      <Stack direction="row" spacing={1}>
        {label === 'All Recipes' && (
          <Zoom in={true} style={{ transitionDelay: '100ms' }}>
            <Box>
              <FilterButton name="Filters"></FilterButton>
            </Box>
          </Zoom>
        )}
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <Box>
            <SortingButton
              name="Rating"
              fieldName="rating"
              descOptionName="Highest score first"
              ascOptionName="Lowest score first"
            />
          </Box>
        </Zoom>
        <Zoom in={true} style={{ transitionDelay: '300ms' }}>
          <Box>
            <SortingButton
              name="Date"
              fieldName="date"
              descOptionName="Sort by newest"
              ascOptionName="Sort by oldest"
            />
          </Box>
        </Zoom>
      </Stack>

      {isLoading ? (
        <Grid container spacing={1.5}>
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonGridItem key={index} item xs={12} sm={6} md={4} lg={3}>
              <RecipeCardSkeleton variant="rounded" animation="wave" />
            </SkeletonGridItem>
          ))}
        </Grid>
      ) : (
        <InfiniteScroll
          dataLength={data?.pages.length || 0}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={
            <LoadingWrapper>
              <CircularProgress />
            </LoadingWrapper>
          }
          endMessage={
            <NoRecipesMessage variant="body2">
              No more recipes to show
            </NoRecipesMessage>
          }
        >
          <Grid container spacing={1.5}>
            {data?.pages.map((page, index) =>
              page.recipes.map((recipe) => (
                <Zoom
                  key={recipe.id}
                  in={true}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <RecipeCard recipeData={recipe} />
                  </Grid>
                </Zoom>
              )),
            )}
          </Grid>
        </InfiniteScroll>
      )}
    </Wrapper>
  );
};

export default RecipesList;

const Wrapper = styled(Stack)(({ theme }) => ({
  minHeight: '100dvh',
  background: theme.palette.background.default,
  padding: '2.5rem 3rem',
}));

const NoRecipesMessage = styled(Typography)({
  textAlign: 'center',
  width: '100%',
  marginTop: '2rem',
});

const LoadingWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const RecipeCardSkeleton = styled(Skeleton)({
  height: '300px',
});

const SkeletonGridItem = styled(Grid)({
  height: 'fit-content',
});
