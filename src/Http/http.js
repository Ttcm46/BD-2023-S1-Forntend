import axios from 'axios';

const baseURL = 'http://localhost:8000/api'; // Reemplaza con la URL base de tu API

export const loginCheck = async (userName, password) => {
  try {
    const response = await axios.post(`${baseURL}/Login`, {
      Username: userName,
      Password: password,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const logout = async (usuario) => {
  try {
    const response = await axios.post(`${baseURL}/Logout`, {
      Usuario: usuario,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const listarEmpleados = async (usuario, filtro = -1) => {
  try {
    const response = await axios.post(`${baseURL}/ListarEmpleados`, {
      Username: usuario,
      Filtro:filtro
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};


export const editarEmpleado = async (usuario, idObjetivo, nombreNuevo, tipoIdNuevo, valorId, fechaNacimiento, idPuesto, idDepartamento) => {
  try {
    const response = await axios.post(`${baseURL}/EditarEmpleado`, {
      Usuario: usuario,
      IdObjetivo: idObjetivo,
      NombreNuevo: nombreNuevo,
      TipoIdNuevo: tipoIdNuevo,
      ValorID: valorId,
      FechaNacimiento: fechaNacimiento,
      IdPuesto: idPuesto,
      IdDepartamento: idDepartamento,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const getPuestos = async () => {
  try {
    const response = await axios.get(`${baseURL}/GetPuestos`);
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const getDepartamentos = async () => {
  try {
    const response = await axios.get(`${baseURL}/GetDepartamentos`);
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const getIdentificaciones = async () => {
  try {
    const response = await axios.get(`${baseURL}/GetIdentificaciones`);
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const insertarEmpleado = async (usuario, nombre, tipoId, valorId, fechaNacimiento, idPuesto, idDepartamento) => {
  try {
    const response = await axios.post(`${baseURL}/InsertarEmpleado`, {
      Usuario: usuario,
      Nombre: nombre,
      TipoId: tipoId,
      ValorID: valorId,
      FechaNacimiento: fechaNacimiento,
      IdPuesto: idPuesto,
      IdDepartamento: idDepartamento,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const impersonar = async (usuario, idObjetivo) => {
  try {
    const response = await axios.post(`${baseURL}/Impersonar`, {
      Usuario: usuario,
      IDObjetivo: idObjetivo,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const eliminarEmpleado = async (usuario, idEmpleadoAEliminar) => {
  try {
    const response = await axios.post(`${baseURL}/EliminarEmpleado`, {
      Usuario: usuario,
      IDEmpleadoAEliminar: idEmpleadoAEliminar,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const planillaSemanal = async (usuario) => {
  try {
    const response = await axios.post(`${baseURL}/PlanillaSemanal`, {
      Usuario: usuario,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const planillaMensual = async (usuario) => {
  try {
    const response = await axios.post(`${baseURL}/PlanillaMensual`, {
      Usuario: usuario,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const dejarImpersonar = async (usuario, idUsuarioEmpersonado) => {
  try {
    const response = await axios.post(`${baseURL}/DejarImpersonar`, {
      Usuario: usuario,
      IdUsuarioEmpersonado: idUsuarioEmpersonado,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};