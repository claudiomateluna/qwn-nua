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
import { Transaction as TransactionType } from '@/types';
import { getAllTransactions, createTransaction, updateTransaction, deleteTransaction } from '@/services/transaction-service';

export default function TreasuryPage() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<TransactionType | null>(null);
  const [viewReport, setViewReport] = useState(false);

  // Form state for creating/editing transactions
  const [formData, setFormData] = useState<Omit<TransactionType, 'id' | 'created_at' | 'updated_at'>>({
    description: '',
    amount: 0,
    type: 'ingreso',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    // Filter transactions based on search term
    if (searchTerm) {
      const filtered = transactions.filter(transaction => 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.type.includes(searchTerm.toLowerCase())
      );
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [searchTerm, transactions]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getAllTransactions();
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingTransaction) {
        // Update existing transaction
        await updateTransaction(editingTransaction.id, formData as Partial<TransactionType>);
      } else {
        // Create new transaction
        await createTransaction(formData);
      }
      
      // Reset form and close dialog
      setFormData({
        description: '',
        amount: 0,
        type: 'ingreso',
        category: '',
        date: new Date().toISOString().split('T')[0]
      });
      setEditingTransaction(null);
      setOpen(false);
      
      // Refresh transaction list
      fetchTransactions();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleEdit = (transaction: TransactionType) => {
    setEditingTransaction(transaction);
    setFormData({
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category || '',
      date: transaction.date.split('T')[0],
      image_url: transaction.image_url
    });
    setOpen(true);
  };

  const handleDelete = async (transactionId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta transacción?')) return;
    
    try {
      await deleteTransaction(transactionId);
      
      // Refresh transaction list
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Calculate financial summary
  const totalIncome = transactions
    .filter(t => t.type === 'ingreso')
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'gasto')
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Tesorería</h1>
        <div className="flex space-x-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => {
                  setEditingTransaction(null);
                  setFormData({
                    description: '',
                    amount: 0,
                    type: 'ingreso',
                    category: '',
                    date: new Date().toISOString().split('T')[0]
                  });
                }}
              >
                Nueva Transacción
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingTransaction ? 'Editar Transacción' : 'Crear Nueva Transacción'}</DialogTitle>
                <DialogDescription>
                  {editingTransaction 
                    ? 'Modifica los datos de la transacción' 
                    : 'Ingresa los datos para crear una nueva transacción'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Input
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Monto</Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo</Label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={(e) => handleSelectChange('type', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="ingreso">Ingreso</option>
                        <option value="gasto">Gasto</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Input
                        id="category"
                        name="category"
                        value={formData.category || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Fecha</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image_url">URL de Comprobante</Label>
                    <Input
                      id="image_url"
                      name="image_url"
                      type="url"
                      value={formData.image_url || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editingTransaction ? 'Actualizar' : 'Crear'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-medium text-green-800">Ingresos</h3>
          <p className="text-2xl font-bold text-green-700">${totalIncome.toLocaleString('es-CL')}</p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-lg font-medium text-red-800">Gastos</h3>
          <p className="text-2xl font-bold text-red-700">${totalExpenses.toLocaleString('es-CL')}</p>
        </div>
        <div className={`p-6 rounded-lg border ${balance >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <h3 className="text-lg font-medium">Balance</h3>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-700' : 'text-yellow-700'}`}>
            ${balance.toLocaleString('es-CL')}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="w-1/3">
          <Input
            placeholder="Buscar transacciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setViewReport(!viewReport)}
        >
          {viewReport ? 'Ocultar Reporte' : 'Ver Reporte'}
        </Button>
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
                <TableHead>Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium max-w-xs truncate">{transaction.description}</TableCell>
                  <TableCell>{transaction.category || 'N/A'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.type === 'ingreso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'ingreso' ? 'Ingreso' : 'Gasto'}
                    </span>
                  </TableCell>
                  <TableCell className={`font-medium ${
                    transaction.type === 'ingreso' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${transaction.amount?.toLocaleString('es-CL')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(transaction)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(transaction.id)}
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

      {filteredTransactions.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-500">
          {searchTerm ? 'No se encontraron transacciones coincidentes' : 'No hay transacciones registradas'}
        </div>
      )}
    </div>
  );
}