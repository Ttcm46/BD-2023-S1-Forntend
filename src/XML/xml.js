export function cargarXML(xmlString) {
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

 
export function guardarXML(){
   // Crea un objeto XMLHttpRequest para cargar el archivo XML
   const xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET", "datos.xml", false); // Reemplaza "tu_archivo.xml" con la ruta correcta a tu archivo XML
   xmlhttp.send();

   // Verifica si la solicitud se completó con éxito
   if (xmlhttp.status === 200) {
   const xmlString = xmlhttp.responseText;

   // Ahora puedes usar la función cargarXML para parsear los datos
   const datos = cargarXML(xmlString);
   console.log(datos);
   } else {
   console.error("No se pudo cargar el archivo XML.");
   }
}