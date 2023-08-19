import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import getTcvValueByWord from '../../utils/getTcvValueByWord';

const ExcelGenerator = ({ words }) => {
  const generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    const headerRow = worksheet.addRow(['Name', 'Value']);
    headerRow.font = { bold: true };

    let tcsValues = [];

    words?.forEach(word=>{
      tcsValues?.push(getTcvValueByWord(word));
    })

    words?.forEach((word,index)=>{
      worksheet.addRow([word, tcsValues?.[index]]);
    })

    // worksheet.addRow(['saptami', 'fis']);
    // worksheet.addRow(['sudhanshu', 'fis']);

    const excelBlob = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([excelBlob]), 'data.xlsx');
  };

  return (
    <div>
      <h2>Excel Generator</h2>
      <button disabled={words?.length == 0} onClick={generateExcel}>Generate Excel</button>
    </div>
  );
};

export default ExcelGenerator;