import styled from 'styled-components';
import FavoritesButton from '../buttons/FavoritesButton';

const ImageCard = ({
  recipeId,
  imageUrl,
  isSaved,
}: {
  recipeId: string;
  imageUrl: string;
  isSaved: boolean;
}) => {
  return (
    <RecipeImage $imageUrl={imageUrl}>
      <FavoritesButton isSaved={isSaved} recipeId={recipeId} />
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
