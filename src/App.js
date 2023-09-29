import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Main from './Screens/Main/Main';
import Login from './Screens/Login/Login';

function App() {
  const [auth, setAuth] = useState(true)
  return(
    !auth?(
      <Main/>
    ): (
      <Main/>
    )
  )
}


export default App;
