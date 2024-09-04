import styled from 'styled-components';
import FavouritesButton from '../buttons/FavouritesButton';

const ImageCard = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <RecipeImage $imageUrl={imageUrl}>
      <FavouritesButton />
    </RecipeImage>
  );
};

export default ImageCard;

const RecipeImage = styled('div')<{ $imageUrl: string }>`
  background-image: url('${(props) => props.$imageUrl}');
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  width: 100%;
  min-height: 200px;
  position: relative;
`;
