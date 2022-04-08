import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [bool, setBool] = useState<boolean>(false);
  const handleChangeBool = () => {
    setBool((bool) => !bool)
  }
  return <div onClick={handleChangeBool}>
    {bool && 'hello world' || 'kongbai'}
  </div>
}

export default App;
