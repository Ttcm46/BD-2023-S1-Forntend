import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

const url = 'http://localhost:8000/api';

function App() {
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  useEffect(() => {
    // Realiza una petición GET al cargar la página
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url); // Ajusta la URL de la API
        if(response.data.result){
          setData(response.data.result); // Actualiza el estado con los datos recibidos
        } else {
          alert("Error en la petición")
        }
      } catch (error) {
        alert('Error al cargar los productos:', error);
      }
    };

    fetchProducts();
  }, [isModalOpen]);

// accion click insertar
  const handleInsertClick = () => {
    setIsModalOpen(true);
  };
// accion click cerrar
  const handleCloseClick = () => {
    window.close();         //cierra ventana en browser
    throw new Error();      //kills program
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
//funcion para validar entradas de insertar
  const handleInsertProduct = async() => {
    // Validación del nombre (alfabético o guion)
    const nameRegex = /^[A-Za-z\-]+$/;
    if (!nameRegex.test(newProductName)) {
      alert('Nombre inválido');
      return;
    }

    // Validación del precio (números y dos decimales)
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(newProductPrice)) {
      alert('Precio inválido');
      return;
    }

    try {
      // Realiza la petición POST
      const response = await axios.post(url, {
        name: newProductName,
        price: parseFloat(newProductPrice)
      });
      console.log(response.data.result)

      if (response.data.result === false ) {
        alert('Ya existe un articulo con este nombre');

      } else {
        alert('Articulo insertado correctamente');
        setNewProductName('')
        setNewProductPrice('')
        setIsModalOpen(false); // Cierra el modal
      }
    } catch (error) {
      alert('Error al realizar la petición POST:', error);
    }
  };

  return (
    <div className="App">
      <h1>Lista de Articulos</h1>
      <div className="ProductList">
        {data.map((item, index) => (
          <div className="Product" key={index}>
            <div className="ProductName">{item.name}</div>
            <div className="ProductPrice">${item.price}</div>
          </div>
        ))}
      </div>
      <div className="Buttons">
        <button onClick={handleInsertClick} style={{backgroundColor: 'green', color: 'white'}}>Insertar</button>
        <button onClick={handleCloseClick} style={{backgroundColor: 'red', color: 'white'}}>Cerrar</button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="ModalOverlay">
          <div className="ModalContent">
            <h2>Insertar Nuevo Producto</h2>
            <p>Nombre:</p>
            <input
              type="text"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
            <br />
            <p>Precio:</p>
            <input
              type="text"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
            <div className="ModalButtons">
              <button onClick={handleInsertProduct} style={{backgroundColor: 'green'}}>Insertar</button>
              <button onClick={handleModalClose} style={{backgroundColor: 'red'}}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;
