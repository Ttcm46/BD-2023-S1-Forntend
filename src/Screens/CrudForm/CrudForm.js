import React, { useState } from 'react';

import './CrudForm.css'

const ModalForm = ({ _type, _code, _name, _class, _precio, handleModalClose }) => {
  if (_type === 1) {
    return (
      <Insertar
        _code={_code}
        _name={_name}
        _class={_class}
        _price={_precio}
        handleModalClose={handleModalClose}
      />
    );
  } else if (_type === 2) {
    return (
      <Modificar
        _code={_code}
        _name={_name}
        _class={_class}
        _price={_precio}
        handleModalClose={handleModalClose}
      />
    );
  } else if (_type === 3) {
    return (
      <Eliminar
        _code={_code}
        handleModalClose={handleModalClose}
      />
    );
  }
};

const Insertar = ({ _code, _name, _class, _price, handleModalClose }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [clase, setClase] = useState('');
  const [price, setPrice] = useState('');

  return (
    <div className="ModalOverlay">
      <div className="ModalContent">
        <h2>Insertar Nuevo Articulo</h2>
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
        <p>Clase:</p>
        <input
          type="text"
          value={clase}
          onChange={(e) => setClase(e.target.value)}
        />
        <br />
        <p>Precio:</p>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <div className="ModalButtons">
          <button onClick={handleModalClose} style={{ backgroundColor: 'red' }}>Cerrar</button>
          <button style={{ backgroundColor: 'green' }}>Insertar</button>
        </div>
      </div>
    </div>
  );
}

const Modificar = ({ _code, _name, _class, _price, handleModalClose }) => {
  const [state, setState] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [clase, setClase] = useState('');
  const [price, setPrice] = useState('');

  return (
    !state ? (
      <div className="ModalOverlay">
        <div className="ModalContent">
          <h2>Insertar Nuevo Producto</h2>
          <p>Código:</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <br />
          <div className="ModalButtons">
            <button onClick={handleModalClose} style={{ backgroundColor: 'red' }}>Cerrar</button>
            <button onClick={() => setState(true)} style={{ backgroundColor: 'green' }}>Siguiente</button>
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
          <p>Clase:</p>
          <input
            type="text"
            value={clase}
            onChange={(e) => setClase(e.target.value)}
          />
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
            <button onClick={handleModalClose} style={{ backgroundColor: 'green' }}>Modificar</button>
          </div>
        </div>
      </div>
    )
  );
}

const Eliminar = ({ _code, handleModalClose }) => {
  const [state, setState] = useState(false);
  const [code, setCode] = useState('');

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
            <button onClick={() => setState(true)} style={{ backgroundColor: 'green' }}>Siguiente</button>
          </div>
        </div>
      </div>
    ) : (
      <div className="ModalOverlay">
        <div className="ModalContent">
          <h2>Producto Eliminado</h2>
          <br />
          <div className="ModalButtons">
            <button onClick={() => setState(false)} style={{ backgroundColor: 'red' }}>Volver</button>
            <button onClick={handleModalClose} style={{ backgroundColor: 'green' }}>Eliminar</button>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalForm;
