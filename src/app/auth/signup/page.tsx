'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/modern-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { User } from '@/types';
import { supabase } from '@/services/supabase';
import { UserPlus, Mail, Lock, User as UserIcon, ArrowLeft, ArrowRight } from 'lucide-react';

export default function SignUp() {
  const [step, setStep] = useState(1); // Multi-step: 1-25
  const [authPassword, setAuthPassword] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rut, setRut] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [commune, setCommune] = useState('');
  const [sex, setSex] = useState('');
  const [religion, setReligion] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [scoutGroup, setScoutGroup] = useState('');
  const [scoutUnit, setScoutUnit] = useState('');
  const [school, setSchool] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [pupils, setPupils] = useState([{ name: '', relationship: '', unit: '' }]);
  const [emergencyContacts, setEmergencyContacts] = useState([{ name: '', relationship: '', phone: '' }]);
  const [healthSystem, setHealthSystem] = useState('');
  const [isapreDetail, setIsapreDetail] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [medicalTreatments, setMedicalTreatments] = useState('');
  const [medications, setMedications] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [photoAuthorization, setPhotoAuthorization] = useState('');
  const [publicFaith, setPublicFaith] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Loading state for final registration
  const router = useRouter();
  const { signup } = useAuth();

  // Efecto para manejar cambios de rol y saltar pasos no aplicables
  useEffect(() => {
    if (step >= 2 && role) { // Si ya se seleccionó un rol
      // Verificar si el paso actual es aplicable con el rol seleccionado
      if (!isStepApplicable(step, role)) {
        // Si el paso actual no es aplicable, encontrar el siguiente paso aplicable
        const nextApplicableStep = findNextApplicableStep(step, role);
        if (nextApplicableStep !== step) {
          setStep(nextApplicableStep);
        }
      }
    }
  }, [role, step]);

  // Funciones auxiliares para manejar los arrays
  const addPupil = () => {
    setPupils([...pupils, { name: '', relationship: '', unit: '' }]);
  };

  const updatePupil = (index: number, field: string, value: string) => {
    const newPupils = [...pupils];
    (newPupils[index] as any)[field] = value;
    setPupils(newPupils);
  };

  const removePupil = (index: number) => {
    if (pupils.length > 1) {
      const newPupils = [...pupils];
      newPupils.splice(index, 1);
      setPupils(newPupils);
    }
  };

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

  const validateStep1 = () => {
    if (authPassword !== '2005') {
      setError('Contraseña de registro incorrecta');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!role) {
      setError('Por favor selecciona un rol');
      return false;
    }
    return true;
  };

  // Función para determinar si un paso es aplicable según el rol seleccionado
  const isStepApplicable = (stepNumber: number, currentRole: string) => {
    switch(stepNumber) {
      case 1: // Contraseña de autorización - siempre aplicable
        return true;
      case 2: // Selección de rol - siempre aplicable
        return true;
      case 3: // Nombre y apellido - siempre aplicable
        return true;
      case 4: // RUT - siempre aplicable
        return true;
      case 5: // Teléfono - siempre aplicable
        return true;
      case 6: // Fecha de nacimiento - siempre aplicable
        return true;
      case 7: // Email personal - siempre aplicable
        return true;
      case 8: // Dirección y comuna - siempre aplicable
        return true;
      case 9: // Sexo - siempre aplicable
        return true;
      case 10: // Religión - siempre aplicable
        return true;
      case 11: // Información Scout
        return currentRole !== 'apoderado';
      case 12: // Información Escolar
        return currentRole !== 'apoderado' && currentRole !== 'dirigente' && currentRole !== 'admin';
      case 13: // Información del Apoderado
        return currentRole !== 'apoderado' && currentRole !== 'dirigente' && currentRole !== 'admin';
      case 14: // Información de Pupilos
        return currentRole === 'apoderado' || currentRole === 'dirigente';
      case 15: // Contactos de Emergencia
        return currentRole !== 'apoderado';
      case 16: // Sistema de Salud
        return currentRole !== 'apoderado';
      case 17: // Tipo de Sangre
        return currentRole !== 'apoderado';
      case 18: // Alergias
        return currentRole !== 'apoderado';
      case 19: // Antecedentes Médicos
        return currentRole !== 'apoderado';
      case 20: // Tratamientos Médicos
        return currentRole !== 'apoderado';
      case 21: // Medicamentos
        return currentRole !== 'apoderado';
      case 22: // Restricciones Dietéticas
        return currentRole !== 'apoderado';
      case 23: // Autorización de Fotografías - siempre aplicable
        return true;
      case 24: // Fe Pública - siempre aplicable
        return true;
      case 25: // Contraseña de Cuenta - siempre aplicable
        return true;
      default:
        return false;
    }
  };

  // Función para encontrar el siguiente paso aplicable
  const findNextApplicableStep = (currentStep: number, currentRole: string) => {
    for (let step = currentStep + 1; step <= 25; step++) {
      if (isStepApplicable(step, currentRole)) {
        return step;
      }
    }
    return 25; // Si no hay más pasos aplicables, ir al último
  };

  // Función para encontrar el paso anterior aplicable
  const findPrevApplicableStep = (currentStep: number, currentRole: string) => {
    for (let step = currentStep - 1; step >= 1; step--) {
      if (isStepApplicable(step, currentRole)) {
        return step;
      }
    }
    return 1; // Si no hay pasos anteriores aplicables, ir al primero
  };

  // Función para contar el número total de pasos aplicables para un rol
  const getTotalStepsForRole = (currentRole: string) => {
    let count = 0;
    for (let i = 1; i <= 25; i++) {
      if (isStepApplicable(i, currentRole)) {
        count++;
      }
    }
    return count;
  };

  // Function to validate Chilean RUT
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

  // Function to format RUT input as user types
  const formatRut = (value: string) => {
    // Remove all non-alphanumeric characters
    let cleanValue = value.replace(/[^0-9Kk]/g, '').toUpperCase();

    // If it's longer than 8 digits, truncate to 8 + verifier (max 9 characters)
    if (cleanValue.length > 9) {
      cleanValue = cleanValue.substring(0, 9);
    }

    // If it's 8 or 9 characters, add the dash before the last character (the verifier)
    if (cleanValue.length > 7) {
      return cleanValue.substring(0, cleanValue.length - 1) + '-' + cleanValue.charAt(cleanValue.length - 1);
    }

    // If it's 7 or fewer characters, just return as is
    return cleanValue;
  };

  // Function to format phone number as user types
  const formatPhoneInput = (value: string) => {
    // Remove all non-digit characters from the input
    const cleanValue = value.replace(/\D/g, '');

    // Limit to 9 digits for Chilean mobile numbers
    const truncatedValue = cleanValue.substring(0, 9);

    // Format as "9 9999 9999" pattern
    let formattedValue = '';

    if (truncatedValue.length > 0) {
      formattedValue += truncatedValue.charAt(0);
    }

    if (truncatedValue.length > 1) {
      formattedValue += ' ' + truncatedValue.substring(1, 5);
    }

    if (truncatedValue.length > 5) {
      formattedValue += ' ' + truncatedValue.substring(5);
    }

    return formattedValue;
  };

  const validateStep3 = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Por favor ingresa tu nombre y apellido');
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (!rut.trim()) {
      setError('Por favor ingresa tu RUT');
      return false;
    }

    if (!validateRut(rut)) {
      setError('RUT inválido');
      return false;
    }

    return true;
  };

  const validateStep5 = () => {
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

  const validateStep6 = () => {
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

  const validateStep7 = () => {
    if (!personalEmail.trim()) {
      setError('Por favor ingresa un correo electrónico');
      return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(personalEmail)) {
      setError('Por favor ingresa un correo electrónico válido');
      return false;
    }

    return true;
  };

  const validateStep8 = () => {
    if (!address.trim() || !commune.trim()) {
      setError('Por favor ingresa la dirección y selecciona una comuna');
      return false;
    }

    return true;
  };

  const validateStep9 = () => {
    if (!sex.trim()) {
      setError('Por favor selecciona tu sexo');
      return false;
    }

    return true;
  };

  const validateStep10 = () => {
    if (!religion.trim()) {
      setError('Por favor selecciona tu religión');
      return false;
    }

    return true;
  };

  const validateStep11 = () => {
    // Este paso se omite si el rol es apoderado
    if (role === 'apoderado') {
      return true;
    }

    if (!scoutGroup.trim() || !scoutUnit.trim()) {
      setError('Por favor selecciona el grupo y la unidad scout');
      return false;
    }

    return true;
  };

  const validateStep12 = () => {
    // Este paso se omite si el rol es apoderado, dirigente o admin
    if (role === 'apoderado' || role === 'dirigente' || role === 'admin') {
      return true;
    }

    if (!school.trim() || !educationLevel.trim()) {
      setError('Por favor selecciona el colegio y nivel educacional');
      return false;
    }

    return true;
  };

  const validateStep13 = () => {
    // Este paso se omite si el rol es apoderado, dirigente o admin
    if (role === 'apoderado' || role === 'dirigente' || role === 'admin') {
      return true;
    }

    if (!guardianName.trim() || !guardianRelationship.trim() || !guardianPhone.trim()) {
      setError('Por favor completa la información del apoderado');
      return false;
    }

    return true;
  };

  const validateStep14 = () => {
    // Este paso se omite si el rol no es apoderado o dirigente
    if (role !== 'apoderado' && role !== 'dirigente') {
      return true;
    }

    // Validar que haya al menos un pupilo si es apoderado o dirigente
    if (pupils.length === 0 || pupils.some(pupil => !pupil.name.trim() || !pupil.relationship.trim() || !pupil.unit.trim())) {
      setError('Por favor completa la información de al menos un pupilo');
      return false;
    }

    return true;
  };

  const validateStep15 = () => {
    // Este paso se omite si el rol es apoderado
    if (role === 'apoderado') {
      return true;
    }

    // Validar que haya al menos un contacto de emergencia
    if (emergencyContacts.length === 0 || emergencyContacts.some(contact => !contact.name.trim() || !contact.relationship.trim() || !contact.phone.trim())) {
      setError('Por favor completa la información de al menos un contacto de emergencia');
      return false;
    }

    return true;
  };

  const validateStep16 = () => {
    // Este paso se omite si el rol es apoderado
    if (role === 'apoderado') {
      return true;
    }

    if (!healthSystem.trim()) {
      setError('Por favor selecciona tu sistema de salud');
      return false;
    }

    // Si seleccionó Isapre, debe proporcionar el detalle
    if (healthSystem === 'Isapre' && !isapreDetail.trim()) {
      setError('Por favor detalla el nombre de tu Isapre');
      return false;
    }

    return true;
  };

  const validateStep17 = () => {
    // Este paso se omite si el rol es apoderado
    if (role === 'apoderado') {
      return true;
    }

    if (!bloodType.trim()) {
      setError('Por favor selecciona tu tipo de sangre');
      return false;
    }

    return true;
  };

  const validateStep18 = () => {
    // Este paso se omite si el rol es apoderado
    if (role === 'apoderado') {
      return true;
    }

    if (!allergies.trim()) {
      setError('Por favor indica si tienes alergias o escribe "Ninguna"');
      return false;
    }

    return true;
  };

  const validateStep19 = () => {
    // Este paso se omite si el rol es apoderado
    if (role === 'apoderado') {
      return true;
    }

    if (!medicalHistory.trim()) {
      setError('Por favor indica si tienes antecedentes médicos o escribe "Ninguno"');
      return false;
    }

    return true;
  };

  const validateStep20 = () => {
    // Este paso se omite si el rol es apoderado
    if (role === 'apoderado') {
      return true;
    }

    if (!medicalTreatments.trim()) {
      setError('Por favor indica si tienes tratamientos médicos o escribe "No Tiene"');
      return false;
    }

    return true;
  };

  const validateStep21 = () => {
    // Este paso se omite si el rol es apoderado
    if (role === 'apoderado') {
      return true;
    }

    if (!medications.trim()) {
      setError('Por favor indica si consumes medicamentos o escribe "No Consume"');
      return false;
    }

    return true;
  };

  const validateStep22 = () => {
    // Este paso se omite si el rol es apoderado
    if (role === 'apoderado') {
      return true;
    }

    if (dietaryRestrictions.length === 0) {
      setError('Por favor selecciona al menos una opción de dieta alimentaria');
      return false;
    }

    return true;
  };

  const validateStep23 = () => {
    if (!photoAuthorization.trim()) {
      setError('Por favor responde si autoriza el uso de fotografías');
      return false;
    }

    return true;
  };

  const validateStep24 = () => {
    if (!publicFaith.trim()) {
      setError('Por favor responde si da fe pública de los datos');
      return false;
    }

    return true;
  };

  const validateStep25 = () => {
    if (!password.trim()) {
      setError('Por favor ingresa una contraseña');
      return false;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    // Validar que la contraseña coincida con la confirmación
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
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
        break;
      case 17:
        shouldProceed = validateStep17();
        break;
      case 18:
        shouldProceed = validateStep18();
        break;
      case 19:
        shouldProceed = validateStep19();
        break;
      case 20:
        shouldProceed = validateStep20();
        break;
      case 21:
        shouldProceed = validateStep21();
        break;
      case 22:
        shouldProceed = validateStep22();
        break;
      case 23:
        shouldProceed = validateStep23();
        break;
      case 24:
        shouldProceed = validateStep24();
        break;
      case 25:
        shouldProceed = validateStep25();
        if (shouldProceed) {
          handleFinalSubmit();
        }
        break;
    }

    if (shouldProceed && step < 25) {
      // Encontrar el siguiente paso aplicable
      const nextStep = findNextApplicableStep(step, role);
      setStep(nextStep);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      // Encontrar el paso anterior aplicable
      const prevStep = findPrevApplicableStep(step, role);
      setStep(prevStep);
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

  const handleFinalSubmit = async () => {
    setIsRegistering(true); // Set loading state
    setError(''); // Clear previous errors

    try {
      // Para roles que no entran al paso de contraseña, generar una contraseña temporal
      let finalPassword = password;
      if (!finalPassword || finalPassword.trim() === '') {
        // Generar una contraseña temporal para apoderado, dirigente o admin
        finalPassword = Math.random().toString(36).slice(-8) + 'Temp!'; // 8 caracteres + símbolo
      }

      // Primero, crear el usuario en Supabase Auth
      const result = await signup(personalEmail, finalPassword, firstName, lastName, rut);

      if (result.error) {
        setError(result.error.message || 'Error al crear la cuenta');
        setIsRegistering(false); // Reset loading state
        return;
      }

      // Esperar un poco para asegurar que la sesión esté disponible
      await new Promise(resolve => setTimeout(resolve, 800)); // Aumentamos el tiempo de espera

      // Get the current session to obtain the newly created user's ID
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      // Si no se obtiene el userId, intentar obtenerlo directamente del auth
      let actualUserId = userId;
      if (!actualUserId) {
        // Intentar obtener el userId del estado de autenticación
        const { data: { user } } = await supabase.auth.getUser();
        actualUserId = user?.id;
      }

      // Si después de todos los intentos no hay userId, intentar crear el perfil más tarde
      if (!actualUserId) {
        console.error('No se pudo obtener el ID del usuario después del registro');
        // Continuar al dashboard pero intentar crear el perfil en el fondo
        // Esto podría hacerse con un webhook o una función que cree el perfil cuando esté disponible el userId
        router.push('/dashboard');
        router.refresh();

        // Intentar crear el perfil en segundo plano después de un tiempo
        const backgroundTimeout = setTimeout(async () => {
          try {
            console.log('Intentando crear perfil en segundo plano...');

            // Intentar refrescar la sesión y obtener el usuario
            // Primero intentamos con getSession
            const { data: { session: newSession }, error: sessionError } = await supabase.auth.getSession();
            console.log('Sesión obtenida:', newSession, 'Error:', sessionError);

            // Si getSession no funciona, intentar getUser directamente
            let newUserID = newSession?.user?.id;
            if (!newUserID) {
              const { data: { user }, error: userError } = await supabase.auth.getUser();
              console.log('Usuario obtenido directamente:', user, 'Error:', userError);
              newUserID = user?.id;
            }

            console.log('UserID obtenido en segundo plano:', newUserID);

            if (newUserID) {
              console.log('Enviando datos del perfil para el usuario:', newUserID);
              const profileResponse = await fetch('/api/user-profile', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: newUserID,
                  email: personalEmail,
                  firstName,
                  paternalLastName: lastName,
                  maternalLastName: '',
                  rut,
                  role: role || 'admin',
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
                  dietary_needs: dietaryRestrictions?.join(', '),
                  allergies,
                  medical_history: medicalHistory,
                  current_treatments: medicalTreatments,
                  medication_use: medications,
                  guardian_id: guardianName,
                  emergency_contacts: emergencyContacts,
                  scout_group: scoutGroup,
                  photo_authorization: photoAuthorization,
                  public_faith_data: publicFaith
                }),
              });

              console.log('Respuesta del perfil:', profileResponse.status);
              const profileResult = await profileResponse.json();
              console.log('Resultado del perfil:', profileResult);

              if (!profileResponse.ok) {
                console.error('Error creando perfil en segundo plano:', profileResult.error);
              } else {
                console.log('Perfil creado exitosamente en segundo plano');
              }
            } else {
              console.error('No se pudo obtener el userID en el intento en segundo plano');
              console.log('Reintentando en 5 segundos...');

              // Hacer un nuevo intento después de 5 segundos
              setTimeout(async () => {
                try {
                  // Intentar otra vez después de más tiempo
                  await supabase.auth.refreshSession();
                  const { data: { user } } = await supabase.auth.getUser();
                  const retryUserID = user?.id;

                  if (retryUserID) {
                    console.log('Retry: Enviando datos del perfil para el usuario:', retryUserID);
                    const retryProfileResponse = await fetch('/api/user-profile', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        userId: retryUserID,
                        email: personalEmail,
                        firstName,
                        paternalLastName: lastName,
                        maternalLastName: '',
                        rut,
                        role: role || 'admin',
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
                        dietary_needs: dietaryRestrictions?.join(', '),
                        allergies,
                        medical_history: medicalHistory,
                        current_treatments: medicalTreatments,
                        medication_use: medications,
                        guardian_id: guardianName,
                        emergency_contacts: emergencyContacts,
                        scout_group: scoutGroup,
                        photo_authorization: photoAuthorization,
                        public_faith_data: publicFaith
                      }),
                    });

                    const retryResult = await retryProfileResponse.json();
                    console.log('Retry respuesta del perfil:', retryProfileResponse.status);
                    console.log('Retry resultado del perfil:', retryResult);

                    if (!retryProfileResponse.ok) {
                      console.error('Error en retry creando perfil en segundo plano:', retryResult.error);
                    } else {
                      console.log('Perfil creado exitosamente en retry');
                    }
                  } else {
                    console.error('Incluso en retry no se pudo obtener el userID');
                  }
                } catch (retryError) {
                  console.error('Error en retry de creación de perfil:', retryError);
                }
              }, 5000); // Reintentar después de 5 segundos
            }
          } catch (error) {
            console.error('Error en la creación de perfil en segundo plano:', error);
          }
        }, 2000); // Intentar de nuevo después de 2 segundos

        return;
      }

      // Luego, crear el perfil de usuario en la tabla users a través de la API
      // usando el service role para evitar problemas de RLS
      const profileResponse = await fetch('/api/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: actualUserId,
          email: personalEmail,
          firstName,
          paternalLastName: lastName,  // Assuming lastName is paternal name, split happens in signup function
          maternalLastName: '',        // This would come from a separate field in the form
          rut,
          role: role || 'admin',
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
          dietary_needs: dietaryRestrictions?.join(', '),
          allergies,
          medical_history: medicalHistory,
          current_treatments: medicalTreatments,
          medication_use: medications,
          guardian_id: guardianName,
          emergency_contacts: emergencyContacts,
          scout_group: scoutGroup,
          photo_authorization: photoAuthorization,
          public_faith_data: publicFaith
        }),
      });

      const profileResult = await profileResponse.json();

      if (!profileResponse.ok) {
        console.error("Profile creation error:", profileResult.error);
        // Still allow the user to proceed even if profile creation fails
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta');
      setIsRegistering(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col min-h-[95vh] bg-white">
      {/* Back Arrow */}
      <div className="p-4">
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-(--clr5) hover:text-(--clr7) transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Inicio</span>
        </button>
      </div>

      {/* Centered Content */}
      <div className="flex items-center justify-center flex-grow p-2 w-full">
        <div className="w-full">
          <Card className="rounded-3xl overflow-hidden border-0 w-full">
            <div className="bg-gradient-to-br from-(--clr7) to-(--clr5) p-4 sm:p-4 text-center text-white">
              <div className="mx-auto bg-(--clr6)/40 hover:bg-(--clr6)/80 backdrop-blur-sm w-20 h-20 sm:w-18 sm:h-18 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <img
                  src="/images/logos/LogoColor.svg"
                  alt="Nua Mana Logo"
                  className="h-18 w-18 sm:h-16 sm:w-16 object-contain"
                />
              </div>

              <h1 className="text-lg sm:text-xl md:text-2xl font-bold">¡Únete a la Aventura!</h1>
              <p className="mt-1 sm:mt-2 opacity-80 text-sm">Paso {role ? (() => {
                let count = 0;
                for (let i = 1; i <= step; i++) {
                  if (isStepApplicable(i, role)) {
                    count++;
                  }
                }
                return count;
              })() : step} de {role ? getTotalStepsForRole(role) : 25}</p>
            </div>

            <CardContent className="p-2 sm:p-2">
              {/* Progress bar */}
              <div className="mb-4 sm:mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${role ? (() => {
                        let stepPosition = 0;
                        for (let i = 1; i <= step; i++) {
                          if (isStepApplicable(i, role)) {
                            stepPosition++;
                          }
                        }
                        const totalSteps = getTotalStepsForRole(role);
                        return totalSteps > 0 ? (stepPosition - 1) * (100 / (totalSteps - 1)) : 0;
                      })() : (step - 1) * (100 / 24)}%`,
                      background: 'linear-gradient(to right, var(--clr5), var(--clr7))'
                    }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Authorization Password */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">Bienvenido al Registro</h2>
                    <p className="text-gray-600">Para comenzar, necesitamos la contraseña de registro que fue compartida con el grupo de apoderados.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authPassword" className="text-gray-700 font-medium">Ingrese contraseña de registro</Label>
                    <Input
                      id="authPassword"
                      type="password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, handleNextStep)}
                      className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ingresa la contraseña"
                    />
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      La clave de autorización de registro o clave de autorización para registrarse fue compartida al grupo de apoderados en Whatsapp si tiene dudas consulte con el dirigente a cargo de la unidad de la niña, niño o joven.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <Button
                    type="button"
                    className="w-full"
                    style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                    size="lg"
                    onClick={handleNextStep}
                  >
                    Continuar
                  </Button>
                </div>
              )}

              {/* Step 2: Role Selection */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-800 text-center">¿Qué tipo de usuario eres?</h2>
                    <p className="text-gray-600 text-center">Elige el tipo de usuario que estás registrando en nuestro sitio web.</p>
                  </div>

                  <div className="space-y-2">
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecciona un rol</option>
                      <option value="lobato (a)">Lobato(a)</option>
                      <option value="guia">Guía</option>
                      <option value="scout">Scout</option>
                      <option value="pionera (o)">Pionero(a)</option>
                      <option value="caminante">Caminante</option>
                      <option value="dirigente">Dirigente</option>
                      <option value="apoderado">Apoderado</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Selecciona un tipo de usuario de la lista desplegable. De acuerdo a la opción seleccionada los campos de más adelante serán diferentes, por esto es fundamental que elijas adecuadamente.
                    </p>
                    <p className="text-sm mt-1 font-bold text-center text-(--clr7)">
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Name and Surname */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cuál es tú Nombre?</h2>
                    <p className="text-gray-600">Cuéntanos cuál es tu nombre.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700 font-medium">Nombre</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, handleNextStep)}
                          className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tu nombre"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700 font-medium">Apellido</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, handleNextStep)}
                        className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tu apellido"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Escribe el nombre completo de la persona que se está registrando, Recuerda que con estos datos realizaremos el registro, por lo que debes indicar todos tus nombres y todos tus apellidos en cada campo que corresponda.
                    </p>
                    <p className="text-sm mt-1 font-bold text-center text-(--clr7)">
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 5: Phone Number */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cuál es tu teléfono?</h2>
                    <p className="text-gray-600">Escribe el número de teléfono de la persona que estás registrando, NO del apoderado</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium">Teléfono Móvil</Label>
                    <Input
                      id="phone"
                      value={formatPhoneInput(phone)}
                      onChange={(e) => {
                        // Eliminar caracteres no numéricos para obtener solo dígitos
                        const rawValue = e.target.value.replace(/[^\d]/g, '');

                        // Limitar a 9 dígitos (9XXXXXXXX)
                        const truncatedValue = rawValue.substring(0, 9);

                        setPhone(truncatedValue);
                      }}
                      className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+56 9 9999 9999"
                    />
                  </div>

                  <div className="text-sm text-gray-600 text-center">
                    Ingrese el teléfono móvil de la persona que está registrando.
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Si la persona que esta registrando es un niño o niña y no tiene teléfono móvil, o usted como adulta o adulto no quiere entregar esta información, NO coloque el teléfono del apoderado aquí para esa información hay un espacio más adelante.
                    </p>
                    <p className="text-sm mt-1 font-bold text-center text-(--clr7)">
                      * Este campo es opcional
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 6: Birth Date */}
              {step === 6 && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cuándo Naciste?</h2>
                    <p className="text-gray-600">Selecciona en el cuadro tu fecha de nacimiento</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-gray-700 font-medium">Fecha de Nacimiento</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Ingrese la fecha de nacimiento de la persona que está registrando
                    </p>
                    <p className="text-sm mt-1 font-bold text-center text-(--clr7)">
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}


              {/* Step 7: Personal Email */}
              {step === 7 && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cuál es tu Correo Electrónico?</h2>
                    <p className="text-gray-600">Escribe tu correo electrónico, con este correo podras luego restablecer tu contraseña y/o iniciar sesión en la página.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personalEmail" className="text-gray-700 font-medium">Correo Electrónico</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="personalEmail"
                        type="email"
                        placeholder="tu@email.com"
                        value={personalEmail}
                        onChange={(e) => setPersonalEmail(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, handleNextStep)}
                        className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Ingrese el correo electrónico de la persona que esta registrando, el correo electrónico es obligatorio ya que es necesario en caso de necesitar restablecer la contraseña de la página o donde se enviaran las copias de formulario y autorizaciones que complete, el correo tiene un formato nombre@dominio.extensión
                    </p>
                    <p className="text-sm mt-1 text-center text-(--clr7)">
                      En caso de ser menor de edad y no tener un correo electrónico puede completar este campo con el RUT y el dominio del grupo,
                      Ejemplo: 12345678-9@nuamana.cl
                    </p>
                    <p className="text-sm mt-1 font-bold text-center text-(--clr7)">
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 8: Address and Commune */}
              {step === 8 && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Dónde vives?</h2>
                    <p className="text-gray-600">Escribe la dirección y comuna donde vive de la persona que estas registrando.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-700 font-medium">Dirección</Label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Input
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="sm:w-7/10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Calle, número, departamento, etc."
                        />
                        <select
                          id="commune"
                          value={commune}
                          onChange={(e) => setCommune(e.target.value)}
                          className="sm:w-3/10 flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Selecciona una comuna</option>
                          <option value="Cerrillos">Cerrillos</option>
                          <option value="Cerro Navia">Cerro Navia</option>
                          <option value="Colina">Colina</option>
                          <option value="Conchalí">Conchalí</option>
                          <option value="El Bosque">El Bosque</option>
                          <option value="Estación Central">Estación Central</option>
                          <option value="Huechuraba">Huechuraba</option>
                          <option value="Independencia">Independencia</option>
                          <option value="La Cisterna">La Cisterna</option>
                          <option value="La Florida">La Florida</option>
                          <option value="La Granja">La Granja</option>
                          <option value="La Pintana">La Pintana</option>
                          <option value="La Reina">La Reina</option>
                          <option value="Lampa">Lampa</option>
                          <option value="Las Condes">Las Condes</option>
                          <option value="Lo Barnechea">Lo Barnechea</option>
                          <option value="Lo Espejo">Lo Espejo</option>
                          <option value="Lo Prado">Lo Prado</option>
                          <option value="Macul">Macul</option>
                          <option value="Maipú">Maipú</option>
                          <option value="Ñuñoa">Ñuñoa</option>
                          <option value="Padre Hurtado">Padre Hurtado</option>
                          <option value="Pedro Aguirre Cerda">Pedro Aguirre Cerda</option>
                          <option value="Peñaflor">Peñaflor</option>
                          <option value="Peñalolén">Peñalolén</option>
                          <option value="Pirque">Pirque</option>
                          <option value="Providencia">Providencia</option>
                          <option value="Pudahuel">Pudahuel</option>
                          <option value="Puente Alto">Puente Alto</option>
                          <option value="Quilicura">Quilicura</option>
                          <option value="Quinta Normal">Quinta Normal</option>
                          <option value="Recoleta">Recoleta</option>
                          <option value="Renca">Renca</option>
                          <option value="San Bernardo">San Bernardo</option>
                          <option value="San Joaquín">San Joaquín</option>
                          <option value="San José de Maipo">San José de Maipo</option>
                          <option value="San Miguel">San Miguel</option>
                          <option value="San Ramón">San Ramón</option>
                          <option value="Santiago">Santiago (Centro)</option>
                          <option value="Vitacura">Vitacura</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Escribe la Dirección y selecciona la Comuna de la persona que se está registrando en nuestro grupo, esta información es necesaria para poder hacer el registro y ambos campos son obligatorios.
                    </p>
                    <p className="text-sm mt-1 font-bold text-center text-(--clr7)">
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 9: Sex */}
              {step === 9 && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cúal es la asignación Femenina/Masculina entregada al nacer?</h2>
                    <p className="text-gray-600">selecciona de la lista la asignación que se te entrego al nacer</p>
                  </div>

                  <div className="space-y-2">
                    <select
                      id="sex"
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                      className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="femenina">Femenina</option>
                      <option value="masculina">Masculina</option>
                    </select>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Selecciona la asignación femenina/masculina entregada al nacer de la persona que estás registrando.
                    </p>
                    <p className="text-sm mt-1 font-bold text-center text-(--clr7)">
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: RUT */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cuál es tú R.U.N.?</h2>
                    <p className="text-gray-600">Cuentanos cúal es tu R.U.N. o R.U.T.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rut" className="text-gray-700 font-medium">R.U.T.</Label>
                    <Input
                      id="rut"
                      value={rut}
                      onChange={(e) => {
                        const formattedValue = formatRut(e.target.value);
                        setRut(formattedValue);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, handleNextStep)}
                      className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="12345678-9"
                    />
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Escribe el R.U.T. o R.U.N., de la persona que asiste a la actividad, sin puntos y con guión y dígito verificador, por ejemplo, 12345678-9.
                    </p>
                    <p className="text-sm mt-1 font-bold text-center text-(--clr7)">
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 10: Religion */}
              {step === 10 && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cúal es tu Condición Religiosa?</h2>
                    <p className="text-gray-600">Selecciona de la lista tu religión o creencia espiritual.</p>
                  </div>

                  <div className="space-y-2">
                    <select
                      id="religion"
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                      className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecciona una religión</option>
                      <option value="no-conocido">No conocido</option>
                      <option value="no-especifica">No especifica</option>
                      <option value="no-tiene">No tiene</option>
                      <option value="agnostico">Agnóstico (a)</option>
                      <option value="catolico">Católico (a)</option>
                      <option value="evangelico">Evangélico (a)</option>
                      <option value="protestante">Protestante</option>
                      <option value="bautista">Bautista</option>
                      <option value="ultimos-dias">Santos de los Últimos Días</option>
                      <option value="testigo-jehova">Testigo de Jehova</option>
                      <option value="budista">Budista</option>
                      <option value="cristiana">Cristiana</option>
                      <option value="luterana">Luterana</option>
                      <option value="creyente">Creyente</option>
                      <option value="anglicana">Anglicana</option>
                      <option value="adventista">Adventista</option>
                      <option value="metodista">Metodista</option>
                      <option value="ortodoxo">Ortodoxo</option>
                      <option value="are-krishna">Are Krishna</option>
                      <option value="musulman">Musulman</option>
                      <option value="bahai">Bahai</option>
                      <option value="rastafari">Rastafari</option>
                      <option value="deista">Deísta</option>
                      <option value="hinduista">Hinduista</option>
                      <option value="sijes">Sijes</option>
                      <option value="taoista">Taoista</option>
                      <option value="sintoista">Sintoísta</option>
                      <option value="jainista">Jainista</option>
                      <option value="confusiano">Confusiano (a)</option>
                      <option value="zoroastriano">Zoroastriano (a)</option>
                      <option value="sunita">Sunita</option>
                      <option value="chiita">Chiita</option>
                      <option value="vedista">Vedista</option>
                      <option value="brahmanista">Brahmanista</option>
                      <option value="wicca">Wicca</option>
                      <option value="druida">Druida</option>
                      <option value="asatru">Ásatrú</option>
                      <option value="judio">Judío (a)</option>
                      <option value="otra">Otra</option>
                    </select>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Seleccione la creencia espiritual de la persona que está registrando.
                    </p>
                    <p className="text-sm mt-1 font-bold text-center text-(--clr7)">
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 11: Scout Information */}
              {step === 11 && role !== 'apoderado' && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cuál es tu información Scout?</h2>
                    <p className="text-gray-600">A continuación selecciona si eres de nuestro grupo Guías y Scouts Nua Mana o si perteneces a algun otro grupo, de la misma forma selecciona a que unidad perteneces.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="w-full sm:w-1/2 space-y-2">
                        <Label htmlFor="scoutGroup" className="text-gray-700 font-medium">Grupo al que pertenece</Label>
                        <select
                          id="scoutGroup"
                          value={scoutGroup}
                          onChange={(e) => setScoutGroup(e.target.value)}
                          className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Selecciona un grupo</option>
                          <option value="Guías y Scouts Nua Mana">Guías y Scouts Nua Mana</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>

                      <div className="w-full sm:w-1/2 space-y-2">
                        <Label htmlFor="scoutUnit" className="text-gray-700 font-medium">Unidad</Label>
                        <select
                          id="scoutUnit"
                          value={scoutUnit}
                          onChange={(e) => setScoutUnit(e.target.value)}
                          className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Selecciona una unidad</option>
                          <option value="Manada">Manada</option>
                          <option value="Compañía">Compañía</option>
                          <option value="Tropa">Tropa</option>
                          <option value="Avanzada">Avanzada</option>
                          <option value="Clan">Clan</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Seleccione el grupo guía / scout al que pertenece el niño, niña o joven, normalmente debería ser Nua Mana.<br />
                      Seleccione la unidad a la que pertenece la niña, niño o joven de acuerdo a la edad del mismo (si es adulto seleccione su unidad)<br />
                      Manada – niños y niñas entre 7 y 11 años (unidad mixta)<br />
                      Compañía – niñas y jóvenes mujeres entre 11 y 15 años (unidad femenina)<br />
                      Tropa – niños y jóvenes entre 11 y 15 años (unidad masculina)<br />
                      Avanzada – jóvenes entre 15 y 17 años (unidad mixta)<br />
                      Clan – jóvenes entre 17 y 20 años (unidad mixta)<br /><br />
                      * Estos campos son obligatorios
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 12: School Information */}
              {step === 12 && role !== 'apoderado' && role !== 'dirigente' && role !== 'admin' && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cuál es tu información Escolar?</h2>
                    <p className="text-gray-600">Seleccione un colegio de la lista para fines estadísticos del grupo, y además seleccione el nivel educacional en el que está actualmente la niña, niño o joven que se esta registrando.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="w-full sm:w-1/2 space-y-2">
                        <Label htmlFor="school" className="text-gray-700 font-medium">Colegio</Label>
                        <select
                          id="school"
                          value={school}
                          onChange={(e) => setSchool(e.target.value)}
                          className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Selecciona un colegio</option>
                          <option value="No Conocido">No Conocido</option>
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
                          <option value="Liceo Técnico Profesional Patricio Aylwin Azócar">Liceo Técnico Profesional Patricio Aylwin Azócar</option>
                          <option value="Saint Christian College">Saint Christian College</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>

                      <div className="w-full sm:w-1/2 space-y-2">
                        <Label htmlFor="educationLevel" className="text-gray-700 font-medium">Estudiante de</Label>
                        <select
                          id="educationLevel"
                          value={educationLevel}
                          onChange={(e) => setEducationLevel(e.target.value)}
                          className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Selecciona nivel</option>
                          <option value="No conocido">No conocido</option>
                          <option value="Educación Básica">Educación Básica</option>
                          <option value="Educación Media">Educación Media</option>
                          <option value="Educación Superior">Educación Superior</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Seleccione el colegio al que asiste el niño, niña o joven, e indique el nivel educacional en el que se encuentra el curso que actualmente está cursando.<br />
                      * Estos campos son obligatorios
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 13: Guardian Information */}
              {step === 13 && role !== 'apoderado' && role !== 'dirigente' && role !== 'admin' && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cuál es la información de la apoderada (o)?</h2>
                    <p className="text-gray-600">Complete la información sobre la o el apoderado (a).</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="guardianName" className="text-gray-700 font-medium">Nombre de la Apoderada (o)</Label>
                      <Input
                        id="guardianName"
                        value={guardianName}
                        onChange={(e) => setGuardianName(e.target.value)}
                        className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nombre del apoderado"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="w-full sm:w-1/2 space-y-2">
                        <Label htmlFor="guardianRelationship" className="text-gray-700 font-medium">Relación del Apoderado (a)</Label>
                        <select
                          id="guardianRelationship"
                          value={guardianRelationship}
                          onChange={(e) => setGuardianRelationship(e.target.value)}
                          className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Selecciona relación</option>
                          <option value="No Aplica">No Aplica</option>
                          <option value="Madre">Madre</option>
                          <option value="Padre">Padre</option>
                          <option value="Hermana (o)">Hermana (o)</option>
                          <option value="Tía (o)">Tía (o)</option>
                          <option value="Abuela (o)">Abuela (o)</option>
                          <option value="Sobrina (o)">Sobrina (o)</option>
                          <option value="Hija (o)">Hija (o)</option>
                          <option value="Otra">Otra</option>
                        </select>
                      </div>

                      <div className="w-full sm:w-1/4 space-y-2">
                        <Label htmlFor="guardianPhone" className="text-gray-700 font-medium">Teléfono del Apoderado (a)</Label>
                        <Input
                          id="guardianPhone"
                          value={formatPhoneInput(guardianPhone)}
                          onChange={(e) => {
                            // Eliminar caracteres no numéricos para obtener solo dígitos
                            const rawValue = e.target.value.replace(/[^\d]/g, '');

                            // Limitar a 9 dígitos (9XXXXXXXX)
                            const truncatedValue = rawValue.substring(0, 9);

                            setGuardianPhone(truncatedValue);
                          }}
                          className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+56 9 9999 9999"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Indica los datos de tu apoderada (o), un teléfono donde ubicarla y selecciona la relación o parentesco que tiene contigo. estos datos serán agregados a los grupos de whatsapp del grupo.<br />
                      * Estos campos son obligatorios
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 14: Pupils Information */}
              {step === 14 && (role === 'apoderado' || role === 'dirigente') && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Quiénes son tus pupilos?</h2>
                    <p className="text-gray-600">Indica los nombres de las personas de quien eres apoderada (o)</p>
                  </div>

                  <div className="space-y-4">
                    {pupils.map((pupil, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-gray-700">Pupilo {index + 1}</h3>
                          {pupils.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removePupil(index)}
                            >
                              Eliminar
                            </Button>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="w-full sm:w-1/2 space-y-2">
                            <Label htmlFor={`pupilName-${index}`} className="text-gray-700 font-medium">Nombre del pupilo (a)</Label>
                            <Input
                              id={`pupilName-${index}`}
                              value={pupil.name}
                              onChange={(e) => updatePupil(index, 'name', e.target.value)}
                              className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Nombre del pupilo"
                            />
                          </div>

                          <div className="w-full sm:w-1/4 space-y-2">
                            <Label htmlFor={`pupilRelationship-${index}`} className="text-gray-700 font-medium">Es mi...</Label>
                            <select
                              id={`pupilRelationship-${index}`}
                              value={pupil.relationship}
                              onChange={(e) => updatePupil(index, 'relationship', e.target.value)}
                              className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Selecciona relación</option>
                              <option value="No Aplica">No Aplica</option>
                              <option value="Madre">Madre</option>
                              <option value="Padre">Padre</option>
                              <option value="Hermana (o)">Hermana (o)</option>
                              <option value="Tía (o)">Tía (o)</option>
                              <option value="Abuela (o)">Abuela (o)</option>
                              <option value="Sobrina (o)">Sobrina (o)</option>
                              <option value="Hija (o)">Hija (o)</option>
                              <option value="Otra">Otra</option>
                            </select>
                          </div>

                          <div className="w-full sm:w-1/4 space-y-2">
                            <Label htmlFor={`pupilUnit-${index}`} className="text-gray-700 font-medium">Unidad del Pupilo</Label>
                            <select
                              id={`pupilUnit-${index}`}
                              value={pupil.unit}
                              onChange={(e) => updatePupil(index, 'unit', e.target.value)}
                              className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Selecciona unidad</option>
                              <option value="No Aplica">No Aplica</option>
                              <option value="Manada">Manada</option>
                              <option value="Compañía">Compañía</option>
                              <option value="Tropa">Tropa</option>
                              <option value="Avanzada">Avanzada</option>
                              <option value="Clan">Clan</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addPupil}
                    >
                      + Agregar otro pupilo
                    </Button>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Indica los datos de la pupila (o) tu relación o parentesco con el pupilo, y la unidad a la que pertenece.<br />
                      Seleccione la unidad a la que pertenece la niña, niño o joven de acuerdo a la edad del mismo.<br />
                      Manada - niños y niñas entre 7 y 11 años (unidad mixta).<br />
                      Compañía - niñas y jóvenes mujeres entre 11 y 15 años (unidad femenina).<br />
                      Tropa - niños y jóvenes entre 11 y 15 años (unidad masculina).<br />
                      Avanzada - jóvenes entre 15 y 17 años (unidad mixta).<br />
                      Clan - jóvenes entre 17 y 20 años (unidad mixta).<br /><br />
                      * Estos campos son obligatorios
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 15: Emergency Contacts */}
              {step === 15 && role !== 'apoderado' && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cuáles son tus <strong>Contactos de Emergencia</strong>?</h2>
                    <p className="text-gray-600">Indícanos detalles de a quien avisar en caso de una emergencia</p>
                  </div>

                  <div className="space-y-4">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-gray-700">Contacto {index + 1}</h3>
                          {emergencyContacts.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeEmergencyContact(index)}
                            >
                              Eliminar
                            </Button>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="w-full sm:w-1/2 space-y-2">
                            <Label htmlFor={`contactName-${index}`} className="text-gray-700 font-medium">Nombre Contacto de Emergencia</Label>
                            <Input
                              id={`contactName-${index}`}
                              value={contact.name}
                              onChange={(e) => updateEmergencyContact(index, 'name', e.target.value)}
                              className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Nombre del contacto"
                            />
                          </div>

                          <div className="w-full sm:w-1/4 space-y-2">
                            <Label htmlFor={`contactRelationship-${index}`} className="text-gray-700 font-medium">Relación con el contacto</Label>
                            <select
                              id={`contactRelationship-${index}`}
                              value={contact.relationship}
                              onChange={(e) => updateEmergencyContact(index, 'relationship', e.target.value)}
                              className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Selecciona relación</option>
                              <option value="No Aplica">No Aplica</option>
                              <option value="Madre">Madre</option>
                              <option value="Padre">Padre</option>
                              <option value="Hermana (o)">Hermana (o)</option>
                              <option value="Tía (o)">Tía (o)</option>
                              <option value="Abuela (o)">Abuela (o)</option>
                              <option value="Sobrina (o)">Sobrina (o)</option>
                              <option value="Hija (o)">Hija (o)</option>
                              <option value="Otra">Otra</option>
                            </select>
                          </div>

                          <div className="w-full sm:w-1/4 space-y-2">
                            <Label htmlFor={`contactPhone-${index}`} className="text-gray-700 font-medium">Teléfono del Contacto</Label>
                            <Input
                              id={`contactPhone-${index}`}
                              value={formatPhoneInput(contact.phone)}
                              onChange={(e) => {
                                // Eliminar caracteres no numéricos para obtener solo dígitos
                                const rawValue = e.target.value.replace(/[^\d]/g, '');

                                // Limitar a 9 dígitos (9XXXXXXXX)
                                const truncatedValue = rawValue.substring(0, 9);

                                updateEmergencyContact(index, 'phone', truncatedValue);
                              }}
                              className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="+56 9 9999 9999"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addEmergencyContact}
                    >
                      + Agregar otro contacto
                    </Button>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Agrega los datos de contactos de emergencia donde podamos dar aviso en caso de alguna situación.<br />
                      * Estos campos son obligatorios
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 16: Health System */}
              {step === 16 && role !== 'apoderado' && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cuál es tu Sistema de Salud?</h2>
                    <p className="text-gray-600">Indícanos detalles de tu sistema de salud, esta información puede ser necesaria en caso de recurrir a un centro medico, selecciona de la lista tu sistema y de ser necesario especifica más abajo</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="healthSystem" className="text-gray-700 font-medium">Sistema de Salud</Label>
                      <select
                        id="healthSystem"
                        value={healthSystem}
                        onChange={(e) => {
                          setHealthSystem(e.target.value);
                          // Si se cambia a otra opción que no sea Isapre, limpiar el detalle
                          if (e.target.value !== 'Isapre') {
                            setIsapreDetail('');
                          }
                        }}
                        className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selecciona sistema</option>
                        <option value="No Aplica">No Aplica</option>
                        <option value="FONASA">FONASA</option>
                        <option value="Isapre">Isapre</option>
                        <option value="Particular">Particular</option>
                        <option value="Fuerzas Armadas">Fuerzas Armadas</option>
                      </select>
                    </div>

                    {healthSystem === 'Isapre' && (
                      <div className="space-y-2">
                        <Label htmlFor="isapreDetail" className="text-gray-700 font-medium">Nombre de tu Isapre</Label>
                        <Input
                          id="isapreDetail"
                          value={isapreDetail}
                          onChange={(e) => setIsapreDetail(e.target.value)}
                          className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Nombre de tu Isapre"
                        />
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Selecciona tu sistema de salud, esta información es necesaria para que en caso de emergencia dirigirnos rápidamente al centro de urgencia adecuado.<br />
                      Si es isapre por favor detalla el nombre de la isapre.<br /><br />
                      * Estos campos son obligatorios.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 17: Blood Type */}
              {step === 17 && role !== 'apoderado' && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cuál es tu tipo de sangre?</h2>
                    <p className="text-gray-600">Este dato puede salvar tu vida</p>
                  </div>

                  <div className="space-y-2">
                    <select
                      id="bloodType"
                      value={bloodType}
                      onChange={(e) => setBloodType(e.target.value)}
                      className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecciona tipo de sangre</option>
                      <option value="No Aplica">No Aplica</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="No Sabe">No Sabe</option>
                    </select>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Indique el tipo de sangre, este es un dato vital en caso de una emergencia médica.<br /><br />
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 18: Allergies */}
              {step === 18 && role !== 'apoderado' && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Tienes alguna Alergia?</h2>
                    <p className="text-gray-600">Indícanos las alergias que sabes que tienes</p>
                  </div>

                  <div className="space-y-2">
                    <textarea
                      id="allergies"
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      className="w-full h-32 rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Indica el tipo de alergia y a qué tienes alergia. Por ejemplo: Medicamentos - Ibuprofeno. Si no tienes alergias, escribe 'Ninguna' o 'No Tiene'"
                    />
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Indique primero el tipo de alergia y luego a lo que tenga alergia el miembro beneficiario, por ejemplo: Medicamentos - Ibuprofeno, las categorías en general son Medicamentos, Comida y Otros.<br /><br />
                      Si el Niño / Niña o Joven no tiene ninguna alergia por favor indique <strong>Ninguna</strong> o <strong>No Tiene</strong><br /><br />
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 19: Medical History */}
              {step === 19 && role !== 'apoderado' && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Tiene algún Antecedente Médico?</h2>
                    <p className="text-gray-600">Dinos si tienes alguna información medica relevante, si tienes alguna enfermedad crónica o tratamiento especial</p>
                  </div>

                  <div className="space-y-2">
                    <textarea
                      id="medicalHistory"
                      value={medicalHistory}
                      onChange={(e) => setMedicalHistory(e.target.value)}
                      className="w-full h-32 rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Indica si has padecido enfermedades o Intervenciones quirúrgicas de Relevancia (indica cuales). Si no presentas ninguna, por favor indicar ninguna o No Tiene"
                    />
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Indique si ha padecido <strong>enfermedades o Intervenciones quirúrgicas de Relevancia</strong> (indique cuales) Si no presenta ninguna, por favor indicar ninguna o <strong>No Tiene</strong>.<br /><br />
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 20: Medical Treatments */}
              {step === 20 && role !== 'apoderado' && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Está haciendo algún Tratamiento Médico?</h2>
                    <p className="text-gray-600">Dinos si tienes alguna información medica relevante, si tienes alguna enfermedad crónica o tratamiento especial</p>
                  </div>

                  <div className="space-y-2">
                    <textarea
                      id="medicalTreatments"
                      value={medicalTreatments}
                      onChange={(e) => setMedicalTreatments(e.target.value)}
                      className="w-full h-32 rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Indica si se está efectuando algún Tratamiento médico que Requiera de cuidados (descríbelo). Si no tiene tratamientos médicos, por favor indicar No Tiene"
                    />
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Indique si se está efectuando algún <strong>Tratamiento médico que Requiera de cuidados</strong> (descríbalo) Si no tiene tratamientos médicos, por favor indicar <strong>No Tiene</strong>.<br /><br />
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 21: Medications */}
              {step === 21 && role !== 'apoderado' && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Está consumiendo algún medicamento?</h2>
                    <p className="text-gray-600">Dinos si consumes algún medicamento con regularidad, dinos los horarios y/o frecuencias</p>
                  </div>

                  <div className="space-y-2">
                    <textarea
                      id="medications"
                      value={medications}
                      onChange={(e) => setMedications(e.target.value)}
                      className="w-full h-32 rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Indica si está consumiendo algún Tipo de medicamento (indica cual y su horario). Si no consume, por favor escriba No Consume"
                    />
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Indique si está consumiendo algún Tipo de medicamento (<strong>indique cual y su horario</strong>) Si no consume, por favor escriba <strong>No Consume</strong>.<br /><br />
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 22: Dietary Restrictions */}
              {step === 22 && role !== 'apoderado' && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cuál es tu dieta alimentaria?</h2>
                    <p className="text-gray-600">Dinos que no puedes comer, esto es necesario para considerarlo en el menú de campamento</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { value: 'No Aplica', label: 'No Aplica' },
                        { value: 'Menú general', label: 'Menú general' },
                        { value: 'Menú vegetariano', label: 'Menú vegetariano' },
                        { value: 'Menú vegano', label: 'Menú vegano' },
                        { value: 'Menú celíaco', label: 'Menú celíaco' },
                        { value: 'Intolerante a la lactosa', label: 'Intolerante a la lactosa' }
                      ].map((restriction) => (
                        <div key={restriction.value} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`dietary-${restriction.value}`}
                            checked={dietaryRestrictions.includes(restriction.value)}
                            onChange={() => toggleDietaryRestriction(restriction.value)}
                            className="h-4 w-4 text-(--clr5) focus:ring-(--clr7) border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`dietary-${restriction.value}`}
                            className="ml-2 text-gray-700"
                          >
                            {restriction.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Selecciona el tipo de comida que consumes en tu vida cotidiana, esta respuesta es importante para establecer el menú de campamento.<br /><br />
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 23: Photo Authorization */}
              {step === 23 && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">Autorización de Uso de Fotografías</h2>
                    <p className="text-gray-600">Autorizo voluntariamente a <strong>Guías y Scouts Nua Mana</strong> y a sus representantes, personas voluntarias y/o personal remunerado autorizados por esta, a capturar, difundir, reproducir y utilizar la imagen y la voz del registrado en fotografías, videos, grabaciones u otros medios visuales o sonoros.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="photoAuthYes"
                          name="photoAuthorization"
                          value="si"
                          checked={photoAuthorization === 'si'}
                          onChange={(e) => setPhotoAuthorization(e.target.value)}
                          className="h-4 w-4 text-(--clr5) focus:ring-(--clr7) border-gray-300"
                        />
                        <label htmlFor="photoAuthYes" className="ml-2 text-gray-700">Sí</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="photoAuthNo"
                          name="photoAuthorization"
                          value="no"
                          checked={photoAuthorization === 'no'}
                          onChange={(e) => setPhotoAuthorization(e.target.value)}
                          className="h-4 w-4 text-(--clr5) focus:ring-(--clr7) border-gray-300"
                        />
                        <label htmlFor="photoAuthNo" className="ml-2 text-gray-700">No</label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Esto incluye el uso de la imagen y la voz de la persona registrada para promover, difundir y documentar las actividades, eventos y programas de <strong>Guías y Scouts Nua Mana</strong>. La imagen y voz podrán ser utilizadas en materiales informativos, educativos, promocionales, comerciales o para cualquier otro fin que <strong>Guías y Scouts Nua Mana</strong> estime conveniente, sin limitación de tiempo o de territorios. Esto incluye, pero no se limita a, impresiones, publicaciones digitales, sitios web, redes sociales y otros medios o plataformas, actuales o futuros.<br /><br />
                      Declaro que la persona registrada ha sido informado sobre esta autorización, que asiente y se encuentra de acuerdo con la utilización de su imagen y voz.<br /><br />
                      Reconozco y acepto que <strong>Guías y Scouts Nua Mana</strong> tiene el derecho de editar, modificar, adaptar y alterar el material audiovisual y gráfico de acuerdo con sus necesidades, respetando siempre los principios de moral y buenas costumbres. Entiendo que <strong>Guías y Scouts Nua Mana</strong> puede optar por no utilizar el material capturado o utilizar solo una parte de este, y que no tengo derecho a recibir compensación económica alguna por el uso de dicho material. Aunque la autorización es amplia, tengo el derecho de solicitar la eliminación de la imagen y voz de la persona registrada de futuros materiales mediante notificación escrita a quien corresponda en <strong>Guías y Scouts Nua Mana</strong> (Nivel Grupal, Distrital, Zonal o Nacional), quien procederá a efectuar la eliminación en un plazo razonable.<br /><br />
                      Declaro que he leído y comprendido en su totalidad el contenido de este documento y confirmo que soy la tutora o el tutor legal, de la persona registrada mencionada, con la capacidad legal para otorgar esta autorización.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 24: Public Faith */}
              {step === 24 && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">Fé Pública</h2>
                    <p className="text-gray-600">Doy fe que los datos contenidos en esta Ficha son verdaderos y no he omitido ninguna información importante.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="publicFaithYes"
                          name="publicFaith"
                          value="si"
                          checked={publicFaith === 'si'}
                          onChange={(e) => setPublicFaith(e.target.value)}
                          className="h-4 w-4 text-(--clr5) focus:ring-(--clr7) border-gray-300"
                        />
                        <label htmlFor="publicFaithYes" className="ml-2 text-gray-700">Sí</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="publicFaithNo"
                          name="publicFaith"
                          value="no"
                          checked={publicFaith === 'no'}
                          onChange={(e) => setPublicFaith(e.target.value)}
                          className="h-4 w-4 text-(--clr5) focus:ring-(--clr7) border-gray-300"
                        />
                        <label htmlFor="publicFaithNo" className="ml-2 text-gray-700">No</label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Guías y Scouts Nua Mana
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 25: Password */}
              {step === 25 && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-gray-800">¿Cuál será tu Contraseña?</h2>
                    <p className="text-gray-600">Crea una contraseña segura para tu cuenta</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 font-medium">Contraseña</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Crea una contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, handleFinalSubmit)}
                          className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirmar Contraseña</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirma tu contraseña"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, handleFinalSubmit)}
                          className="pl-10 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl">
                    <p className="text-sm text-center">
                      Crea una contraseña segura para tu cuenta. La contraseña debe tener al menos 6 caracteres.<br />
                      * Este campo es obligatorio
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      size="lg"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto flex-1"
                      style={{ background: 'linear-gradient(to right, var(--clr5), var(--clr7))', border: 'none' }}
                      size="lg"
                      onClick={handleFinalSubmit}
                      disabled={isRegistering}
                    >
                      {isRegistering ? 'Registrando usuario...' : 'Finalizar Registro'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}