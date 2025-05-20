// obtenerIdCalle.js
const axios = require('axios');

async function obtenerIdCalle(nombreCalle) {
  try {
    console.log(`Buscando ID para la calle: ${nombreCalle}...`);
    
    const url = 'https://datosabiertos.rosario.gob.ar/api/1/datastore/query/33e84ab8-8443-5294-9341-cc28eea7e050';
    const response = await axios.get(url);
    
    // Verificamos que la respuesta tenga la estructura esperada
    if (!response.data || !response.data.results || !Array.isArray(response.data.results)) {
      throw new Error('La estructura de la respuesta no es la esperada');
    }
    
    const calles = response.data.results;
    
    // Normalizar el nombre de búsqueda (eliminar espacios extras y convertir a mayúsculas)
    const nombreBuscado = nombreCalle.trim().toUpperCase();
    
    // Buscar la calle en los resultados
    const calleEncontrada = calles.find(calle => {
      // Normalizar el nombre de la calle en el registro
      const nombreRegistro = calle.nombre.trim().toUpperCase();
      return nombreRegistro.includes(nombreBuscado);
    });
    
    if (calleEncontrada) {
      console.log('\nResultado:');
      console.log(`Nombre: ${calleEncontrada.nombre.trim()}`);
      console.log(`ID Calle: ${calleEncontrada.id_calle}`);
      console.log(`Tipo: ${calleEncontrada.tipo.trim()}`);
      console.log(`Ubicación: ${calleEncontrada.ubicacion.trim()}\n`);
      return calleEncontrada.id_calle;
    } else {
      console.log(`No se encontró la calle: ${nombreCalle}`);
      return null;
    }
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

// Ejemplo de uso:
obtenerIdCalle('pellegri');


module.exports = obtenerIdCalle;