import styled from 'styled-components';
import FavoritesButton from '../buttons/FavoritesButton';

const ImageCard = ({
  imageUrl,
  isSaved,
}: {
  imageUrl: string;
  isSaved: boolean;
}) => {
  return (
    <RecipeImage $imageUrl={imageUrl}>
      <FavoritesButton saved={isSaved} />
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
