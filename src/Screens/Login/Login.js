import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ auth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [state, setState] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/main');


    if(state){
      const response = await axios.post('http://localhost:8000/api/LoginCheck', {
        username,
        password,
      });
      console.log(response.data.result)
      if (response.data.result === true) {
        setSuccessMessage('Inicio de sesión exitoso.');
        alert('Inicio de sesión exitoso.')
        setErrorMessage('');
        auth(true);
      } else {
        setErrorMessage('Inicio de sesión fallido.');
        setSuccessMessage('');
      }

    } else {
      const response = await axios.post('http://localhost:8000/api/InsertUsuario', {
        username,
        password,
      });
      if (response.data.result === true) {
        setSuccessMessage('Registro exitoso.');
        alert('Registro exitoso.')
        setErrorMessage('');
        auth(true);
      } else {
        setErrorMessage('Registro fallido.');
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{state? "Iniciar Sesión":"Registrarse"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              id="username"
              name="username"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={()=>navigate('/main')} className="form-button" type="submit">{state? "Iniciar Sesión":"Registrarse"}</button>
          <p onClick={() => setState(!state)} >{state? "No tienes cuenta? Registrarse":"Ya tienes cuenta? Iniciar Sesión"}</p>
        </form>
        {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Login;
