import React, { useState } from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';

const WordDocumentUploader = ({ wordsSetter }) => {
  const [file, setFile] = useState(null);
  const [words, setWords] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const processDocument = () => {
    if (!file) {
      alert('Please select a Word document first.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;

      const zip = new PizZip(content);
      const doc = new Docxtemplater().loadZip(zip);

      doc.setData({});
      doc.render();

      const text = doc.getFullText();

      const wordsArray = text.split(/\s+/);
      setWords(wordsArray);

      wordsSetter(wordsArray);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h2>Word Document Uploader</h2>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <button onClick={processDocument}>Process Document</button>

      <div>
        <h3>Words in the Document:</h3>
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WordDocumentUploader;