'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card } from '@/components/ui/card';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = ({ content, className = '' }: MarkdownRendererProps) => {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-[var(--clr4)]" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-[var(--clr4)]" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-[var(--clr4)]" {...props} />,
          h4: ({ node, ...props }) => <h4 className="text-lg font-bold text-[var(--clr4)]" {...props} />,
          h5: ({ node, ...props }) => <h5 className="text-base font-bold text-[var(--clr4)]" {...props} />,
          h6: ({ node, ...props }) => <h6 className="text-sm font-bold text-[var(--clr4)]" {...props} />,
          p: ({ node, ...props }) => <p className="text-[var(--clr3)] mb-4 leading-relaxed" {...props} />,
          a: ({ node, ...props }) => <a className="text-[var(--clr7)] hover:text-[var(--clr8)] underline" {...props} />,
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside text-[var(--clr3)] mb-4 space-y-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside text-[var(--clr3)] mb-4 space-y-2" {...props} />
          ),
          li: ({ node, ...props }) => <li className="ml-4" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote 
              className="border-l-4 border-[var(--clr7)] pl-6 my-6 italic bg-[var(--clr8)]/[0.05] p-4 rounded-r-lg" 
              {...props} 
            />
          ),
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                style={vscDarkPlus as any}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code
                className="bg-[var(--clr1)]/[0.3] text-[var(--clr7)] px-2 py-1 rounded-md text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          img: (props) => {
            // Extraer el atributo de estilo del props
            const styleString = props['style'] || '';
            const hasFloatRight = typeof styleString === 'string' &&
              (styleString.includes('float: right') || styleString.includes('float:right'));
            const hasFloatLeft = typeof styleString === 'string' &&
              (styleString.includes('float: left') || styleString.includes('float:left'));

            // Determinar clase CSS basada en el float
            let floatClass = 'max-w-full h-auto rounded-lg border border-[var(--clr4)]/20 my-4';
            if (hasFloatRight) {
              floatClass += ' float-right ml-4';
            } else if (hasFloatLeft) {
              floatClass += ' float-left mr-4';
            }

            // Separar props para evitar conflictos con className
            const { style, ...otherProps } = props;

            return (
              <img
                className={floatClass}
                style={typeof style === 'object' ? style : undefined}
                {...otherProps}
              />
            );
          },
          span: (props) => {
            // Separar props para evitar conflictos con className
            const { style, className, className: classProp, ...otherProps } = props;

            // Combinar className y class (si ambos están presentes)
            let combinedClassName = className || '';
            if (classProp && typeof classProp === 'string') {
              combinedClassName = combinedClassName ? `${combinedClassName} ${classProp}` : classProp;
            }

            return (
              <span
                className={combinedClassName}
                style={typeof style === 'object' ? style : undefined}
                {...otherProps}
              />
            );
          },
          strong: ({ node, ...props }) => <strong className="font-bold text-[var(--clr4)]" {...props} />,
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          hr: ({ node, ...props }) => <hr className="border-t border-[var(--clr4)]/30 my-8" {...props} />,
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse border border-[var(--clr4)]/30" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th 
              className="border border-[var(--clr4)]/30 px-4 py-2 bg-[var(--clr4)]/[0.1] font-semibold text-[var(--clr4)]" 
              {...props} 
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-[var(--clr4)]/30 px-4 py-2 text-[var(--clr3)]" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;