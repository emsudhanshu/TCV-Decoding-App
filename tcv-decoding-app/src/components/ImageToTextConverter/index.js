import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import {
  Typography,
  Stack,
  Button,
  Divider,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadIcon from '@mui/icons-material/Upload';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingOverlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
});

const ImageToTextConverter = ({ wordsSetter }) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const handleFileUpload = (event) => {
    setLoading(true)
    const imageFile = event.target.files[0];
    setSelectedFile(imageFile);
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(imageFile);
      setImageFile(imageFile)
    } else {
      setPreviewImage(null);
    }
    setLoading(false);
  };

  const processFile = async () => {
    setLoading(true);
    if (imageFile && imageFile.type === 'image/png') {
      const imageUrl = URL.createObjectURL(imageFile);
      const { data: { text } } = await Tesseract.recognize(imageUrl, 'hin');
      setText(text);
      wordsSetter(text?.split(' '))
      URL.revokeObjectURL(imageUrl);
    }
    setLoading(false);
  }

  return (
    <Stack mt={10} justifyContent='space-around' spacing={5}>

      {loading && (
        <LoadingOverlay>
          <CircularProgress />
        </LoadingOverlay>
      )}

      <Typography variant="h5">Select image with devanagari texts</Typography>

      <label htmlFor="file-upload">
        <input
          accept="image/png"
          id="file-upload"
          type="file"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
          style={{ width: '250px', marginTop: '-20px' }}
          startIcon={<UploadIcon />}
        >
          <Typography variant='h5' sx={{ textTransform: 'capitalize' }}>
            Select image
          </Typography>
        </Button>
        <Box mt={4}>
        <Divider />
        </Box>
      </label>

      {selectedFile && (
        <Stack spacing={2} justifyContent={'spacing-between'}>
          <Typography variant="h5">Selected file - {selectedFile.name}</Typography>
          <img src={previewImage} alt="Selected" style={{ border: '1px dotted gray', maxHeight: '200px', maxWidth: '200px' }} />
        </Stack>
      )}

      {selectedFile &&
        <>
          <Stack spacing={2}>
            <Button variant="contained" style={{ width: '250px' }} onClick={processFile}>
              <Typography variant='h5' sx={{ textTransform: 'capitalize' }}>
                Submit
              </Typography>
            </Button>
          </Stack>
          <Divider />
        </>
      }

      {text && <Stack>
        <Typography variant="h5">Extracted Text</Typography>
        <p>{text}</p>
      </Stack>}
    </Stack>
  );
};

export default ImageToTextConverter;