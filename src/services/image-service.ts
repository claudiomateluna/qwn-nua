// Servicio general para manejar almacenamiento de imágenes
// Actualmente configurado para usar Oracle Cloud Infrastructure

import { oracleStorageService } from './oracle-storage-service';

export interface ImageUploadResult {
  url: string;
  fileName: string;
  size: number;
  type: string;
}

/**
 * Sube una imagen a Oracle Cloud Infrastructure
 * @param imageFile Archivo de imagen a subir
 * @param folder Carpeta virtual donde se almacenará la imagen
 * @returns Resultado con la URL de la imagen subida
 */
export async function uploadImage(imageFile: File, folder: string = 'images'): Promise<ImageUploadResult> {
  // Validar tipo de archivo de imagen
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  
  if (!allowedImageTypes.includes(imageFile.type)) {
    throw new Error(`Tipo de imagen no permitido: ${imageFile.type}`);
  }
  
  // Validar tamaño (máximo 5MB para imágenes)
  const maxSize = 5 * 1024 * 1024; // 5MB en bytes
  if (imageFile.size > maxSize) {
    throw new Error(`La imagen es demasiado grande. Máximo permitido: 5MB`);
  }
  
  // Validar formato usando buffer magic number (simplificado)
  const buffer = await imageFile.arrayBuffer();
  const view = new Uint8Array(buffer);
  
  // Validar cabeceras de archivos de imagen
  const isValidImage = (
    // JPEG
    (view[0] === 0xFF && view[1] === 0xD8 && view[2] === 0xFF) ||
    // PNG
    (view[0] === 0x89 && view[1] === 0x50 && view[2] === 0x4E && view[3] === 0x47) ||
    // GIF
    (view[0] === 0x47 && view[1] === 0x49 && view[2] === 0x46) ||
    // WebP
    (view[0] === 0x52 && view[1] === 0x49 && view[2] === 0x46 && view[3] === 0x46 && 
     view[8] === 0x57 && view[9] === 0x45 && view[10] === 0x42 && view[11] === 0x50) ||
    // SVG
    imageFile.type === 'image/svg+xml'
  );
  
  if (!isValidImage) {
    throw new Error('El archivo no es una imagen válida');
  }
  
  // Generar nombre único para la imagen
  const fileExtension = imageFile.name.split('.').pop()?.toLowerCase() || 'jpg';
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
  
  try {
    // Subir imagen a Oracle Cloud Storage
    const url = await oracleStorageService.uploadFile(imageFile, fileName);
    
    return {
      url,
      fileName,
      size: imageFile.size,
      type: imageFile.type
    };
  } catch (error) {
    console.error('Error al subir imagen a Oracle Cloud Storage:', error);
    throw new Error('No se pudo subir la imagen. Por favor inténtalo de nuevo.');
  }
}

/**
 * Elimina una imagen de Oracle Cloud Infrastructure
 * @param fileName Nombre de la imagen a eliminar (incluyendo la carpeta)
 */
export async function deleteImage(imageName: string): Promise<void> {
  try {
    await oracleStorageService.deleteFile(imageName);
  } catch (error) {
    console.error('Error al eliminar imagen de Oracle Cloud Storage:', error);
    throw new Error('No se pudo eliminar la imagen. Por favor inténtalo de nuevo.');
  }
}

/**
 * Genera una URL temporal para descargar una imagen
 * @param fileName Nombre de la imagen (incluyendo la carpeta)
 * @param expirationTime Tiempo de expiración en segundos (por defecto 1 hora)
 */
export async function getImageDownloadUrl(fileName: string, expirationTime: number = 3600): Promise<string> {
  try {
    return await oracleStorageService.getSignedUrl(fileName, expirationTime);
  } catch (error) {
    console.error('Error al generar URL de descarga de imagen:', error);
    throw new Error('No se pudo generar la URL de descarga de la imagen. Por favor inténtalo de nuevo.');
  }
}

/**
 * Obtiene la URL pública de una imagen en Oracle Cloud
 * @param fileName Nombre del archivo de imagen
 */
export async function getImagePublicUrl(fileName: string): Promise<string> {
  try {
    return await oracleStorageService.getPublicUrl(fileName);
  } catch (error) {
    console.error('Error al obtener URL pública de imagen:', error);
    throw new Error('No se pudo obtener la URL pública de la imagen. Por favor inténtalo de nuevo.');
  }
}