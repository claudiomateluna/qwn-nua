// Servicio para manejar el almacenamiento en Oracle Cloud Infrastructure (OCI)
// Este servicio reemplaza cualquier funcionalidad de Supabase Storage

import { 
  ObjectStorageClient, 
  PutObjectRequest, 
  CreateUploadDetails 
} from 'oci-object-storage';

// Configuración del cliente de Oracle Cloud Infrastructure
const config = {
  tenancyId: process.env.NEXT_PUBLIC_OCI_TENANCY_ID!,
  userId: process.env.NEXT_PUBLIC_OCI_USER_ID!,
  compartmentId: process.env.NEXT_PUBLIC_OCI_COMPARTMENT_ID!,
  privateKey: process.env.NEXT_PUBLIC_OCI_PRIVATE_KEY!,
  fingerprint: process.env.NEXT_PUBLIC_OCI_FINGERPRINT!,
  region: process.env.NEXT_PUBLIC_OCI_REGION || 'us-ashburn-1',
  namespace: process.env.NEXT_PUBLIC_OCI_NAMESPACE!
};

/**
 * Sube un archivo a Oracle Cloud Infrastructure Object Storage
 * @param file - Archivo a subir
 * @param folder - Carpeta/contenedor donde subir el archivo
 * @returns URL pública del archivo subido
 */
export async function uploadFileToStorage(file: File, folder: string): Promise<{ url: string; name: string }> {
  // Validar que las variables de entorno estén configuradas
  if (!config.tenancyId || !config.userId || !config.compartmentId || 
      !config.privateKey || !config.fingerprint || !config.namespace) {
    throw new Error('Faltan variables de entorno para la configuración de Oracle Cloud');
  }

  try {
    // Crear el cliente de OCI
    const client = new ObjectStorageClient({
      authenticationDetailsProvider: {
        getTenantId: () => Promise.resolve(config.tenancyId),
        getUserId: () => Promise.resolve(config.userId),
        getKeyId: () => Promise.resolve(`${config.tenancyId}/${config.userId}/${config.fingerprint}`),
        getPrivateKey: () => Promise.resolve(config.privateKey),
        getPassphrase: () => Promise.resolve(''),
      },
      region: config.region
    });

    // Generar nombre único para el archivo
    const fileName = `${folder}/${Date.now()}-${file.name}`;
    
    // Convertir archivo a ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    
    // Preparar la solicitud de subida
    const putObjectRequest: PutObjectRequest = {
      namespaceName: config.namespace,
      bucketName: process.env.NEXT_PUBLIC_OCI_BUCKET_NAME || 'nuamana-bucket', // Usar bucket por defecto si no está definido
      objectName: fileName,
      putObjectBody: blob,
      contentType: file.type || 'application/octet-stream'
    };

    // Subir el archivo
    const response = await client.putObject(putObjectRequest);
    
    // La URL pública del archivo en OCI
    const publicUrl = `https://${config.namespace}.compat.objectstorage.${config.region}.oraclecloud.com/n/${config.namespace}/b/${process.env.NEXT_PUBLIC_OCI_BUCKET_NAME || 'nuamana-bucket'}/o/${fileName}`;

    return {
      url: publicUrl,
      name: fileName
    };
  } catch (error) {
    console.error('Error uploading file to Oracle Cloud:', error);
    throw new Error('Error uploading file to storage');
  }
}

/**
 * Elimina un archivo de Oracle Cloud Infrastructure Object Storage
 * @param fileName - Nombre del archivo a eliminar
 * @param folder - Carpeta donde está ubicado el archivo
 */
export async function deleteFileFromStorage(fileName: string, folder: string): Promise<void> {
  try {
    // Implementar lógica de eliminación si es necesario
    console.log(`Eliminando archivo: ${folder}/${fileName}`);
    // const client = initializeOciClient();
    // await client.deleteObject(...);
  } catch (error) {
    console.error('Error deleting file from Oracle Cloud:', error);
    throw new Error('Error deleting file from storage');
  }
}

/**
 * Genera una URL temporal para descargar un archivo
 * @param fileName - Nombre del archivo
 * @param folder - Carpeta donde está ubicado el archivo
 * @param duration - Duración de la URL en segundos (por defecto 3600 segundos = 1 hora)
 */
export async function getTemporaryDownloadUrl(fileName: string, folder: string, duration: number = 3600): Promise<string> {
  // Para OCI, las URLs públicas son permanentes si el objeto tiene permisos públicos
  // Si se necesitan URLs temporales, se deben usar pre-signed URLs
  return `https://${config.namespace}.compat.objectstorage.${config.region}.oraclecloud.com/n/${config.namespace}/b/${process.env.NEXT_PUBLIC_OCI_BUCKET_NAME || 'nuamana-bucket'}/o/${folder}/${fileName}`;
}