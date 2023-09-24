import axios from "axios";


const makeAxiosRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    console.log('Respuesta exitosa:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al hacer la petición Axios:', error);
    return null;
  }
};

export default makeAxiosRequest;

