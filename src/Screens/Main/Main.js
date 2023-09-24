import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './Main.css';
import ModalForm from '../CrudForm/CrudForm';

const url = 'http://localhost:8000/api';

function Main() {
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [classOptions, setClassOptions] = useState(['Opción 1', 'Opción 2', 'Opción 3'])

  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [clase, setClase] = useState('');
  const [precio, setPrecio] = useState(0);

  const [modalType, setModalType] = useState(0)


  useEffect(() => {
  }, [isModalOpen]);


  const handleInsertClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="App">
      <h1>Lista de Articulos</h1>
      <div className='Header'>
        <div className="FilterDiv">
          <div className="FilterForm">
            <input type = "text" placeholder = "Nombre"/>
            <input type = "text" placeholder = "Cantidad"/>
            <select>
              {classOptions.map((opcion, index) => (
                <option key={index} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          </div>
          <div className="FilterButtons">
            <button>Filtrar por nombre</button>
            <button>Filtrar por cantidad</button>
            <button>Filtrar por clase</button>
          </div>
        </div>
    
        <div className="CrudButtons">
          <button onClick={() => {  
            setModalType(1)
            setIsModalOpen(true)
          }}>Insertar Articulo</button>
          <button onClick={() => {
            setModalType(2)
            setIsModalOpen(true)
          }}>Actualizar Articulo</button>
          <button onClick={() => {
            setModalType(3)
            setIsModalOpen(true)
          }}>Eliminar Articulo</button>

        </div>
      </div>

      <div className="ProductList">
        {data.map((item, index) => (
          <div className="Product" key={index}>
            <div className="ProductName">{item.code}</div>
            <div className="ProductName">{item.name}</div>
            <div className="ProductPrice">{item.clas}</div>
            <div className="ProductName">${item.price}</div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalForm _type = {modalType} _code={codigo} _name={nombre} _class={clase} _precio={precio} handleModalClose={handleModalClose} />
      )}
    </div>
  );
}


export default Main;
