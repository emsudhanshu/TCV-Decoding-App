import { useState } from 'react';
import './App.css';
import ExcelGenerator from './components/ExcelGenerator';
import WordDocumentUploader from './components/WordDocumentUploader';

function App() {

  const [words,setWords] = useState([]);

  const wordsSetter = (words)=>{
    setWords(words)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to TCV Decoding App
        </p>
      </header>
      <WordDocumentUploader wordsSetter={wordsSetter}/>
      <ExcelGenerator words={words}/>
    </div>
  );
}

export default App;
