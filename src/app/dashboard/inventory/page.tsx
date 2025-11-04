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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InventoryItem as InventoryItemType } from '@/types';
import { getAllInventoryItems, createInventoryItem, updateInventoryItem, deleteInventoryItem } from '@/services/inventory-service';

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<InventoryItemType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItemType | null>(null);

  // Form state for creating/editing items
  const [formData, setFormData] = useState<Partial<InventoryItemType>>({
    name: '',
    description: '',
    quantity: 1,
    status: 'disponible',
    condition_rating: 5
  });

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  useEffect(() => {
    // Filter items based on search term
    if (searchTerm) {
      const filtered = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [searchTerm, items]);

  const fetchInventoryItems = async () => {
    try {
      setLoading(true);
      const data = await getAllInventoryItems();
      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.error('Error fetching inventory items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseInt(value, 10) : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSelectChange = (name: string, value: string) => {
    const val = name === 'quantity' || name === 'condition_rating' ? parseInt(value, 10) : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        // Update existing item
        await updateInventoryItem(editingItem.id, formData);
      } else {
        // Create new item
        await createInventoryItem(formData as Omit<InventoryItemType, 'id' | 'created_at' | 'updated_at'>);
      }
      
      // Reset form and close dialog
      setFormData({
        name: '',
        description: '',
        quantity: 1,
        status: 'disponible',
        condition_rating: 5
      });
      setEditingItem(null);
      setOpen(false);
      
      // Refresh item list
      fetchInventoryItems();
    } catch (error) {
      console.error('Error saving inventory item:', error);
    }
  };

  const handleEdit = (item: InventoryItemType) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      status: item.status,
      person_in_charge_id: item.person_in_charge_id,
      location_id: item.location_id,
      purchase_date: item.purchase_date,
      purchase_cost: item.purchase_cost,
      condition_rating: item.condition_rating,
      image_url: item.image_url
    });
    setOpen(true);
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este ítem de inventario?')) return;
    
    try {
      await deleteInventoryItem(itemId);
      
      // Refresh item list
      fetchInventoryItems();
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Inventario</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setEditingItem(null);
                setFormData({
                  name: '',
                  description: '',
                  quantity: 1,
                  status: 'disponible',
                  condition_rating: 5
                });
              }}
            >
              Nuevo Ítem
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Editar Ítem' : 'Crear Nuevo Ítem'}</DialogTitle>
              <DialogDescription>
                {editingItem 
                  ? 'Modifica los datos del ítem de inventario' 
                  : 'Ingresa los datos para crear un nuevo ítem de inventario'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Cantidad</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity || 1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Estado</Label>
                    <Select 
                      value={formData.status || 'disponible'} 
                      onValueChange={(value) => handleSelectChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disponible">Disponible</SelectItem>
                        <SelectItem value="en_uso">En Uso</SelectItem>
                        <SelectItem value="en_reparacion">En Reparación</SelectItem>
                        <SelectItem value="fuera_de_servicio">Fuera de Servicio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="purchase_date">Fecha de Compra</Label>
                    <Input
                      id="purchase_date"
                      name="purchase_date"
                      type="date"
                      value={formData.purchase_date || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purchase_cost">Costo de Compra</Label>
                    <Input
                      id="purchase_cost"
                      name="purchase_cost"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.purchase_cost || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="condition_rating">Condición (1-5)</Label>
                    <Select 
                      value={formData.condition_rating?.toString() || '5'} 
                      onValueChange={(value) => handleSelectChange('condition_rating', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Pobre</SelectItem>
                        <SelectItem value="2">2 - Regular</SelectItem>
                        <SelectItem value="3">3 - Buena</SelectItem>
                        <SelectItem value="4">4 - Muy Buena</SelectItem>
                        <SelectItem value="5">5 - Excelente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image_url">URL de Imagen</Label>
                    <Input
                      id="image_url"
                      name="image_url"
                      type="url"
                      value={formData.image_url || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingItem ? 'Actualizar' : 'Crear'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Buscar ítems de inventario..."
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
                <TableHead>Descripción</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Condición</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.description || 'N/A'}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'disponible' ? 'bg-green-100 text-green-800' :
                      item.status === 'en_uso' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'en_reparacion' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status === 'disponible' ? 'Disponible' : 
                       item.status === 'en_uso' ? 'En Uso' : 
                       item.status === 'en_reparacion' ? 'En Reparación' : 'Fuera de Servicio'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {'★'.repeat(item.condition_rating || 0)}{'☆'.repeat(5 - (item.condition_rating || 0))}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(item.id)}
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

      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-500">
          {searchTerm ? 'No se encontraron ítems de inventario coincidentes' : 'No hay ítems de inventario registrados'}
        </div>
      )}
    </div>
  );
}