import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ContentMetadata {
  title: string;
  description?: string;
  date?: string;
  author?: string;
  image?: string;
}

export interface ContentData {
  content: string;
  metadata: ContentMetadata;
}

export const readContentFile = async (category: string, slug: string): Promise<ContentData> => {
  try {
    // Construct file path
    const filePath = path.join(contentDirectory, category, `${slug}.md`);
    
    // Read the file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Simple frontmatter parsing (if present)
    let content = fileContents;
    let metadata: ContentMetadata = { title: '' };
    
    // Check if there's frontmatter
    if (fileContents.startsWith('---')) {
      const frontmatterEnd = fileContents.indexOf('---', 3);
      if (frontmatterEnd > 0) {
        const frontmatter = fileContents.substring(3, frontmatterEnd).trim();
        content = fileContents.substring(frontmatterEnd + 3).trim();
        
        // Parse frontmatter manually (simplified approach)
        const lines = frontmatter.split('\n');
        lines.forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            const keyTrimmed = key.trim();
            const valueTrimmed = valueParts.join(':').trim().replace(/^["']|["']$/g, ''); // Remove quotes
            (metadata as any)[keyTrimmed] = valueTrimmed;
          }
        });
      }
    }
    
    // If no title in frontmatter, try to extract from first heading
    if (!metadata.title) {
      const headingMatch = content.match(/^#\s+(.+)$/m);
      if (headingMatch) {
        metadata.title = headingMatch[1];
      } else {
        metadata.title = slug.replace(/-/g, ' ');
      }
    }
    
    return { content, metadata };
  } catch (error: any) {
    console.error(`Error reading markdown file ${category}/${slug}.md:`, error);
    throw new Error(`Could not read content: ${error.message}`);
  }
};

export const getAllContentSlugs = (category: string): string[] => {
  try {
    const categoryPath = path.join(contentDirectory, category);

    // Check if directory exists before trying to read it
    if (!fs.existsSync(categoryPath)) {
      console.error(`Content directory does not exist: ${categoryPath}`);
      return [];
    }

    const fileNames = fs.readdirSync(categoryPath);

    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error(`Error reading directory ${category}:`, error);
    return [];
  }
};

export const getAllContentMetadata = async (category: string): Promise<{ slug: string; metadata: ContentMetadata }[]> => {
  const slugs = getAllContentSlugs(category);
  
  const metadataPromises = slugs.map(async (slug) => {
    try {
      const { metadata } = await readContentFile(category, slug);
      return { slug, metadata };
    } catch (error) {
      console.error(`Error getting metadata for ${category}/${slug}:`, error);
      return { slug, metadata: { title: slug.replace(/-/g, ' ') } };
    }
  });

  return Promise.all(metadataPromises);
};