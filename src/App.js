import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Main from './Screens/Main/Main';
import Login from './Screens/Login/Login';
import { guardarXML } from './XML/xml';

function App() {
  const [auth, setAuth] = useState(true)
  useEffect(() => {
  },[])
  return(
    !auth?(
      <Login auth = {setAuth} />
    ): (
      <Main/>
    )
  )
}


export default App;
