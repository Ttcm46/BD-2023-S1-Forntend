import React, { useEffect, useState } from 'react';
import { insertArticulo, getClases, updateArticulo, getArticulosByCode, borrarArticulo } from '../../Http/http';

import './CrudForm.css'

const ModalForm = ({ _type, handleModalClose, clases }) => {
  if (_type === 1) {
    return (
      <Insertar
        handleModalClose={handleModalClose}
        clases={clases}
      />
    );
  } else if (_type === 2) {
    return (
      <Modificar
        handleModalClose={handleModalClose}
        clases={clases}
      />
    );
  } else if (_type === 3) {
    return (
      <Eliminar
        handleModalClose={handleModalClose}
        clases={clases}
      />
    );
  }
};

const Insertar = ({ handleModalClose, clases }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [clase, setClase] = useState('');
  const [price, setPrice] = useState('');
  const [clasesList, setClasesList] = useState(clases);

  useEffect(() => {
  }, []);

  const handleInsertClick = async () => {
    try {
      await insertArticulo(name, price, code, clase);
      alert('Artículo insertado con éxito');
      handleModalClose()
    } catch (error) {
      alert('Error al insertar el artículo');
    }
  };

  return (
    <div className="ModalOverlay">
      <div className="ModalContent">
        <h2>Insertar Nuevo Articulo</h2>
        <p>Código:</p>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
        <br />
        <p>Nombre:</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <p>Clase:</p>
        <select value={clase} onChange={(e) => setClase(e.target.value)}>
            <option value="">Seleccionar Clase</option>
            {clasesList.map((claseItem) => (
              <option value={claseItem.nombre}>
                {claseItem}
              </option>
            ))}
        </select>
        <br />
        <p>Precio:</p>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br />
        <div className="ModalButtons">
          <button onClick={handleModalClose} style={{ backgroundColor: 'red' }}>
            Cerrar
          </button>
          <button onClick={handleInsertClick} style={{ backgroundColor: 'green' }}>
            Insertar
          </button>
        </div>
      </div>
    </div>
  );
};


const Modificar = ({handleModalClose, clases }) => {
  const [state, setState] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [clase, setClase] = useState('');
  const [price, setPrice] = useState('');
  const [clasesList, setClasesList] = useState(clases);

  useEffect(() => {
  }, []);

  const handleUpdateClick = async () => {
    try {
      await updateArticulo(code, name, price, code, clase);
      alert('Artículo modificado con éxito');
      handleModalClose()
    } catch (error) {
      alert('Error al modificar el artículo');
    }
  }

  const handleVerifyClick = async () => {
    try {
      await getArticulosByCode(code);
      setState(true)
    } catch (error) {
      alert('Artículo no encontrado');
    }
  }

  return (
    !state ? (
      <div className="ModalOverlay">
        <div className="ModalContent">
          <h2>Modificar Producto</h2>
          <p>Código:</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <br />
          <div className="ModalButtons">
            <button onClick={handleModalClose} style={{ backgroundColor: 'red' }}>Cerrar</button>
            <button onClick={handleVerifyClick} style={{ backgroundColor: 'green' }}>Siguiente</button>
          </div>
        </div>
      </div>
    ) : (
      <div className="ModalOverlay">
        <div className="ModalContent">
          <h2>Modificar Articulo</h2>
          <p>Código:</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <br />
          <p>Nombre:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Clases:</p>
          <select value={clase} onChange={(e) => setClase(e.target.value)}>
            <option value="">Seleccionar Clase</option>
            {clasesList.map((claseItem) => (
              <option value={claseItem.nombre}>
                {claseItem}
              </option>
            ))}
        </select>
          <br />
          <p>Precio:</p>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <div className="ModalButtons">
            <button onClick={() => setState(false)} style={{ backgroundColor: 'red' }}>Volver</button>
            <button onClick={handleUpdateClick} style={{ backgroundColor: 'green' }}>Modificar</button>
          </div>
        </div>
      </div>
    )
  );
}

const Eliminar = ({ _code, handleModalClose }) => {
  const [state, setState] = useState(false);
  const [code, setCode] = useState('');

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [clase, setClase] = useState('');

  const handleDeleteClick = async () => {
    try {
      await borrarArticulo(code);
      alert('Artículo eliminado con éxito');
      handleModalClose()
    } catch (error) {
      alert('Error al eliminar el artículo');
    }
  }

  const handleVerifyClick = async () => {
    try {
      const response = await getArticulosByCode(code);
      console.log("ESTE",response[0])
      setNombre(response[0].Nombre)
      setClase(response[0].Codigo)
      setPrecio(response[0].Precio)
      setState(true)
    } catch (error) {
      alert('Artículo no encontrado');
    }
  }

  return (
    !state ? (
      <div className="ModalOverlay">
        <div className="ModalContent">
          <h2>Eliminar Articulo</h2>
          <p>Código:</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <br />
          <div className="ModalButtons">
            <button onClick={handleModalClose} style={{ backgroundColor: 'red' }}>Cerrar</button>
            <button onClick={handleVerifyClick} style={{ backgroundColor: 'green' }}>Siguiente</button>
          </div>
        </div>
      </div>
    ) : (
      <div className="ModalOverlay">
        <div className="ModalContent">
          <h2>Nombre: {nombre}</h2>
          <h2>Codigo: {clase}</h2>
          <h2>Precio: {precio}</h2>
          <br />
          <div className="ModalButtons">
            <button onClick={() => setState(false)} style={{ backgroundColor: 'red' }}>Volver</button>
            <button onClick={handleDeleteClick} style={{ backgroundColor: 'green' }}>Eliminar</button>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalForm;
