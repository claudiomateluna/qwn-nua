import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import MarkdownRenderer from '@/components/markdown-renderer';
import MdNavbar from '@/components/md-navbar';
import { readContentFile, getAllContentMetadata } from '@/services/content-service';

// Generate metadata for this page
export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await readContentFile('acerca-de', 'index');
  return {
    title: `${metadata.title} | Nua Mana - Guías y Scouts`,
    description: metadata.description || 'Información sobre Guías y Scouts Nua Mana',
  };
}

export default async function AcercaDePage() {
  const { content, metadata } = await readContentFile('acerca-de', 'index');
  const allContent = await getAllContentMetadata('acerca-de');

  // Filter out the index page since it's the current page
  const subPages = allContent
    .filter(item => item.slug !== 'index' && item.slug !== 'acerca-de')
    .map(item => ({
      slug: item.slug,
      title: item.metadata.title || item.slug,
      description: item.metadata.description || '',
      image: item.metadata.image || '/images/logos/logo-nuamana.webp'
    }));

  return (
    <>
      <MdNavbar currentPage={metadata.title || 'Acerca de'} />
      <div className="max-w-[1024px] mx-auto w-full">
        <article className="prose prose-lg max-w-none">
          <MarkdownRenderer content={content} />
        </article>

        <section className="mt-12">
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-0 lg:px-0">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base/7 font-semibold text-red-400">Más información sobre nosotros</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl lg:text-balance">Somos una aventura que cambia vidas.</p>
                <p className="mt-6 text-lg/8 text-gray-300">Mira e Infórmate acerca de nuestro grupo, nuestra historia, quienes somos, nuestro equipo de guiadoras y dirigentes, nuestros apoderados, nuestra institución patrocinante y nuestra misión y visión como grupo.</p>
              </div>
              <div className="mx-auto mb-20 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                  {subPages.map((item) => (
                  <Link key={item.slug} href={`/acerca-de/${item.slug}`}>
                  <div className="relative pl-28">
                    <dt className="text-base/7 font-semibold">
                      <div className="absolute top-0 left-0 flex size-25 items-center justify-center rounded-full border border-dashed border-gray-400 bg-gray-100 shadow-md">
                        <Image
                        src={item.image}
                        alt={item.title}
                        width={200}
                        height={200}
                        className="w-full h-auto object-contain"
                        />
                      </div>
                      {item.title}
                    </dt>
                    <dd className="mt-2 text-base/7 text-gray-400">{item.description}</dd>
                  </div>
                  </Link>
                ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}