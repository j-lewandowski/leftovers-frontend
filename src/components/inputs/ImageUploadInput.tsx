import { UploadFile } from '@mui/icons-material';
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { useMultistepForm } from '../../context/MultistepFormContext';

const ImageDropzone: React.FC = () => {
  const { setValue, getValues } = useFormContext();
  const { isEdit } = useMultistepForm();
  const [imagePreview, setImagePreview] = React.useState<string | null>();
  const theme = useTheme();
  const { field } = useController({
    name: 'imageFile',
    rules: { required: !isEdit },
  });

  useEffect(() => {
    setImagePreview(getValues('imagePreview'));
  }, [field.value]);

  const onDrop = (newFile: File[]) => {
    field.onChange(newFile[0]);
    const newPreview = URL.createObjectURL(newFile[0]);
    setValue('imagePreview', newPreview);
    setImagePreview(newPreview);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: 3 * 1024 * 1024, // 3 MB
    noClick: true,
    noKeyboard: true,
  });

  return (
    <Box>
      <ImageDropzoneWrapper
        {...getRootProps()}
        $isImageLoaded={!!getValues('imagePreview')}
      >
        <input
          {...getInputProps({
            onChange: (e) => {
              const files = e.target.files;
              if (files && files?.length > 0) {
                onDrop(Array.from(files));
              }
            },
          })}
        />
        {!imagePreview ? (
          <Stack justifyItems="center" alignItems="center" gap={4}>
            <UploadFile sx={{ color: 'rgba(33, 150, 243, 1)' }} />
            <Typography>
              <Link
                sx={{
                  color: 'rgba(33, 150, 243, 1)',
                  textDecorationColor: 'rgba(33, 150, 243, 1)',
                }}
                onClick={open}
              >
                Click to upload
              </Link>{' '}
              or drag and drop
            </Typography>
            <Typography color={theme.palette.secondary.main}>
              SVG, PNG, JPG or GIF (max. 3MB)
            </Typography>
          </Stack>
        ) : (
          <ImagePreview src={imagePreview} />
        )}
      </ImageDropzoneWrapper>
    </Box>
  );
};

const ImageDropzoneWrapper = styled(Box)<{ $isImageLoaded?: boolean }>`
  background-color: rgba(33, 150, 243, 0.08);
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 0.25rem;
  border: ${({ $isImageLoaded }) =>
    $isImageLoaded ? '' : '2px dashed rgba(33, 150, 243, 1)'};
  padding: ${({ $isImageLoaded }) => ($isImageLoaded ? '0' : '1.5rem 1rem')};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImagePreview = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '.25rem',
});

export default ImageDropzone;
