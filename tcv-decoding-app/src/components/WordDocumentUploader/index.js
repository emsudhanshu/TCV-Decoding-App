import React, { useState } from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import krutiToUnicdeConvertor from '../../utils/krutiToUnicodeConverter';
import {
  Typography,
  Grid,
  Button,
  Divider,
  Box
} from '@mui/material';

import UploadIcon from '@mui/icons-material/Upload';

function DocxFileUploader({ wordsSetter, words }) {
  const [fileContent, setFileContent] = useState('');

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        const content = await readDocxFile(selectedFile);
        setFileContent(content);
      } catch (error) {
        console.error('Error reading .docx file:', error);
        setFileContent('Error reading .docx file.');
      }
    }
  };

  const readDocxFile = (docxFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        try {
          // Use PizZip to load the .docx file
          const zip = new PizZip(arrayBuffer);

          // Use docxtemplater to extract text from the .docx file
          const doc = new Docxtemplater().loadZip(zip);
          const text = doc.getFullText();

          wordsSetter(krutiToUnicdeConvertor(text));

          resolve(text);
        } catch (error) {
          reject(error);
        }
      };

      reader.readAsArrayBuffer(docxFile);
    });
  };

  return (
    <Grid mt={10}>
      <Typography variant="h5">Select doc file with devanagari texts</Typography>
      <label htmlFor="file-upload">
        <input
          accept=".docx*"
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <Box my={5}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            style={{ width: '250px' }}
            startIcon={<UploadIcon />}
          >
            <Typography variant='h5' sx={{ textTransform: 'capitalize' }}>
              Select doc file
            </Typography>
          </Button>
        </Box>
        <Box mt={4}>
          <Divider />
        </Box>
      </label>


      {words?.length>0 && <Grid my={5} className="file-content" >
        <Typography variant='h5' sx={{ textTransform: 'capitalize' }}>
          Document Content
        </Typography>
        <Grid mt={3} >{words?.join(' ')}</Grid>
        {/* <div style={{ fontFamily: 'krutidev, sans-serif' }}>{fileContent}</div> */}
      </Grid>
      }
    </Grid>
  );
}

export default DocxFileUploader;