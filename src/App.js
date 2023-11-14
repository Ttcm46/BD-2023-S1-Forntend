import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Screens/Main/Main';
import Login from './Screens/Login/Login';
import Employee from './Screens/Employee/Employee';
import { editarEmpleado,getPuestos, getDepartamentos, getIdentificaciones, insertarEmpleado, listarEmpleados, loginCheck, logout, planillaMensual, planillaSemanal } from './Http/http';

function App() {
  const [auth, setAuth] = useState(true);
  const [employee, setEmployee] = useState({ Name: "Carlos", TypeId: "Carnet de Extranjería", Value: "B987654", BirthDate: "11/07/1982", Position: "Desarrollador", Department: "Desarrollo" })
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login auth={setAuth} />} />
        <Route path="/main" element={<Main employee = {employee}setEmployee={setEmployee}/>} />
        <Route path="/employee" element={<Employee employee={employee}/>} />
      </Routes>
    </Router>
  );
}

export default App;
