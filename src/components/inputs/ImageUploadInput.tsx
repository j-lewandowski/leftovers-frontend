import { UploadFile } from '@mui/icons-material';
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController } from 'react-hook-form';
import styled from 'styled-components';

interface FileWithPreview extends File {
  preview: string;
}

const ImageDropzone: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview | null>(
    null,
  );
  const theme = useTheme();
  const { field } = useController({ name: 'image', rules: { required: true } });

  const onDrop = (newFile: File[]) => {
    const fileWithPreview = Object.assign(newFile[0], {
      preview: URL.createObjectURL(newFile[0]),
    }) as FileWithPreview;
    setSelectedFiles(fileWithPreview);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: 3 * 1024 * 1024, // 3 MB
  });

  useEffect(() => {
    return () => {
      setSelectedFiles(null);
    };
  }, []);

  return (
    <Box>
      <ImageDropzoneWrapper
        {...getRootProps()}
        $isImageLoaded={!!selectedFiles}
      >
        <input {...getInputProps()} onChange={field.onChange} />
        {!selectedFiles ? (
          <Stack justifyItems="center" alignItems="center" gap={4}>
            <UploadFile sx={{ color: 'rgba(33, 150, 243, 1)' }} />
            <Typography>
              <Link
                sx={{
                  color: 'rgba(33, 150, 243, 1)',
                  textDecorationColor: 'rgba(33, 150, 243, 1)',
                }}
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
          <ImagePreview src={selectedFiles.preview} />
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
