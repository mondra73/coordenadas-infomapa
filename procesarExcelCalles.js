const ExcelJS = require('exceljs');
const obtenerIdCalle = require('./obtenerIdCalle');

async function procesarExcelCalles() {
  // 1. Configuración inicial
  const workbook = new ExcelJS.Workbook();
  const ARCHIVO_EXCEL = './calles.xlsx';
  const COL_NOMBRES = 'A'; // Columna con nombres de calles
  const COL_IDS = 'B';     // Columna donde guardar IDs

  try {
    // 2. Cargar el archivo Excel
    await workbook.xlsx.readFile(ARCHIVO_EXCEL);
    const worksheet = workbook.worksheets[0]; // Primera hoja

    // 3. Procesar cada fila
    console.log(`Iniciando procesamiento de ${worksheet.rowCount} calles...`);
    
    for (let i = 2; i <= worksheet.rowCount; i++) { // Empieza en fila 2 (asumiendo headers)
      await new Promise(resolve => setTimeout(resolve, 300)); 
      const nombreCelda = `${COL_NOMBRES}${i}`;
      const idCelda = `${COL_IDS}${i}`;
      
      const nombreCalle = worksheet.getCell(nombreCelda).value;
      
      // Saltar si ya tiene ID o no tiene nombre
      if (!nombreCalle || worksheet.getCell(idCelda).value) continue;

      // 4. Buscar ID y guardar
      const id = await obtenerIdCalle(nombreCalle.toString());
      if (id) {
        worksheet.getCell(idCelda).value = id;
        console.log(`Fila ${i}: ${nombreCalle} → ${id}`);
      }

      // Guardar progreso cada 10 registros
      if (i % 10 === 0) await workbook.xlsx.writeFile(ARCHIVO_EXCEL);
    }

    // 5. Guardar resultados finales
    await workbook.xlsx.writeFile(ARCHIVO_EXCEL);
    console.log('✅ Proceso completado!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    // Guardar cambios incluso si hay error
    await workbook.xlsx.writeFile(ARCHIVO_EXCEL);
  }
}

// Ejecutar
procesarExcelCalles();