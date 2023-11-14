import React, { useEffect, useState } from 'react';
import { insertArticulo, getClases, updateArticulo, getArticulosByCode, borrarArticulo, eliminarEmpleado, insertarEmpleado, editarEmpleado } from '../../Http/http';

import './CrudForm.css'
import { useNavigate } from 'react-router-dom';

const ModalForm = ({ handleModalClose, nameEmployee, valueEmployee, _type }) => {
  const [type, setType] = useState(_type)
  const deleteEmployee = () => {
    const result = window.confirm('¿Desea eliminar este usuario?');
    if (result) {
      // Código a ejecutar si el usuario hace clic en "Sí"
      alert('Acción confirmada');
      console.log(eliminarEmpleado(nameEmployee, valueEmployee))
      handleModalClose()
    } else {
      // Código a ejecutar si el usuario hace clic en "Cancelar"
      alert('Acción cancelada');
    }
  }

  const navigate = useNavigate()
  if (type === 0) {
    return(
      <div className="ModalOverlayMenu">
        <div className="ModalContentMenu">
          <h4>Nombre: {nameEmployee} {valueEmployee} </h4>
          <div className="ModalContentMenuOptions">
            <button style={{ backgroundColor: 'green' }} onClick={() => setType(2)}>Editar Empleado</button>
            <button style={{ backgroundColor: 'red' }} onClick={() => deleteEmployee()}>Eliminar Empleado</button>
            <button style={{ backgroundColor: 'blue' }} onClick={() => navigate('/employee')}>Impersonar Empleado</button>
          </div>
          <h5 onClick={handleModalClose}>Cerrar</h5>
        </div>
      </div>
    )
  }
  if (type === 1) {
    return (
      <Insertar
        handleModalClose={handleModalClose}
        back={setType}
      />
    );
  } else if (type === 2) {
    return (
      <Modificar
        handleModalClose={handleModalClose}
        back={setType}
      />
    );
  }
};

const Insertar = ({ handleModalClose, back }) => {
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [tipoIdNuevo, setTipoIdNuevo] = useState('');
  const [valorId, setValorId] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [idPuesto, setIdPuesto] = useState('');
  const [idDepartamento, setIdDepartamento] = useState('');

  const handleSubmit = () => {
    console.log(insertarEmpleado(nombreNuevo,tipoIdNuevo,valorId,fechaNacimiento,idPuesto, idDepartamento))
    handleModalClose();
  };

  return (
    <div className="ModalOverlay">
      <div className="ModalContent">
        <h2>Insertar Nuevo Empleado</h2>

        <div className="ColumnInputs">
          <div className="InputWrapper">
            <label htmlFor="nombreNuevo">Nombre Nuevo:</label>
            <input type="text" id="nombreNuevo" value={nombreNuevo} onChange={(e) => setNombreNuevo(e.target.value)} />
          </div>

          <div className="InputWrapper">
            <label htmlFor="tipoIdNuevo">Tipo ID Nuevo:</label>
            <input type="text" id="tipoIdNuevo" value={tipoIdNuevo} onChange={(e) => setTipoIdNuevo(e.target.value)} />
          </div>

          <div className="InputWrapper">
            <label htmlFor="valorId">Valor ID:</label>
            <input type="text" id="valorId" value={valorId} onChange={(e) => setValorId(e.target.value)} />
          </div>

          <div className="InputWrapper">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
            <input type="text" id="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
          </div>

          <div className="InputWrapper">
            <label htmlFor="idPuesto">ID Puesto:</label>
            <input type="text" id="idPuesto" value={idPuesto} onChange={(e) => setIdPuesto(e.target.value)} />
          </div>

          <div className="InputWrapper">
            <label htmlFor="idDepartamento">ID Departamento:</label>
            <input type="text" id="idDepartamento" value={idDepartamento} onChange={(e) => setIdDepartamento(e.target.value)} />
          </div>
        </div>

        {/* Botones */}
        <div className="ButtonWrapper">
          <button onClick={handleSubmit}>Guardar</button>
          <button onClick={handleModalClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};


const Modificar = ({ handleModalClose, back }) => {
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [tipoIdNuevo, setTipoIdNuevo] = useState('');
  const [valorId, setValorId] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [idPuesto, setIdPuesto] = useState('');
  const [idDepartamento, setIdDepartamento] = useState('');

  const handleSubmit = () => {
    console.log(editarEmpleado(nombreNuevo,tipoIdNuevo,valorId,fechaNacimiento,idPuesto, idDepartamento))
    handleModalClose();
  };

  return (
    <div className="ModalOverlay">
      <div className="ModalContent">
        <h2>Modificar Empleado</h2>
      
        <div>
          <label htmlFor="nombreNuevo">Nombre Nuevo:</label>
          <input type="text" id="nombreNuevo" value={nombreNuevo} onChange={(e) => setNombreNuevo(e.target.value)} />
        </div>

        <div>
          <label htmlFor="tipoIdNuevo">Tipo ID Nuevo:</label>
          <input type="text" id="tipoIdNuevo" value={tipoIdNuevo} onChange={(e) => setTipoIdNuevo(e.target.value)} />
        </div>

        <div>
          <label htmlFor="valorId">Valor ID:</label>
          <input type="text" id="valorId" value={valorId} onChange={(e) => setValorId(e.target.value)} />
        </div>

        <div>
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input type="text" id="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
        </div>

        <div>
          <label htmlFor="idPuesto">ID Puesto:</label>
          <input type="text" id="idPuesto" value={idPuesto} onChange={(e) => setIdPuesto(e.target.value)} />
        </div>

        <div>
          <label htmlFor="idDepartamento">ID Departamento:</label>
          <input type="text" id="idDepartamento" value={idDepartamento} onChange={(e) => setIdDepartamento(e.target.value)} />
        </div>

        {/* Botones */}
        <div>
          <button onClick={handleSubmit}>Guardar</button>
          <button onClick={()=>back(0)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};


export default ModalForm;
