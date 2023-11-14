import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginCheck } from '../../Http/http';

const Login = ({ auth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [state, setState] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = loginCheck(username, password)
    if(data.result){
      navigate('/main');
    } else {
      alert("Datos incorrectos")
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
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
          <button onClick={()=>navigate('/main')} className="form-button" type="submit">Iniciar Sesión</button>
        </form>
        {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Login;
