'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/modern-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/services/supabase';
import { User } from '@/types';

export default function CompleteProfile() {
  const [step, setStep] = useState(1); // Multi-step: 1-25
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rut, setRut] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [commune, setCommune] = useState('');
  const [sex, setSex] = useState('');
  const [religion, setReligion] = useState('');
  const [scoutGroup, setScoutGroup] = useState('');
  const [scoutUnit, setScoutUnit] = useState('');
  const [school, setSchool] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState([{ name: '', relationship: '', phone: '' }]);
  const [healthSystem, setHealthSystem] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [medicalTreatments, setMedicalTreatments] = useState('');
  const [medications, setMedications] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [photoAuthorization, setPhotoAuthorization] = useState('');
  const [publicFaith, setPublicFaith] = useState('');
  const [error, setError] = useState('');
  const [isCompleting, setIsCompleting] = useState(false); // Loading state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  // Cargar datos del usuario actual
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
      } else {
        // Si no hay sesión, redirigir al login
        router.push('/auth/login');
      }
    };
    
    fetchUserData();
  }, [router]);

  // Funciones auxiliares para manejar los arrays
  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: '', relationship: '', phone: '' }]);
  };

  const updateEmergencyContact = (index: number, field: string, value: string) => {
    const newContacts = [...emergencyContacts];
    (newContacts[index] as any)[field] = value;
    setEmergencyContacts(newContacts);
  };

  const removeEmergencyContact = (index: number) => {
    if (emergencyContacts.length > 1) {
      const newContacts = [...emergencyContacts];
      newContacts.splice(index, 1);
      setEmergencyContacts(newContacts);
    }
  };

  const toggleDietaryRestriction = (restriction: string) => {
    if (dietaryRestrictions.includes(restriction)) {
      setDietaryRestrictions(dietaryRestrictions.filter(item => item !== restriction));
    } else {
      setDietaryRestrictions([...dietaryRestrictions, restriction]);
    }
  };

  // Función para contar el número total de pasos
  const getTotalSteps = () => 16; // Reducir a los pasos requeridos para completar perfil

  // Validaciones
  const validateStep1 = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Por favor ingresa tu nombre y apellido');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!rut.trim()) {
      setError('Por favor ingresa tu RUT');
      return false;
    }

    // Validar RUT (función auxiliar que verificamos que existe en signup)
    if (!validateRut(rut)) {
      setError('RUT inválido');
      return false;
    }

    return true;
  };

  // Función para validar Chilean RUT
  const validateRut = (rut: string) => {
    // Remove dots and spaces, convert to uppercase
    const cleanRut = rut.replace(/\./g, '').replace(/\s/g, '').toUpperCase();

    // Check format: 7 or 8 digits, a dash, and a verifier digit (number or K)
    const rutPattern = /^\d{7,8}-[\dK]$/;
    if (!rutPattern.test(cleanRut)) {
      return false;
    }

    // Split the RUT into number and verifier
    const [number, verifier] = cleanRut.split('-');

    // Calculate the expected verifier digit
    let sum = 0;
    let multiplier = 2;

    // Multiply digits from right to left by the sequence 2,3,4,5,6,7,2,3...
    for (let i = number.length - 1; i >= 0; i--) {
      sum += parseInt(number[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const remainder = sum % 11;
    const expectedVerifier = 11 - remainder;

    let calculatedVerifier: string;
    if (expectedVerifier === 10) {
      calculatedVerifier = 'K';
    } else if (expectedVerifier === 11) {
      calculatedVerifier = '0';
    } else {
      calculatedVerifier = expectedVerifier.toString();
    }

    return verifier === calculatedVerifier;
  };

  const validateStep3 = () => {
    if (!phone.trim()) {
      setError('Por favor ingresa un número de teléfono');
      return false;
    }

    // Validar que el teléfono tiene 9 dígitos
    if (phone.length !== 9) {
      setError('El número de teléfono debe tener 9 dígitos');
      return false;
    }

    // Validar que solo contiene dígitos
    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setError('El número de teléfono debe contener solo dígitos');
      return false;
    }

    return true;
  };

  const validateStep4 = () => {
    if (!birthDate.trim()) {
      setError('Por favor selecciona tu fecha de nacimiento');
      return false;
    }

    // Validar que la fecha no sea futura
    const today = new Date();
    const selectedDate = new Date(birthDate);
    if (selectedDate > today) {
      setError('La fecha de nacimiento no puede ser futura');
      return false;
    }

    return true;
  };

  const validateStep5 = () => {
    if (!address.trim() || !commune.trim()) {
      setError('Por favor ingresa la dirección y selecciona una comuna');
      return false;
    }

    return true;
  };

  const validateStep6 = () => {
    if (!sex.trim()) {
      setError('Por favor selecciona tu sexo');
      return false;
    }

    return true;
  };

  const validateStep7 = () => {
    if (!religion.trim()) {
      setError('Por favor selecciona tu religión');
      return false;
    }

    return true;
  };

  const validateStep8 = () => {
    if (!scoutGroup.trim() || !scoutUnit.trim()) {
      setError('Por favor selecciona el grupo y la unidad scout');
      return false;
    }

    return true;
  };

  const validateStep9 = () => {
    if (!school.trim() || !educationLevel.trim()) {
      setError('Por favor selecciona el colegio y nivel educacional');
      return false;
    }

    return true;
  };

  const validateStep10 = () => {
    if (!guardianName.trim()) {
      setError('Por favor completa la información del apoderado');
      return false;
    }

    return true;
  };

  const validateStep11 = () => {
    // Validar que haya al menos un contacto de emergencia
    if (emergencyContacts.length === 0 || emergencyContacts.some(contact => !contact.name.trim() || !contact.relationship.trim() || !contact.phone.trim())) {
      setError('Por favor completa la información de al menos un contacto de emergencia');
      return false;
    }

    return true;
  };

  const validateStep12 = () => {
    if (!healthSystem.trim()) {
      setError('Por favor selecciona tu sistema de salud');
      return false;
    }

    return true;
  };

  const validateStep13 = () => {
    if (!bloodType.trim()) {
      setError('Por favor selecciona tu tipo de sangre');
      return false;
    }

    return true;
  };

  const validateStep14 = () => {
    if (!allergies.trim()) {
      setError('Por favor indica si tienes alergias o escribe "Ninguna"');
      return false;
    }

    return true;
  };

  const validateStep15 = () => {
    if (!medicalHistory.trim()) {
      setError('Por favor indica si tienes antecedentes médicos o escribe "Ninguno"');
      return false;
    }

    return true;
  };

  const validateStep16 = () => {
    if (dietaryRestrictions.length === 0) {
      setError('Por favor selecciona al menos una opción de dieta alimentaria');
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    setError('');
    let shouldProceed = false;

    // Validar el paso actual
    switch (step) {
      case 1:
        shouldProceed = validateStep1();
        break;
      case 2:
        shouldProceed = validateStep2();
        break;
      case 3:
        shouldProceed = validateStep3();
        break;
      case 4:
        shouldProceed = validateStep4();
        break;
      case 5:
        shouldProceed = validateStep5();
        break;
      case 6:
        shouldProceed = validateStep6();
        break;
      case 7:
        shouldProceed = validateStep7();
        break;
      case 8:
        shouldProceed = validateStep8();
        break;
      case 9:
        shouldProceed = validateStep9();
        break;
      case 10:
        shouldProceed = validateStep10();
        break;
      case 11:
        shouldProceed = validateStep11();
        break;
      case 12:
        shouldProceed = validateStep12();
        break;
      case 13:
        shouldProceed = validateStep13();
        break;
      case 14:
        shouldProceed = validateStep14();
        break;
      case 15:
        shouldProceed = validateStep15();
        break;
      case 16:
        shouldProceed = validateStep16();
        if (shouldProceed) {
          handleCompleteProfile();
        }
        break;
    }

    if (shouldProceed && step < 16) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(''); // Clear error when going back
    }
  };

  // Function to handle Enter key press in input fields
  const handleKeyDown = (e: React.KeyboardEvent, nextAction?: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextAction) {
        nextAction();
      }
    }
  };

  const handleCompleteProfile = async () => {
    setIsCompleting(true); // Set loading state
    setError(''); // Clear previous errors

    try {
      // Obtener el ID y email del usuario actual
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('No se pudo obtener la información del usuario');
        setIsCompleting(false);
        return;
      }

      // Llamar a la API para crear el perfil de usuario
      const profileResponse = await fetch('/api/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          firstName,
          paternalLastName: lastName,
          maternalLastName: '',
          rut,
          role: 'lobato (a)',  // Role por defecto para este caso
          birth_date: birthDate,
          gender: sex,
          phone_number: phone,
          address,
          commune,
          unit: scoutUnit,
          religious_preference: religion,
          school,
          field_of_study: educationLevel,
          health_system: healthSystem,
          blood_type: bloodType,
          dietary_needs: dietaryRestrictions.join(', '),
          allergies,
          medical_history: medicalHistory,
          current_treatments: medicalTreatments,
          medication_use: medications,
          emergency_contacts: emergencyContacts,
          scout_group: scoutGroup,
          photo_authorization: photoAuthorization,
          public_faith_data: publicFaith === 'Sí'
        }),
      });

      const profileResult = await profileResponse.json();

      if (profileResponse.ok) {
        console.log('Perfil completado exitosamente');
        router.push('/dashboard');
        router.refresh();
      } else {
        console.error("Profile completion error:", profileResult.error);
        setError(profileResult.error || 'Error al completar el perfil de usuario');
      }
    } catch (err: any) {
      setError(err.message || 'Error al completar perfil');
      setIsCompleting(false);
    } finally {
      setIsCompleting(false);
    }
  };

  // Form steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Información Personal</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nombre *</Label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      placeholder="Tu nombre"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, handleNextStep)}
                      className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lastName">Apellido *</Label>
                  <div className="relative">
                    <Input
                      id="lastName"
                      placeholder="Tu apellido"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, handleNextStep)}
                      className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">RUT</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="rut">RUT *</Label>
                <div className="relative">
                  <Input
                    id="rut"
                    placeholder="12.345.678-9"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, handleNextStep)}
                    className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Teléfono</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Teléfono *</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    placeholder="9 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, handleNextStep)}
                    className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Fecha de Nacimiento</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Dirección</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Dirección *</Label>
                <div className="relative">
                  <Input
                    id="address"
                    placeholder="Calle, número, departamento"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, handleNextStep)}
                    className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="commune">Comuna *</Label>
                <div className="relative">
                  <Input
                    id="commune"
                    placeholder="Comuna"
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, handleNextStep)}
                    className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Sexo</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['masculino', 'femenino', 'otro'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`p-3 border rounded-xl h-12 ${
                      sex === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSex(option)}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Religión</h2>
            <div className="space-y-2">
              {[
                'No Aplica', 'No conocido', 'No especifica', 'No tiene', 'Agnóstico (a)', 'Católico (a)', 
                'Evangélico (a)', 'Protestante', 'Judío (a)', 'Bautista', 'Santos de los Úsimo Errázuriz', 
                'Budista', 'Cristiana', 'Luterana', 'Creyente', 'Anglicana', 'Adventista', 'Metodista', 
                'Ortodoxo', 'Islam', 'Are Krishna', 'Musulman', 'Bahai', 'Rastafari', 'Deísta', 
                'Hinduista', 'Sijes', 'Taoista', 'Sintoísta', 'Jainista', 'Confusiano (a)', 
                'Zoroastriano (a)', 'Sunita', 'Chiita', 'Vedista', 'Brahmanista', 'Wicca', 
                'Druida', 'Ásatrú', 'Otra'
              ].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`w-full p-3 border rounded-xl text-left ${
                    religion === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setReligion(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Información Scout</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="scoutGroup">Grupo Scout</Label>
                <div className="relative">
                  <Input
                    id="scoutGroup"
                    placeholder="Grupo"
                    value={scoutGroup}
                    onChange={(e) => setScoutGroup(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, handleNextStep)}
                    className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="scoutUnit">Unidad Scout</Label>
                <select
                  id="scoutUnit"
                  value={scoutUnit}
                  onChange={(e) => setScoutUnit(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona una unidad</option>
                  <option value="Manada">Manada</option>
                  <option value="Tropa">Tropa</option>
                  <option value="Compañía">Compañía</option>
                  <option value="Avanzada">Avanzada</option>
                  <option value="Clan">Clan</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Información Escolar</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="school">Colegio</Label>
                <select
                  id="school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona un colegio</option>
                  <option value="Colegio Los Navíos">Colegio Los Navíos</option>
                  <option value="Colegio Alma Mater">Colegio Alma Mater</option>
                  <option value="Colegio Arzobispo Crescente Errázuriz">Colegio Arzobispo Crescente Errázuriz</option>
                  <option value="Colegio Bahía Darwin">Colegio Bahía Darwin</option>
                  <option value="Colegio Christian Garden">Colegio Christian Garden</option>
                  <option value="Colegio Cardenal José María Caro">Colegio Cardenal José María Caro</option>
                  <option value="Colegio Los Pensamientos">Colegio Los Pensamientos</option>
                  <option value="Colegio Maria Elena">Colegio Maria Elena</option>
                  <option value="Colegio Poeta Neruda">Colegio Poeta Neruda</option>
                  <option value="Colegio Polivalente Jorge Huneeus Zegers">Colegio Polivalente Jorge Huneeus Zegers</option>
                  <option value="Colegio San Alberto Magno">Colegio San Alberto Magno</option>
                  <option value="Colegio San Marcelo">Colegio San Marcelo</option>
                  <option value="Colegio Santo Tomás">Colegio Santo Tomás</option>
                  <option value="Colegio Técnico Profesional Aprender">Colegio Técnico Profesional Aprender</option>
                  <option value="Escuela Básica Profesora Aurelia Rojas Burgos">Escuela Básica Profesora Aurelia Rojas Burgos</option>
                  <option value="Escuela Benjamín Subercaseaux">Escuela Benjamín Subercaseaux</option>
                  <option value="Liceo Bicentenario Nuestra Señora de Guadalupe">Liceo Bicentenario Nuestra Señora de Guadalupe</option>
                  <option value="Liceo Técnico Profesional Patricio Aylwin Azocar">Liceo Técnico Profesional Patricio Aylwin Azocar</option>
                  <option value="Saint Christian College">Saint Christian College</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <Label htmlFor="educationLevel">Nivel Educativo</Label>
                <select
                  id="educationLevel"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona nivel</option>
                  <option value="básica">Básica</option>
                  <option value="media">Media</option>
                  <option value="superior">Superior</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Información del Apoderado</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="guardianName">Nombre del Apoderado</Label>
                <div className="relative">
                  <Input
                    id="guardianName"
                    placeholder="Nombre del apoderado"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, handleNextStep)}
                    className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 11:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Contactos de Emergencia</h2>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="border p-3 rounded-lg">
                  <h3 className="font-medium mb-2">Contacto {index + 1}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <Label>Nombre</Label>
                      <Input
                        placeholder="Nombre"
                        value={contact.name}
                        onChange={(e) => updateEmergencyContact(index, 'name', e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div>
                      <Label>Relación</Label>
                      <Input
                        placeholder="Relación"
                        value={contact.relationship}
                        onChange={(e) => updateEmergencyContact(index, 'relationship', e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div>
                      <Label>Teléfono</Label>
                      <Input
                        placeholder="Teléfono"
                        value={contact.phone}
                        onChange={(e) => updateEmergencyContact(index, 'phone', e.target.value)}
                        className="h-10"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex space-x-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addEmergencyContact}
                >
                  + Agregar Contacto
                </Button>
                {emergencyContacts.length > 1 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => removeEmergencyContact(emergencyContacts.length - 1)}
                  >
                    - Eliminar Último
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      case 12:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Sistema de Salud</h2>
            <div className="space-y-2">
              {['FONASA', 'Isapre', 'Fuerzas Armadas', 'Particular'].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`w-full p-3 border rounded-xl text-left ${
                    healthSystem === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setHealthSystem(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case 13:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Tipo de Sangre</h2>
            <div className="space-y-2">
              {['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-', 'No Sabe'].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`w-full p-3 border rounded-xl text-left ${
                    bloodType === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setBloodType(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case 14:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Alergias</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="allergies">Alergias</Label>
                <textarea
                  id="allergies"
                  placeholder="Especifica si tienes alergias o escribe 'Ninguna'"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl h-24 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );
      case 15:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Antecedentes Médicos</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="medicalHistory">Antecedentes Médicos</Label>
                <textarea
                  id="medicalHistory"
                  placeholder="Especifica tu historia médica o escribe 'Ninguno'"
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl h-24 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );
      case 16:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Restricciones Dietéticas</h2>
            <div className="space-y-4">
              {[
                'Menú general', 'Menú vegetariano', 'Menú vegano', 
                'Menú celíaco', 'Intolerante a la lactosa'
              ].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`restriction-${option}`}
                    checked={dietaryRestrictions.includes(option)}
                    onChange={() => toggleDietaryRestriction(option)}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <Label htmlFor={`restriction-${option}`} className="ml-2">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-[95vh] bg-white">
      {/* Back Arrow */}
      <div className="p-4">
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-[--clr5] hover:text-[--clr7] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Inicio</span>
        </button>
      </div>

      {/* Centered Content */}
      <div className="flex items-center justify-center flex-grow p-2 w-full">
        <div className="w-full max-w-2xl">
          <Card className="rounded-3xl overflow-hidden border-0 w-full">
            <div className="bg-gradient-to-br from-[--clr7] to-[--clr5] p-4 sm:p-4 text-center text-white">
              <div className="mx-auto bg-[--clr6]/40 hover:bg-[--clr6]/80 backdrop-blur-sm w-20 h-20 sm:w-18 sm:h-18 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <img
                  src="/images/logos/LogoColor.svg"
                  alt="Nua Mana Logo"
                  className="h-18 w-18 sm:h-16 sm:w-16 object-contain"
                />
              </div>

              <h1 className="text-lg sm:text-xl md:text-2xl font-bold">¡Completa tu Perfil!</h1>
              <p className="mt-1 sm:mt-2 opacity-80 text-sm">Paso {step} de {getTotalSteps()}</p>
            </div>

            <CardContent className="p-2 sm:p-2">
              {/* Progress bar */}
              <div className="mb-4 sm:mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(step / getTotalSteps()) * 100}%`,
                      background: 'linear-gradient(to right, var(--clr5), var(--clr7))'
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="min-h-[400px]">
                {renderStep()}
              </div>

              <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl mt-4">
                <p className="text-sm text-center">
                  Completa tu perfil para tener acceso completo a la plataforma.<br />
                  * Campos obligatorios
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center mt-4">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  type="button"
                  className="w-full sm:w-auto flex-1"
                  size="lg"
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={step <= 1}
                >
                  Volver
                </Button>
                <Button
                  type="button"
                  className="w-full sm:w-auto flex-1"
                  style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                  size="lg"
                  onClick={handleNextStep}
                  disabled={isCompleting}
                >
                  {isCompleting ? 'Guardando...' : step === getTotalSteps() ? 'Completar Perfil' : 'Siguiente'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}