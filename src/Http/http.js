import axios from 'axios';

const baseURL = 'http://localhost:8000/api'; // Reemplaza con la URL base de tu API


export const getArticulosByCantidad = async (amount) => {
  try {
    const response = await axios.get(`${baseURL}/GetArticulosByCantidad`, {
      data: { amount },
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const getArticulosByName = async (name) => {
  try {
    const response = await axios.get(`${baseURL}/GetArticulosByName`, {
      data: { name },
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const getArticulosByCode = async (code) => {
  try {
    const response = await axios.get(`${baseURL}/GetArticulosByCode`, {
      data: { code },
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};


export const getClases = async () => {
  try {
    const response = await axios.get(`${baseURL}/GetClases`);
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const insertArticulo = async (name, price, code, clase) => {
  try {
    const response = await axios.post(`${baseURL}/InsertArticulo`, {
      name,
      price,
      code,
      clase,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const insertClase = async (class_name) => {
  try {
    const response = await axios.post(`${baseURL}/InsertClase`, {
      Class_name: class_name,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const insertUsuario = async (userName, password) => {
  try {
    const response = await axios.post(`${baseURL}/InsertUsuario`, {
      UserName: userName,
      Password: password,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const loginCheck = async (userName, password) => {
  try {
    const response = await axios.post(`${baseURL}/LoginCheck`, {
      UserName: userName,
      Password: password,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const updateArticulo = async (target, name, price, code, clase) => {
  try {
    const response = await axios.put(`${baseURL}/UpdateArticulo`, {
      target,
      name,
      price,
      code,
      clase,
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const borrarArticulo = async (code) => {
  try {
    const response = await axios.delete(`${baseURL}/BorrarArticulo`, {
      data: { code },
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};


/*
router.get("/GetArticulosByCantidad", GetArticulosByCantidadController)
router.get("/GetArticulosByName", GetArticulosByNameController)
router.get("/GetArticulosByCode",GetArticulosByCodeController)
router.get("/GetClases", GetClasesController)
router.post("/InsertArticulo", InsertArticuloController)
router.post("/InsertClase", InsertClaseController)
router.post("/InsertUsuario", InsertUsuarioController)
router.post("/LoginCheck", LoginCheckController)
router.put("/UpdateArticulo", UpdateArticuloController)
router.delete("/BorrarArticulo", BorrarArticuloController)

*/