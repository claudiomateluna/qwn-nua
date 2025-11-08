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
import { useSearchParams } from 'next/navigation';
import { Participante as ParticipanteType } from '@/types';
import { getAllParticipants, createParticipant, updateParticipant, deleteParticipant } from '@/services/participant-service';

const ParticipantsContent = () => {
  const [participants, setParticipants] = useState<ParticipanteType[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<ParticipanteType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<ParticipanteType | null>(null);

  // Form state for creating/editing participants
  const [formData, setFormData] = useState<Omit<ParticipanteType, 'id' | 'created_at' | 'updated_at'>>({
    acta_id: '',
    usuario_id: '',
    nombre: '',
    email: '',
    rol_en_reunion: 'Asistente',
    asistencia: 'Confirmado'
  });

  const searchParams = useSearchParams();
  const actaId = searchParams.get('actaId');

  useEffect(() => {
    if (actaId) {
      fetchParticipants(actaId);
    }
  }, [actaId]);

  useEffect(() => {
    // Filter participants based on search term
    if (searchTerm) {
      const filtered = participants.filter(participant => 
        participant.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.rol_en_reunion.includes(searchTerm.toLowerCase())
      );
      setFilteredParticipants(filtered);
    } else {
      setFilteredParticipants(participants);
    }
  }, [searchTerm, participants]);

  const fetchParticipants = async (id: string) => {
    try {
      setLoading(true);
      const data = await getAllParticipants(id);
      setParticipants(data);
      setFilteredParticipants(data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingParticipant) {
        // Update existing participant
        await updateParticipant(editingParticipant.id, formData);
      } else {
        // Create new participant
        await createParticipant(formData);
      }
      
      // Reset form and close dialog
      setFormData({
        acta_id: '',
        usuario_id: '',
        nombre: '',
        email: '',
        rol_en_reunion: 'Asistente',
        asistencia: 'Confirmado'
      });
      setEditingParticipant(null);
      // Refresh participant list
      if (actaId) fetchParticipants(actaId);
    } catch (error) {
      console.error('Error saving participant:', error);
    }
  };

  const handleEdit = (participant: ParticipanteType) => {
    setEditingParticipant(participant);
    setFormData({
      acta_id: participant.acta_id,
      usuario_id: participant.usuario_id,
      nombre: participant.nombre || '',
      email: participant.email || '',
      rol_en_reunion: participant.rol_en_reunion,
      asistencia: participant.asistencia || 'Confirmado',
      firma_digital_url: participant.firma_digital_url || ''
    });
    setOpen(true);
  };

  const handleDelete = async (participantId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este participante?')) return;
    
    try {
      await deleteParticipant(participantId);
      
      // Refresh participant list
      if (actaId) fetchParticipants(actaId);
    } catch (error) {
      console.error('Error deleting participant:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Participantes en Actas</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setEditingParticipant(null);
                setFormData({
                  acta_id: '',
                  usuario_id: '',
                  nombre: '',
                  email: '',
                  rol_en_reunion: 'Asistente',
                  asistencia: 'Confirmado'
                });
              }}
            >
              Nuevo Participante
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingParticipant ? 'Editar Participante' : 'Agregar Participante'}</DialogTitle>
              <DialogDescription>
                {editingParticipant 
                  ? 'Modifica los datos del participante en la acta' 
                  : 'Ingresa los datos del participante en la acta'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="usuario_id">ID de Usuario</Label>
                    <Input
                      id="usuario_id"
                      name="usuario_id"
                      value={formData.usuario_id}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rol_en_reunion">Rol en la Reunión</Label>
                    <Select 
                      value={formData.rol_en_reunion} 
                      onValueChange={(value) => handleSelectChange('rol_en_reunion', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Owner">Owner</SelectItem>
                        <SelectItem value="TomadorNotas">Tomador de Notas</SelectItem>
                        <SelectItem value="Asistente">Asistente</SelectItem>
                        <SelectItem value="Invitado">Invitado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="asistencia">Asistencia</Label>
                    <Select 
                      value={formData.asistencia || 'Confirmado'} 
                      onValueChange={(value) => handleSelectChange('asistencia', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Confirmado">Confirmado</SelectItem>
                        <SelectItem value="Presente">Presente</SelectItem>
                        <SelectItem value="Ausente">Ausente</SelectItem>
                        <SelectItem value="Remoto">Remoto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firma_digital_url">URL de Firma Digital</Label>
                  <Input
                    id="firma_digital_url"
                    name="firma_digital_url"
                    type="url"
                    value={formData.firma_digital_url || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingParticipant ? 'Actualizar' : 'Agregar'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Buscar participantes..."
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
                <TableHead>ID de Acta</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol Reunión</TableHead>
                <TableHead>Asistencia</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParticipants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell className="font-medium">{participant.acta_id}</TableCell>
                  <TableCell>{participant.nombre || 'N/A'}</TableCell>
                  <TableCell>{participant.email || 'N/A'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      participant.rol_en_reunion === 'Owner' ? 'bg-red-100 text-red-800' :
                      participant.rol_en_reunion === 'TomadorNotas' ? 'bg-purple-100 text-purple-800' :
                      participant.rol_en_reunion === 'Asistente' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {participant.rol_en_reunion}
                    </span>
                  </TableCell>
                  <TableCell>
                    {participant.asistencia ? (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        participant.asistencia === 'Presente' ? 'bg-green-100 text-green-800' :
                        participant.asistencia === 'Ausente' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {participant.asistencia}
                      </span>
                    ) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(participant)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(participant.id)}
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

      {filteredParticipants.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-500">
          {searchTerm ? 'No se encontraron participantes coincidentes' : 'No hay participantes registrados'}
        </div>
      )}
    </div>
  );
};

export default function ParticipantsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div></div>}>
      <ParticipantsContent />
    </Suspense>
  );
}