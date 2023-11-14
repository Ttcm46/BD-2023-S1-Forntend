import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { getArticulosByCantidad, getArticulosByCode, getArticulosByName, getClases, getArticulosByClass, listarEmpleados } from '../../Http/http';
import './Main.css';
import ModalForm from '../CrudForm/CrudForm';
import { cargarXML } from '../../XML/xml';

const url = 'http://localhost:8000/api';

function Main({setEmployee}) {
  const [filterParam, setFilterParam] = useState("")
  const [data, setData] = useState([
    { Name: "Nombre", TypeId: "Tipo ID", Value: "Valor", BirthDate: "Fecha de Nacimiento", Position: "Puesto", Department: "Departamento" },
    { Name: "Juan", TypeId: "DNI", Value: "12345678", BirthDate: "01/15/1990", Position: "Analista", Department: "IT" },
  { Name: "María", TypeId: "Pasaporte", Value: "A123456", BirthDate: "05/22/1985", Position: "Gerente", Department: "Ventas" },
  { Name: "Carlos", TypeId: "Carnet de Extranjería", Value: "B987654", BirthDate: "11/07/1982", Position: "Desarrollador", Department: "Desarrollo" }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(0)
  const [nameEmployee, setNameEmployee] = useState("")
  const [valueEmployee, setValueEmployee] = useState("")


  const handleMenuClick = (name, value) => {
    setNameEmployee(name);
    setValueEmployee(value);
    setModalType(0)
    setIsModalOpen(true);
  };

  const handleInsertClick = () => {
    setModalType(1)
    setIsModalOpen(true);
  };


  const handleFilter = async () => {
    console.log(filterParam)
    if (filterParam.length > 0) {
      console.log(listarEmpleados("", filterParam))
    } else {
      console.log(listarEmpleados("", -1))
    }
  };

  useEffect(() => {
    //getArticulo()
    console.log(listarEmpleados("", filterParam))
  }, [isModalOpen]);


  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="App">
      <h2>Administrador</h2>
      <div className='Header'>
        <div className="FilterDiv">
          <div className="FilterForm">
          <input
            type="text"
            placeholder="Filtro"
            value={filterParam}
            onChange={(e) => setFilterParam(e.target.value)}
          />

          </div>
          <div className="FilterButtons">
          <button onClick={handleFilter}>Filtrar</button>
          </div>
        </div>
      </div>
      <button style={{backgroundColor:'green', height:'40px', width:'120px', color:'white', marginLeft:'5%', borderRadius:'5px', border:'none', fontWeight:'bold'}} 
      onClick={() => handleInsertClick()}>Insertar</button>
      <div className="ProductList">
        {data.map((item, index) => (
          <div className="Product" key={index} onClick={() => {
            handleMenuClick(item.Name, item.Value);
            setEmployee(item)
            }}>
            <div className="ProductName">{item.Name}</div>
            <div className="ProductName">{item.TypeId}</div>
            <div className="ProductName">{item.Value}</div>
            <div className="ProductName">{item.BirthDate}</div>
            <div className="ProductName">{item.Position}</div>
            <div className="ProductName">{item.Department}</div>
          </div>
        ))}
        
      </div>
      

      {/* Modal */}
      {isModalOpen && (
        <ModalForm nameEmployee={nameEmployee} valueEmployee={valueEmployee} handleModalClose={handleModalClose} _type={modalType} />
      )}
    </div>
  );
}


export default Main;
