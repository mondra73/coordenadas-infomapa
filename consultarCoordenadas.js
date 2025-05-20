// consultarCoordenadas.js
const axios = require('axios');

async function obtenerCoordenadas(idCalle, altura, bis = false, letra = null) {
  try {
    console.log(`Consultando calle ${idCalle}, altura ${altura}...`);
    
    let url = `https://ws.rosario.gob.ar/ubicaciones/public/direccion?idCalle=${idCalle}&altura=${altura}&bis=${bis}`;
    
    // Agregar el parámetro letra solo si tiene valor
    if (letra) {
      url += `&letra=${letra}`;
    }
    
    const response = await axios.get(url);
    
    const { puntoX, puntoY, calle, letra: letraRespuesta } = response.data;
    
    console.log('\nResultado:');
    console.log(`Calle: ${calle.nombre} ${altura}${bis ? ' Bis' : ''}${letraRespuesta ? ` ${letraRespuesta}` : ''}`);
    console.log(`Coordenada X: ${puntoX}`);
    console.log(`Coordenada Y: ${puntoY}\n`);
    
    return { puntoX, puntoY };
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

// Ejemplos de uso:
// obtenerCoordenadas(34200, 1280);          // CALLAO 1280
// obtenerCoordenadas(34200, 1280, false, 'A'); // CALLAO 1280 A
// obtenerCoordenadas(34200, 101, true);  // CALLAO 1280 Bis