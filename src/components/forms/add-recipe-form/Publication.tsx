import { DeleteForeverOutlined, Lock, Public } from '@mui/icons-material';
import { Button, Divider, Stack, Typography } from '@mui/material';

const Publication = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <Stack sx={{ display: isVisible ? 'flex' : 'none' }} gap={8}>
      <Typography variant="h6">Publication</Typography>
      <Stack gap={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography>Save recipe as private</Typography>
            <Typography variant="body2" color="secondary">
              Keep your recipe to yourself. You can always go back and edit it
              or publish it when it's ready.
            </Typography>
          </Stack>
          <Button variant="outlined" startIcon={<Lock />}>
            Save as private
          </Button>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography>Publish your recipe</Typography>
            <Typography variant="body2" color="secondary">
              Share your recipe with the world! Your culinary masterpiece will
              go to our community and will be available to other users.
              Double-check the recipe details and then click to publish.
            </Typography>
          </Stack>
          <Button variant="contained" startIcon={<Public />}>
            Publish the recipe
          </Button>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography>Delete your recipe</Typography>
            <Typography variant="body2" color="secondary">
              Deleting a recipe will permanently remove it from the platform.
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteForeverOutlined />}
          >
            Delete the recipe
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Publication;
