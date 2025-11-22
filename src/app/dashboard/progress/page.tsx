'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/modern-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressGoal, UserProgress } from '@/types';
import { supabase } from '@/services/supabase';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Trophy, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Circle, 
  AlertCircle,
  User as UserIcon
} from 'lucide-react';

export default function ProgressDashboard() {
  const { user, profile } = useAuth();
  const [goals, setGoals] = useState<ProgressGoal[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [view, setView] = useState<'goals' | 'progress'>('goals'); // goals for admin, progress for user

  const isAdmin = profile?.role === 'admin';
  
  // Fetch goals and progress data
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      
      // Fetch goals
      let query = supabase.from('progress_goals').select('*');
      
      if (selectedUnit !== 'all') {
        query = query.eq('unit_level', selectedUnit);
      }
      
      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }
      
      const { data: goalsData, error: goalsError } = await query;
      if (!goalsError && goalsData) {
        setGoals(goalsData as ProgressGoal[]);
      }
      
      // Fetch user progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);
      
      if (!progressError && progressData) {
        setUserProgress(progressData as UserProgress[]);
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, [user, searchTerm, selectedUnit]);

  // Get status icon based on progress status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completado':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'aprobado':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'en_progreso':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  // Calculate progress percentages
  const calculateProgress = (unit: string) => {
    const unitGoals = goals.filter(g => g.unit_level === unit);
    const completedGoals = userProgress.filter(
      up => up.status === 'completado' || up.status === 'aprobado'
    ).map(up => up.goal_id);
    
    return {
      total: unitGoals.length,
      completed: unitGoals.filter(g => completedGoals.includes(g.id)).length
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50] flex items-center gap-2">
            <Trophy className="h-8 w-8 text-[#e74c3c]" />
            Seguimiento de Avance Scout
          </h1>
          <p className="text-[#e74c3c] mt-1">
            Gestiona los objetivos y el progreso de los scouts
          </p>
        </div>
        
        {isAdmin && (
          <Button
            onClick={() => {}}
            className="bg-gradient-to-r from-[#e74c3c] to-[#c0392b] hover:from-[#c0392b] hover:to-[#a12f26]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Objetivo
          </Button>
        )}
      </div>

      {/* Filters for Admin view */}
      {isAdmin && (
        <Card className="bg-white border-[#2c3e50] shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar objetivos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las unidades</SelectItem>
                    <SelectItem value="Manada">Manada</SelectItem>
                    <SelectItem value="Tropa">Tropa</SelectItem>
                    <SelectItem value="Compañía">Compañía</SelectItem>
                    <SelectItem value="Avanzada">Avanzada</SelectItem>
                    <SelectItem value="Clan">Clan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={view === 'goals' ? 'default' : 'outline'}
                  onClick={() => setView('goals')}
                  className={view === 'goals' ? 'bg-[#2c3e50] border-[#2c3e50]' : 'border-[#2c3e50]'}
                >
                  Objetivos
                </Button>
                <Button
                  variant={view === 'progress' ? 'default' : 'outline'}
                  onClick={() => setView('progress')}
                  className={view === 'progress' ? 'bg-[#2c3e50] border-[#2c3e50]' : 'border-[#2c3e50]'}
                >
                  Progreso
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {['Manada', 'Tropa', 'Compañía', 'Avanzada', 'Clan'].map((unit) => {
          const progress = calculateProgress(unit);
          const percentage = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
          
          return (
            <Card 
              key={unit} 
              className="bg-gradient-to-b from-white to-[#fffff0] border-[#2c3e50] shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-[#2c3e50]">{unit}</CardTitle>
                <CardDescription className="text-[#e74c3c]">
                  {progress.completed} de {progress.total} objetivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#2c3e50]">{percentage}%</span>
                  <div className="w-12 h-12 rounded-full bg-[#e74c3c]/10 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-[#e74c3c]" />
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-[#e74c3c] h-2.5 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Goals List or User Progress */}
      <Card className="bg-white border-[#2c3e50] shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-[#2c3e50] flex items-center gap-2">
            {isAdmin ? 'Objetivos de Avance' : 'Mi Progreso'}
          </CardTitle>
          <CardDescription>
            {isAdmin 
              ? 'Lista de objetivos para el desarrollo scout' 
              : 'Tu progreso en los objetivos scouts'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron objetivos</p>
              {isAdmin && (
                <p className="text-gray-400 text-sm mt-2">Agrega nuevos objetivos para comenzar</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => {
                const progressEntry = userProgress.find(up => up.goal_id === goal.id);
                return (
                  <Card 
                    key={goal.id} 
                    className="p-4 border-[#2c3e50]/30 hover:border-[#2c3e50] transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-[#2c3e50]">{goal.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-[#2c3e50]/10 text-[#2c3e50] px-2 py-1 rounded">
                            {goal.unit_level || 'Todos'}
                          </span>
                          <span className="text-xs bg-[#e74c3c]/10 text-[#e74c3c] px-2 py-1 rounded">
                            {goal.area || 'General'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {progressEntry ? (
                          <div className="flex items-center gap-2">
                            {getStatusIcon(progressEntry.status)}
                            <span className="capitalize text-sm">
                              {progressEntry.status === 'en_progreso' ? 'En progreso' : 
                               progressEntry.status === 'completado' ? 'Completado' : 
                               'Aprobado'}
                            </span>
                          </div>
                        ) : !isAdmin ? (
                          <Button size="sm" className="bg-[#2c3e50] hover:bg-[#1a252f]">
                            <Circle className="h-4 w-4 mr-1" />
                            Iniciar
                          </Button>
                        ) : (
                          <span className="text-gray-400 text-sm">Sin progreso</span>
                        )}
                        
                        {isAdmin && (
                          <div className="flex gap-2 ml-2">
                            <Button variant="ghost" size="sm" className="p-2">
                              <Edit className="h-4 w-4 text-[#2c3e50]" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-2 text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {progressEntry && progressEntry.notes && (
                      <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        <p className="font-medium">Notas:</p>
                        <p>{progressEntry.notes}</p>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}