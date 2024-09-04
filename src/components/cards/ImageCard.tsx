import styled from 'styled-components';
import FavouritesButton from '../buttons/FavouritesButton';

const ImageCard = () => {
  return (
    <RecipeImage>
      <FavouritesButton />
    </RecipeImage>
  );
};

export default ImageCard;

const RecipeImage = styled('div')(() => ({
  backgroundImage:
    "url('https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=2294&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '4px',
  width: '100%',
  position: 'relative',
}));
