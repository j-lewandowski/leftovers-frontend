import { UploadFile } from '@mui/icons-material';
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const ImageDropzone: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const theme = useTheme();

  const onDrop = (acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) }),
    );
    setSelectedFiles(filesWithPreview);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [selectedFiles]);

  return (
    <Box>
      <ImageDropzoneWrapper {...getRootProps()}>
        <input {...getInputProps()} />
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
      </ImageDropzoneWrapper>
    </Box>
  );
};

const ImageDropzoneWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(33, 150, 243, 0.08)',
  height: '100%',
  aspectRatio: '1/1',
  borderRadius: '.25rem',
  border: '2px dashed rgba(33, 150, 243, 1)',
  padding: '1rem 1.5rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default ImageDropzone;
