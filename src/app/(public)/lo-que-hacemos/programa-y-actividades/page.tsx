import { Metadata } from 'next';
import MdNavbar from '@/components/md-navbar';
import Image from 'next/image';
import MarkdownRenderer from '@/components/markdown-renderer';
import { readContentFile } from '@/services/content-service';

// Generate metadata for this page
export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await readContentFile('lo-que-hacemos', 'programa-y-actividades');
  return {
    title: `${metadata.title} | Guías y Scouts Nua Mana`,
    description: metadata.description || 'Información sobre Guías y Scouts Nua Mana',
  };
}

export default async function ProgramaYActividadesPage() {
  const { content, metadata } = await readContentFile('lo-que-hacemos', 'programa-y-actividades');

  // Use the image from metadata if available, otherwise default to logo
  const imageSrc = metadata.image || '/images/logos/logo-nuamana.webp';
  const imageAlt = metadata.image ? metadata.title : 'Logo Guías y Scouts Nua Mana';

  return (
    <>
      <MdNavbar currentPage={metadata.title || 'Programa Y Actividades'} />
      <div className="max-w-[1024px] mx-auto w-full"> {/* Ajuste de padding-top para compensar el navbar fijo */}
        <div className="mb-8 flex justify-center">
          <div className="max-w-[360px] w-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={360}
              height={360}
              className="w-full h-auto object-contain rounded-4xl"
              priority
            />
          </div>
        </div>
        <article className="prose prose-lg max-w-none">
          <MarkdownRenderer content={content} />
        </article>
      </div>
    </>
  );
}