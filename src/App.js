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
  
  useEffect(() => {
    const ejecutarFunciones = async () => {
      try {
        console.log('Resultado de loginCheck:', await loginCheck('usuario', 'contraseña'));
        console.log('Resultado de logout:', await logout('usuario'));
        console.log('Resultado de listarEmpleados:', await listarEmpleados('usuario', 'filtro'));
        console.log('Resultado de editarEmpleado:', await editarEmpleado('usuario', 'idObjetivo', 'nombreNuevo', 'tipoIdNuevo', 'valorId', 'fechaNacimiento', 'idPuesto', 'idDepartamento'));
        console.log('Resultado de getPuestos:', await getPuestos());
        console.log('Resultado de getDepartamentos:', await getDepartamentos());
        console.log('Resultado de getIdentificaciones:', await getIdentificaciones());
        console.log('Resultado de insertarEmpleado:', await insertarEmpleado('usuario', 'nombre', 'tipoId', 'valorId', 'fechaNacimiento', 'idPuesto', 'idDepartamento'));
        console.log('Resultado de planillaMensual:', await planillaMensual('usuario'));
        console.log('Resultado de planillaSemanal:', await planillaSemanal('usuario'));
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    
    // Llama a la función para ejecutar todas las funciones y mostrar los resultados
    ejecutarFunciones();


  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login auth={setAuth} />} />
        <Route path="/main" element={<Main setEmployee={setEmployee}/>} />
        <Route path="/employee" element={<Employee employee={employee}/>} />
      </Routes>
    </Router>
  );
}

export default App;
