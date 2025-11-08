const fs = require('fs');
const path = require('path');

// Directorios a excluir
const excludeDirs = ['.next', 'node_modules', '.git', '.genkit', 'public'];
const excludeFiles = [
  'tailwind.config.js',
  'postcss.config.js',
  'package.json',
  'tsconfig.json',
  'next.config.mjs',
  'middleware.ts',
  'README.md',
  'frontend-design-recommendations.md',
  'nuamana_screenshot.png'
];

// Función para comprobar si un archivo es de tipo código
function isCodeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', '.sass', '.less'].includes(ext);
}

// Recopilar todos los archivos de código
const codeFiles = [];
function collectFiles(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(item)) {
        collectFiles(itemPath);
      }
    } else if (isCodeFile(itemPath) && !excludeFiles.includes(item)) {
      codeFiles.push(itemPath);
    }
  }
}

collectFiles('src');

// Leer todo el contenido de los archivos para buscar importaciones
let allContent = '';
for (const file of codeFiles) {
  allContent += fs.readFileSync(file, 'utf-8');
}

// Buscar referencias de importación
console.log('Archivos que podrían no estar siendo utilizados:');
for (const file of codeFiles) {
  const fileName = path.basename(file, path.extname(file));
  
  // Buscar patrones de importación que coincidan con el nombre del archivo
  const importPattern = new RegExp(`['"\`][/\\w\\-]*${fileName}`, 'g');
  const namedImportPattern = new RegExp(`[^a-zA-Z0-9_]${fileName}[^a-zA-Z0-9_]`, 'g');
  
  // Contar coincidencias de importaciones
  const importMatches = allContent.match(importPattern) || [];
  const namedMatches = allContent.match(namedImportPattern) || [];
  
  // Filtrar coincidencias que no sean del archivo actual
  const isUsed = importMatches.length > 1 || namedMatches.some(match => match.trim() !== fileName);
  
  // Casos especiales - algunos archivos pueden ser usados indirectamente
  const isPotentiallyUsed = 
    fileName.includes('provider') || 
    fileName.includes('theme') || 
    fileName.includes('layout') ||
    fileName.includes('page') ||
    fileName.includes('route') ||
    fileName.includes('util') ||
    fileName.includes('type') ||
    fileName === 'globals' ||
    fileName === 'middleware';
  
  if (!isUsed && !isPotentiallyUsed) {
    console.log(`- ${file}`);
  }
}