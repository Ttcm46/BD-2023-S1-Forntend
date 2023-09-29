import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { getArticulosByCantidad, getArticulosByCode, getArticulosByName, getClases, getArticulosByClass } from '../../Http/http';
import './Main.css';
import ModalForm from '../CrudForm/CrudForm';

const url = 'http://localhost:8000/api';

function Main() {
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [classOptions, setClassOptions] = useState([])
  const [classIds, setClassIds] = useState([])

  const [nombreFiltro, setNombreFiltro] = useState('');
  const [cantidadFiltro, setCantidadFiltro] = useState('');
  const [claseFiltro, setClaseFiltro] = useState(0);

  const [modalType, setModalType] = useState(0)

  const handleFilterByName = async () => {
    try {
      const filteredData = await getArticulosByName(nombreFiltro);
      setData([{ Codigo: "Codigo", Nombre: "Nombre", idClaseArticulo: "Clase Articulo", Precio: "Precio" },...filteredData]);
    } catch (error) {
      console.error('Error al filtrar por nombre:', error);
    }
  };
  
  const handleFilterByCantidad = async () => {
    try {
      const filteredData = await getArticulosByCantidad(cantidadFiltro);
      setData([{ Codigo: "Codigo", Nombre: "Nombre", idClaseArticulo: "Clase Articulo", Precio: "Precio" },...filteredData]);
    } catch (error) {
      console.error('Error al filtrar por cantidad:', error);
    }
  };
  
  const handleFilterByClase = async () => {
    try {
      console.log("Todas clases", classOptions)
      for(let i = 0; i < classOptions.length; i++){
        if(claseFiltro === classOptions[i]){
          const filteredData = await getArticulosByClass(classIds[i]);
          console.log("Id clase:", classIds[i])
          setData([{ Codigo: "Codigo", Nombre: "Nombre", idClaseArticulo: "Clase Articulo", Precio: "Precio" },...filteredData]);
        }
      }
    } catch (error) {
      console.error('Error al filtrar por clase:', error);
    }
  };
  
  const getAllClases = async () => {
    try {
      const clases = await getClases();
      const clasesNames = []
      const clasesIds = []
      for(let i = 0; i < clases[0].length; i++){
        clasesNames.push(clases[0][i].Nombre)
        clasesIds.push(clases[0][i].id)
      }
      setClassOptions(clasesNames)
      setClassIds(clasesIds)
    } catch (error) {
      console.error('Error al filtrar por clase:', error);
    }
  };
  


  useEffect(() => {
    getAllClases()
    const getArticulo = async () => {
      try {
        const filteredData = await getArticulosByName("-1");
        console.log(filteredData)

        setData([{ Codigo: "Codigo", Nombre: "Nombre", idClaseArticulo: "Clase Articulo", Precio: "Precio" },...filteredData]);
      } catch (error) {
        console.error('Error al filtrar por clase:', error);
      }
    };
    getArticulo()
  }, [isModalOpen]);


  const handleInsertClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="App">
      <h2>Lista de Articulos</h2>
      <div className='Header'>
        <div className="FilterDiv">
          <div className="FilterForm">
          <input
            type="text"
            placeholder="Nombre"
            value={nombreFiltro}
            onChange={(e) => setNombreFiltro(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cantidad"
            value={cantidadFiltro}
            onChange={(e) => setCantidadFiltro(e.target.value)}
          />
          <select value={claseFiltro} onChange={(e) => setClaseFiltro(e.target.value)}>
            <option value="">Seleccionar Clase</option>
            {classOptions.map((opcion, index) => (
              <option key={index} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>

          </div>
          <div className="FilterButtons">
          <button onClick={handleFilterByName}>Filtrar por nombre</button>
          <button onClick={handleFilterByCantidad}>Filtrar por cantidad</button>
          <button onClick={() => handleFilterByClase()}>Filtrar por clase</button>
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
            <div className="ProductName">{item.Codigo}</div>
            <div className="ProductName">{item.Nombre}</div>
            <div className="ProductPrice">{item.idClaseArticulo}</div>
            <div className="ProductName">${item.Precio}</div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalForm _type = {modalType} handleModalClose={handleModalClose} clases={classOptions} />
      )}
    </div>
  );
}


export default Main;
