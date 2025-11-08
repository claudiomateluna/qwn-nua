'use client';

import { useState, useEffect, Suspense } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useSearchParams } from 'next/navigation';
import { Accion as AccionType } from '@/types';
import { getAllAcciones, createAccion, updateAccion, deleteAccion } from '@/services/accion-service';

const AccionesContent = () => {
  const [acciones, setAcciones] = useState<AccionType[]>([]);
  const [filteredAcciones, setFilteredAcciones] = useState<AccionType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingAccion, setEditingAccion] = useState<AccionType | null>(null);

  // Form state for creating/editing actions
  const [formData, setFormData] = useState<Omit<AccionType, 'id' | 'created_at' | 'updated_at'>>({
    acta_id: '',
    titulo: '',
    descripcion: '',
    responsable_id: '',
    fecha_compromiso: '',
    prioridad: 'Media',
    estado: 'Abierta'
  });

  const searchParams = useSearchParams();
  const actaId = searchParams.get('actaId');

  useEffect(() => {
    if (actaId) {
      fetchAcciones(actaId);
    }
  }, [actaId]);

  useEffect(() => {
    // Filter acciones based on search term
    if (searchTerm) {
      const filtered = acciones.filter(accion => 
        accion.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        accion.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        accion.estado.includes(searchTerm.toLowerCase())
      );
      setFilteredAcciones(filtered);
    } else {
      setFilteredAcciones(acciones);
    }
  }, [searchTerm, acciones]);

  const fetchAcciones = async (id: string) => {
    try {
      setLoading(true);
      const data = await getAllAcciones(id);
      setAcciones(data);
      setFilteredAcciones(data);
    } catch (error) {
      console.error('Error fetching acciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingAccion) {
        // Update existing action
        await updateAccion(editingAccion.id, formData);
      } else {
        // Create new action
        await createAccion(formData);
      }
      
      // Reset form and close dialog
      setFormData({
        acta_id: '',
        titulo: '',
        descripcion: '',
        responsable_id: '',
        fecha_compromiso: '',
        prioridad: 'Media',
        estado: 'Abierta'
      });
      setEditingAccion(null);
      // Refresh action list
      if (actaId) fetchAcciones(actaId);
    } catch (error) {
      console.error('Error saving action:', error);
    }
  };

  const handleEdit = (accion: AccionType) => {
    setEditingAccion(accion);
    setFormData({
      acta_id: accion.acta_id,
      titulo: accion.titulo,
      descripcion: accion.descripcion || '',
      responsable_id: accion.responsable_id || '',
      fecha_compromiso: accion.fecha_compromiso || '',
      prioridad: accion.prioridad,
      estado: accion.estado,
      evidencia_url: accion.evidencia_url || '',
      dependencias: accion.dependencias || []
    });
    setOpen(true);
  };

  const handleDelete = async (accionId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta acción?')) return;
    
    try {
      await deleteAccion(accionId);
      
      // Refresh action list
      if (actaId) fetchAcciones(actaId);
    } catch (error) {
      console.error('Error deleting action:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Acciones y Compromisos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setEditingAccion(null);
                setFormData({
                  acta_id: '',
                  titulo: '',
                  descripcion: '',
                  responsable_id: '',
                  fecha_compromiso: '',
                  prioridad: 'Media',
                  estado: 'Abierta'
                });
              }}
            >
              Nueva Acción
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{editingAccion ? 'Editar Acción' : 'Crear Nueva Acción'}</DialogTitle>
              <DialogDescription>
                {editingAccion 
                  ? 'Modifica los datos de la acción comprometida' 
                  : 'Ingresa los datos para crear una nueva acción comprometida'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="acta_id">ID de Acta</Label>
                  <Input
                    id="acta_id"
                    name="acta_id"
                    value={formData.acta_id}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion || ''}
                    onChange={handleInputChange}
                    className="h-20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="responsable_id">ID del Responsable</Label>
                    <Input
                      id="responsable_id"
                      name="responsable_id"
                      value={formData.responsable_id || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fecha_compromiso">Fecha Compromiso</Label>
                    <Input
                      id="fecha_compromiso"
                      name="fecha_compromiso"
                      type="date"
                      value={formData.fecha_compromiso || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prioridad">Prioridad</Label>
                    <Select 
                      value={formData.prioridad} 
                      onValueChange={(value) => handleSelectChange('prioridad', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alta">Alta</SelectItem>
                        <SelectItem value="Media">Media</SelectItem>
                        <SelectItem value="Baja">Baja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Select 
                      value={formData.estado} 
                      onValueChange={(value) => handleSelectChange('estado', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Abierta">Abierta</SelectItem>
                        <SelectItem value="En Progreso">En Progreso</SelectItem>
                        <SelectItem value="Bloqueada">Bloqueada</SelectItem>
                        <SelectItem value="Cumplida">Cumplida</SelectItem>
                        <SelectItem value="Vencida">Vencida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evidencia_url">URL de Evidencia</Label>
                  <Input
                    id="evidencia_url"
                    name="evidencia_url"
                    type="url"
                    value={formData.evidencia_url || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dependencias">Dependencias (IDs separadas por coma)</Label>
                  <Input
                    id="dependencias"
                    name="dependencias"
                    value={formData.dependencias?.join(', ') || ''}
                    onChange={(e) => {
                      const deps = e.target.value.split(',').map(d => d.trim()).filter(d => d !== '');
                      setFormData(prev => ({ ...prev, dependencias: deps }));
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingAccion ? 'Actualizar' : 'Crear'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Buscar acciones..."
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
                <TableHead>ID Acta</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Fecha Compromiso</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAcciones.map((accion) => (
                <TableRow key={accion.id}>
                  <TableCell className="font-medium">{accion.acta_id}</TableCell>
                  <TableCell>{accion.titulo}</TableCell>
                  <TableCell>{accion.responsable_id || 'N/A'}</TableCell>
                  <TableCell>{accion.fecha_compromiso ? new Date(accion.fecha_compromiso).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      accion.prioridad === 'Alta' ? 'bg-red-100 text-red-800' :
                      accion.prioridad === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {accion.prioridad}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      accion.estado === 'Cumplida' ? 'bg-green-100 text-green-800' :
                      accion.estado === 'En Progreso' ? 'bg-blue-100 text-blue-800' :
                      accion.estado === 'Bloqueada' ? 'bg-orange-100 text-orange-800' :
                      accion.estado === 'Vencida' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {accion.estado}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(accion)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(accion.id)}
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

      {filteredAcciones.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-500">
          {searchTerm ? 'No se encontraron acciones coincidentes' : 'No hay acciones registradas'}
        </div>
      )}
    </div>
  );
};

export default function AccionesPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div></div>}>
      <AccionesContent />
    </Suspense>
  );
}