const fs = require('fs');
const path = require('path');

// Patrón para encontrar URLs hardcodeadas de la API
const API_URL_PATTERN = /https:\/\/grainagricultureapi\.integrador\.xyz/g;
const WS_URL_PATTERN = /wss:\/\/grainagricultureapi\.integrador\.xyz\/ws-grain-sensor/g;

// Importaciones a agregar
const IMPORT_STATEMENT = "import { ENDPOINTS, WS_ENDPOINTS } from '../config/api';";

// Objeto de reemplazo para endpoints específicos
const ENDPOINT_REPLACEMENTS = {
  'https://grainagricultureapi.integrador.xyz/users/login': 'ENDPOINTS.LOGIN',
  'https://grainagricultureapi.integrador.xyz/users/logout': 'ENDPOINTS.LOGOUT',
  'https://grainagricultureapi.integrador.xyz/users/check-auth': 'ENDPOINTS.CHECK_AUTH',
  'https://grainagricultureapi.integrador.xyz/grain-sensor': 'ENDPOINTS.GRAIN_SENSOR',
  'https://grainagricultureapi.integrador.xyz/statistics': 'ENDPOINTS.STATISTICS',
  'https://grainagricultureapi.integrador.xyz/statistics/movement-prediction': 'ENDPOINTS.MOVEMENT_PREDICTION',
  'wss://grainagricultureapi.integrador.xyz/ws-grain-sensor': 'WS_ENDPOINTS.GRAIN_SENSOR'
};

// Función para verificar si el archivo ya tiene la importación
function hasImport(content) {
  return content.includes("import { ENDPOINTS") || 
         content.includes("import {ENDPOINTS") ||
         content.includes("import { WS_ENDPOINTS") ||
         content.includes("import {WS_ENDPOINTS");
}

// Función para agregar la importación si es necesario
function addImportIfNeeded(content) {
  if (!hasImport(content)) {
    // Encuentra la última importación
    const importRegex = /import .+ from .+;/g;
    const imports = [...content.matchAll(importRegex)];
    
    if (imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      const lastImportEnd = lastImport.index + lastImport[0].length;
      return content.slice(0, lastImportEnd) + "\n" + IMPORT_STATEMENT + content.slice(lastImportEnd);
    } else {
      // Si no hay importaciones, agrégala al principio
      return IMPORT_STATEMENT + "\n\n" + content;
    }
  }
  
  return content;
}

// Función para reemplazar URLs con referencias a ENDPOINTS
function replaceUrls(content) {
  let newContent = content;
  
  // Reemplazar endpoints específicos primero
  Object.entries(ENDPOINT_REPLACEMENTS).forEach(([url, replacement]) => {
    newContent = newContent.replace(new RegExp(url.replace(/\//g, '\\/'), 'g'), replacement);
  });
  
  // Reemplazar otras URLs genéricas si quedan
  newContent = newContent.replace(API_URL_PATTERN, '${API_BASE_URL}');
  newContent = newContent.replace(WS_URL_PATTERN, 'WS_BASE_URL');
  
  return newContent;
}

// Función principal para procesar un archivo
function processFile(filePath) {
  console.log(`Procesando: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Verificar si el archivo contiene URLs hardcodeadas
    if (API_URL_PATTERN.test(content) || WS_URL_PATTERN.test(content) || 
        Object.keys(ENDPOINT_REPLACEMENTS).some(url => content.includes(url))) {
      
      // Agregar la importación si es necesario
      content = addImportIfNeeded(content);
      
      // Reemplazar las URLs
      content = replaceUrls(content);
      
      // Guardar el archivo modificado
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Actualizado: ${filePath}`);
    } else {
      console.log(`⏭️ Sin cambios: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error);
  }
}

// Función para recorrer recursivamente los directorios
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // Ignorar node_modules y directorios ocultos
      if (file !== 'node_modules' && !file.startsWith('.')) {
        processDirectory(filePath);
      }
    } else if (stats.isFile() && 
              (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx'))) {
      processFile(filePath);
    }
  });
}

// Iniciar el proceso desde el directorio src
const srcDir = path.join(process.cwd(), 'src');
console.log('Iniciando procesamiento de archivos...');
processDirectory(srcDir);
console.log('Proceso completado. Revisa los archivos actualizados.');