import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import getTcvValueByWord from '../../utils/getTcvValueByWord';
import {
  Stack,
  Button,
  Typography
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const ExcelGenerator = ({ words }) => {

  const generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    const headerRow = worksheet.addRow(['Name', 'Value', 'Value Breakup']);
    headerRow.font = { bold: true };

    let tcsValues = [];
    let valueBreakup = [];

    words?.forEach(word => {
      valueBreakup?.push(getTcvValueByWord(word)?.valueBreakup);
      tcsValues?.push(getTcvValueByWord(word)?.sum);
    })

    words?.forEach((word, index) => {
      console.log(word,tcsValues?.[index])
      worksheet.addRow([word, tcsValues?.[index], valueBreakup?.[index]]);
    })


    const excelBlob = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([excelBlob]), 'data.xlsx');
  };

  return words?.length !== 0 ? (
    <Stack>
      <Button
        style={{ width: '250px', marginTop: '14px' }}
        variant="contained"
        color="primary"
        component="span"
        onClick={generateExcel}
        startIcon={<DownloadIcon />}
      >
        <Typography variant='h5' sx={{ textTransform: 'capitalize' }}>
          Download Excel
        </Typography>
      </Button>
    </Stack>
  ) : <></>;
};

export default ExcelGenerator;