import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { getArticulosByCantidad, getArticulosByCode, getArticulosByName } from '../../Http/http';
import './Main.css';
import ModalForm from '../CrudForm/CrudForm';

const url = 'http://localhost:8000/api';

function Main() {
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [classOptions, setClassOptions] = useState(['Opción 1', 'Opción 2', 'Opción 3'])

  const [nombreFiltro, setNombreFiltro] = useState('');
  const [cantidadFiltro, setCantidadFiltro] = useState('');
  const [claseFiltro, setClaseFiltro] = useState('');

  const [modalType, setModalType] = useState(0)

  const [xmlData, setXmlData] = useState(null);
  const [parsedData, setParsedData] = useState(null);

  function cargarXML(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  
    const usuarios = [];
    const usuariosXML = xmlDoc.querySelectorAll("Usuarios usuario");
    usuariosXML.forEach((usuarioXML) => {
      const usuario = {
        Nombre: usuarioXML.getAttribute("Nombre"),
        Password: usuarioXML.getAttribute("Password")
      };
      usuarios.push(usuario);
    });
    console.log(usuarios);

    const clasesDeArticulos = [];
    const clasesDeArticulosXML = xmlDoc.querySelectorAll("ClasesdeArticulos ClasedeArticulos");
    clasesDeArticulosXML.forEach((claseXML) => {
      const claseDeArticulo = {
        Nombre: claseXML.getAttribute("Nombre")
      };
      clasesDeArticulos.push(claseDeArticulo);
    });
    console.log(clasesDeArticulosXML);

    const articulos = [];
    const articulosXML = xmlDoc.querySelectorAll("Articulos Articulo");
    articulosXML.forEach((articuloXML) => {
      const articulo = {
        Codigo: articuloXML.getAttribute("Codigo"),
        Nombre: articuloXML.getAttribute("Nombre"),
        ClasedeArticulo: articuloXML.getAttribute("ClasedeArticulo"),
        Precio: parseFloat(articuloXML.getAttribute("Precio")) // Convertir a número
      };
      articulos.push(articulo);
    });
    console.log(articulosXML);

  
    // Devuelve los datos en un objeto
    return {
      Usuarios: usuarios,
      ClasesDeArticulos: clasesDeArticulos,
      Articulos: articulos
    };
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const xmlString = e.target.result;
        const parsedData = cargarXML(xmlString);
        console.log("data",parsedData)
        setXmlData(xmlString);
        setParsedData(parsedData);
      };
      reader.readAsText(file);
    }
  };

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
      const filteredData = await getArticulosByCode(claseFiltro);
      setData([{ Codigo: "Codigo", Nombre: "Nombre", idClaseArticulo: "Clase Articulo", Precio: "Precio" },...filteredData]);
    } catch (error) {
      console.error('Error al filtrar por clase:', error);
    }
  };
  


  useEffect(() => {
    const getArticulo = async () => {
      try {
        const filteredData = await getArticulosByName("-1");
        console.log(filteredData)

        setData([{ Codigo: "Codigo", Nombre: "Nombre", idClaseArticulo: "Clase Articulo", Precio: "Precio" },...filteredData]);
      } catch (error) {
        console.error('Error al filtrar por clase:', error);
      }
    };
    //getArticulo()
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
          <button onClick={handleFilterByClase}>Filtrar por clase</button>
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
        <ModalForm _type = {modalType} handleModalClose={handleModalClose} />
      )}
    </div>
  );
}


export default Main;
