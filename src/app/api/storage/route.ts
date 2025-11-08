import { NextRequest, NextResponse } from 'next/server';
import * as os from 'oci-objectstorage';
import { SimpleAuthenticationDetailsProvider, Region } from "oci-common";

const config = {
  tenancyId: process.env.OCI_TENANCY_ID!,
  userId: process.env.OCI_USER_ID!,
  compartmentId: process.env.OCI_COMPARTMENT_ID!,
  privateKey: process.env.OCI_PRIVATE_KEY!,
  fingerprint: process.env.OCI_FINGERPRINT!,
  region: process.env.OCI_REGION || 'us-ashburn-1',
  namespace: process.env.OCI_NAMESPACE!
};

export async function POST(req: NextRequest) {
  if (!config.tenancyId || !config.userId || !config.compartmentId ||
      !config.privateKey || !config.fingerprint || !config.namespace) {
    return NextResponse.json({ error: 'Faltan variables de entorno para la configuración de Oracle Cloud' }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;

    if (!file || !folder) {
      return NextResponse.json({ error: 'Faltan el archivo o la carpeta' }, { status: 400 });
    }

    const provider = new SimpleAuthenticationDetailsProvider(
      config.tenancyId,
      config.userId,
      config.fingerprint,
      config.privateKey,
      null, // passphrase
      Region.fromRegionId(config.region)
    );

    const client = new os.ObjectStorageClient({ authenticationDetailsProvider: provider });

    const fileName = `${folder}/${Date.now()}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer]);

    const putObjectRequest: os.requests.PutObjectRequest = {
      namespaceName: config.namespace,
      bucketName: process.env.OCI_BUCKET_NAME || 'nuamana-bucket',
      objectName: fileName,
      putObjectBody: blob,
      contentType: file.type || 'application/octet-stream'
    };

    await client.putObject(putObjectRequest);

    const publicUrl = `https://${config.namespace}.compat.objectstorage.${config.region}.oraclecloud.com/n/${config.namespace}/b/${process.env.OCI_BUCKET_NAME || 'nuamana-bucket'}/o/${fileName}`;

    return NextResponse.json({ url: publicUrl, name: fileName });
  } catch (error) {
    console.error('Error uploading file to Oracle Cloud:', error);
    return NextResponse.json({ error: 'Error uploading file to storage' }, { status: 500 });
  }
}