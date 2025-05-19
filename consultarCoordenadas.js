// consultarCoordenadas.js
const axios = require('axios');

async function obtenerCoordenadas(idCalle, altura, bis = false) {
  try {
    console.log(`Consultando calle ${idCalle}, altura ${altura}...`);
    
    const url = `https://ws.rosario.gob.ar/ubicaciones/public/direccion?idCalle=${idCalle}&altura=${altura}&bis=${bis}`;
    const response = await axios.get(url);
    
    const { puntoX, puntoY, calle } = response.data;
    
    console.log('\nResultado:');
    console.log(`Calle: ${calle.nombre} ${altura}${bis ? ' Bis' : ''}`);
    console.log(`Coordenada X: ${puntoX}`);
    console.log(`Coordenada Y: ${puntoY}\n`);
    
    return { puntoX, puntoY };
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

// Ejemplo de uso - puedes cambiar estos valores
obtenerCoordenadas(34200, 1280);  // CALLAO 1280