// Servicio general para manejar almacenamiento de archivos
// Actualmente configurado para usar Oracle Cloud Infrastructure

import { oracleStorageService } from './oracle-storage-service';

export interface FileUploadResult {
  url: string;
  fileName: string;
  size: number;
  type: string;
}

/**
 * Servicio para subir archivos a Oracle Cloud Infrastructure
 * @param file Archivo a subir
 * @param folder Carpeta virtual donde se almacenará el archivo
 * @returns Resultado con la URL del archivo subido
 */
export async function uploadFileToStorage(file: File, folder: string = 'uploads'): Promise<FileUploadResult> {
  // Validar tipo de archivo
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Tipo de archivo no permitido: ${file.type}`);
  }
  
  // Validar tamaño (máximo 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB en bytes
  if (file.size > maxSize) {
    throw new Error(`El archivo es demasiado grande. Máximo permitido: 10MB`);
  }
  
  // Generar nombre único para el archivo
  const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
  
  try {
    // Subir archivo a Oracle Cloud Storage
    const url = await oracleStorageService.uploadFile(file, fileName);
    
    return {
      url,
      fileName,
      size: file.size,
      type: file.type
    };
  } catch (error) {
    console.error('Error al subir archivo a Oracle Cloud Storage:', error);
    throw new Error('No se pudo subir el archivo. Por favor inténtalo de nuevo.');
  }
}

/**
 * Elimina un archivo de Oracle Cloud Infrastructure
 * @param fileName Nombre del archivo a eliminar (incluyendo la carpeta)
 */
export async function deleteFileFromStorage(fileName: string): Promise<void> {
  try {
    await oracleStorageService.deleteFile(fileName);
  } catch (error) {
    console.error('Error al eliminar archivo de Oracle Cloud Storage:', error);
    throw new Error('No se pudo eliminar el archivo. Por favor inténtalo de nuevo.');
  }
}

/**
 * Genera una URL temporal para descargar un archivo
 * @param fileName Nombre del archivo (incluyendo la carpeta)
 * @param expirationTime Tiempo de expiración en segundos (por defecto 1 hora)
 */
export async function getDownloadUrl(fileName: string, expirationTime: number = 3600): Promise<string> {
  try {
    return await oracleStorageService.getSignedUrl(fileName, expirationTime);
  } catch (error) {
    console.error('Error al generar URL de descarga:', error);
    throw new Error('No se pudo generar la URL de descarga. Por favor inténtalo de nuevo.');
  }
}