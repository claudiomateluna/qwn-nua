'use client';

import { useState, useEffect } from 'react';
import { User as UserType } from '@/types';
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
import { getAllUsers, createUser, updateUser, deleteUser, searchUsers } from '@/services/user-service';

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);

  // Form state for creating/editing users
  const [formData, setFormData] = useState<Partial<UserType>>({
    first_name: '',
    paternal_last_name: '',
    maternal_last_name: '',
    email: '',
    role: 'apoderado',
    unit: 'Manada'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search term
    if (searchTerm) {
      const filtered = users.filter(user => 
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.paternal_last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingUser) {
        // Update existing user
        await updateUser(editingUser.id, formData);
      } else {
        // Create new user
        await createUser(formData as Omit<UserType, 'id' | 'created_at' | 'updated_at'>);
      }
      
      // Reset form and close dialog
      setFormData({
        first_name: '',
        paternal_last_name: '',
        maternal_last_name: '',
        email: '',
        role: 'apoderado',
        unit: 'Manada'
      });
      setEditingUser(null);
      setOpen(false);
      
      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user: UserType) => {
    setEditingUser(user);
    setFormData({
      id: user.id,
      first_name: user.first_name,
      paternal_last_name: user.paternal_last_name,
      maternal_last_name: user.maternal_last_name,
      email: user.email,
      role: user.role,
      unit: user.unit
    });
    setOpen(true);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;
    
    try {
      await deleteUser(userId);
      
      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setEditingUser(null);
                setFormData({
                  first_name: '',
                  paternal_last_name: '',
                  maternal_last_name: '',
                  email: '',
                  role: 'apoderado',
                  unit: 'Manada'
                });
              }}
            >
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</DialogTitle>
              <DialogDescription>
                {editingUser 
                  ? 'Modifica los datos del usuario' 
                  : 'Ingresa los datos para crear un nuevo usuario'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">Nombre</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paternal_last_name">Apellido Paterno</Label>
                  <Input
                    id="paternal_last_name"
                    name="paternal_last_name"
                    value={formData.paternal_last_name || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maternal_last_name">Apellido Materno</Label>
                  <Input
                    id="maternal_last_name"
                    name="maternal_last_name"
                    value={formData.maternal_last_name || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role || 'apoderado'}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="lobato (a)">Lobato (a)</option>
                    <option value="guia">Guía</option>
                    <option value="scout">Scout</option>
                    <option value="pionera (o)">Pionera (o)</option>
                    <option value="caminante">Caminante</option>
                    <option value="apoderado">Apoderado</option>
                    <option value="presidente">Presidente</option>
                    <option value="tesorera">Tesorera</option>
                    <option value="secretario">Secretario</option>
                    <option value="representante">Representante</option>
                    <option value="dirigente">Dirigente</option>
                    <option value="guiadora">Guiadora</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unidad</Label>
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit || ''}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Ninguna</option>
                    <option value="Manada">Manada</option>
                    <option value="Tropa">Tropa</option>
                    <option value="Compañía">Compañía</option>
                    <option value="Avanzada">Avanzada</option>
                    <option value="Clan">Clan</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingUser ? 'Actualizar' : 'Crear'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Buscar usuarios..."
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
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.first_name} {user.paternal_last_name} {user.maternal_last_name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.unit || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(user.id)}
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

      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-500">
          {searchTerm ? 'No se encontraron usuarios coincidentes' : 'No hay usuarios registrados'}
        </div>
      )}
    </div>
  );
}