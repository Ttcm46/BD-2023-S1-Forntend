// Define una función para cargar y analizar el XML
function cargarXML(xmlString) {
   const parser = new DOMParser();
   const xmlDoc = parser.parseFromString(xmlString, "text/xml");
   
   // Extrae usuarios
   const usuarios = [];
   const usuariosXML = xmlDoc.getElementsByTagName("usuario");
   for (let i = 0; i < usuariosXML.length; i++) {
     const usuario = {
       Nombre: usuariosXML[i].getAttribute("Nombre"),
       Password: usuariosXML[i].getAttribute("Password")
     };
     usuarios.push(usuario);
   }
 
   // Extrae clases de artículos
   const clasesDeArticulos = [];
   const clasesDeArticulosXML = xmlDoc.getElementsByTagName("ClasesdeArticulos");
   for (let i = 0; i < clasesDeArticulosXML.length; i++) {
     const clase = {
       Nombre: clasesDeArticulosXML[i].getAttribute("Nombre")
     };
     clasesDeArticulos.push(clase);
   }
 
   // Extrae artículos
   const articulos = [];
   const articulosXML = xmlDoc.getElementsByTagName("Articulo");
   for (let i = 0; i < articulosXML.length; i++) {
     const articulo = {
       Codigo: articulosXML[i].getAttribute("Codigo"),
       Nombre: articulosXML[i].getAttribute("Nombre"),
       ClaseDeArticulo: articulosXML[i].getAttribute("ClasedeArticulo"),
       Precio: parseFloat(articulosXML[i].getAttribute("Precio"))
     };
     articulos.push(articulo);
   }
 
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