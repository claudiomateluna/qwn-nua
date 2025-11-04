'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Article as ArticleType } from '@/types';
import { getAllArticles, createArticle, updateArticle, deleteArticle, searchArticles } from '@/services/article-service';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleType | null>(null);

  // Form state for creating/editing articles
  const [formData, setFormData] = useState<Partial<ArticleType>>({
    title: '',
    content: '',
    category: 'actividades',
    status: 'draft'
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    // Filter articles based on search term
    if (searchTerm) {
      const filtered = articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.includes(searchTerm.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [searchTerm, articles]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await getAllArticles();
      setArticles(data);
      setFilteredArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingArticle) {
        // Update existing article
        await updateArticle(editingArticle.id, formData);
      } else {
        // Create new article
        await createArticle(formData as Omit<ArticleType, 'id' | 'created_at' | 'updated_at'>);
      }
      
      // Reset form and close dialog
      setFormData({
        title: '',
        content: '',
        category: 'actividades',
        status: 'draft'
      });
      setEditingArticle(null);
      setOpen(false);
      
      // Refresh article list
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleEdit = (article: ArticleType) => {
    setEditingArticle(article);
    setFormData({
      id: article.id,
      title: article.title,
      content: article.content,
      category: article.category,
      status: article.status,
      cover_image_url: article.cover_image_url,
      duration_minutes: article.duration_minutes,
      min_participants: article.min_participants,
      priority_participants: article.priority_participants,
      slug: article.slug,
      seo_title: article.seo_title,
      seo_description: article.seo_description
    });
    setOpen(true);
  };

  const handleDelete = async (articleId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este artículo?')) return;
    
    try {
      await deleteArticle(articleId);
      
      // Refresh article list
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Artículos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setEditingArticle(null);
                setFormData({
                  title: '',
                  content: '',
                  category: 'actividades',
                  status: 'draft'
                });
              }}
            >
              Nuevo Artículo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingArticle ? 'Editar Artículo' : 'Crear Nuevo Artículo'}</DialogTitle>
              <DialogDescription>
                {editingArticle 
                  ? 'Modifica los datos del artículo' 
                  : 'Ingresa los datos para crear un nuevo artículo'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Contenido</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content || ''}
                    onChange={handleInputChange}
                    required
                    className="h-40"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category || 'actividades'}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="actividades">Actividades</option>
                      <option value="administrativo">Administrativo</option>
                      <option value="historia">Historia</option>
                      <option value="biografia">Biografía</option>
                      <option value="tecnica">Técnica</option>
                      <option value="reflexion">Reflexión</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Estado</Label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status || 'draft'}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="draft">Borrador</option>
                      <option value="published">Publicado</option>
                      <option value="archived">Archivado</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cover_image_url">URL de Imagen de Portada</Label>
                    <Input
                      id="cover_image_url"
                      name="cover_image_url"
                      type="url"
                      value={formData.cover_image_url || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration_minutes">Duración (minutos)</Label>
                    <Input
                      id="duration_minutes"
                      name="duration_minutes"
                      type="number"
                      value={formData.duration_minutes || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min_participants">Mínimo de Participantes</Label>
                    <Input
                      id="min_participants"
                      name="min_participants"
                      type="number"
                      value={formData.min_participants || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority_participants">Prioridad de Participantes</Label>
                    <select
                      id="priority_participants"
                      name="priority_participants"
                      value={formData.priority_participants || ''}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Seleccione opción</option>
                      <option value="02">2 participantes</option>
                      <option value="04">4 participantes</option>
                      <option value="06">6 participantes</option>
                      <option value="08">8 participantes</option>
                      <option value="10">10 participantes</option>
                      <option value="12">12 participantes</option>
                      <option value="16">16 participantes</option>
                      <option value="24">24 participantes</option>
                      <option value="32">32 participantes</option>
                      <option value="individual">Individual</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo_title">Título SEO</Label>
                  <Input
                    id="seo_title"
                    name="seo_title"
                    value={formData.seo_title || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo_description">Descripción SEO</Label>
                  <Textarea
                    id="seo_description"
                    name="seo_description"
                    value={formData.seo_description || ''}
                    onChange={handleInputChange}
                    className="h-20"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingArticle ? 'Actualizar' : 'Crear'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Buscar artículos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Participantes</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium max-w-xs truncate">{article.title}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      article.status === 'published' ? 'bg-green-100 text-green-800' :
                      article.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {article.status === 'published' ? 'Publicado' : 
                       article.status === 'archived' ? 'Archivado' : 'Borrador'}
                    </span>
                  </TableCell>
                  <TableCell>{article.min_participants || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(article)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(article.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {filteredArticles.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-500">
          {searchTerm ? 'No se encontraron artículos coincidentes' : 'No hay artículos registrados'}
        </div>
      )}
    </div>
  );
}