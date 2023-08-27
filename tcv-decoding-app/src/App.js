import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ExcelGenerator from './components/ExcelGenerator';
import ImageToTextConverter from './components/ImageToTextConverter';
import {
  Stack,
} from '@mui/material';
// import WordDocumentUploader from './components/WordDocumentUploader';

function App() {

  const [words, setWords] = useState([]);
  const wordsSetter = (words) => {
    setWords(words)
  }

  return (
    <Stack px={5} py={2} justifyContent='center' className="App">
        <Header />
        {/* <WordDocumentUploader wordsSetter={wordsSetter}/> */}
        <ImageToTextConverter wordsSetter={wordsSetter} />
        <ExcelGenerator words={words} />
    </Stack>
  );
}

export default App;