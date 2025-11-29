# Documentación de Pasos de Registro

Este documento describe los pasos del proceso de registro en la aplicación de Guías y Scouts Nua Mana. El proceso consta de 25 pasos, algunos de los cuales dependen del rol seleccionado en el paso 2.

## Formato de descripción de pasos

- **Paso**: Número de paso
- **Condición**: Condición para visualizar el paso
- **Pregunta**: Texto principal que se muestra en la parte superior del paso
- **Descripción**: Descripción secundaria que se muestra debajo de la pregunta
- **Input**: Campo(s) que el usuario debe completar
- **Información**: Información adicional que se muestra debajo del campo de entrada

---

## Paso 1: Contraseña de autorización

- **Paso**: 1
- **Condición**: Sin condición previa
- **Pregunta**: "Bienvenido al Registro"
- **Descripción**: "Para comenzar, necesitamos la contraseña de registro que fue compartida con el grupo de apoderados."
- **Input**: "input de tipo contraseña, con label 'Ingrese contraseña de registro'"
- **Información**: "La clave de autorización de registro o clave de autorización para registrarse fue compartida al grupo de apoderados en Whatsapp si tiene dudas consulte con el dirigente a cargo de la unidad de la niña, niño o joven."

---

## Paso 2: Selección de rol

- **Paso**: 2
- **Condición**: Sin condición previa
- **Pregunta**: "¿Qué tipo de usuario eres?"
- **Descripción**: "Elige el tipo de usuario que estás registrando en nuestro sitio web."
- **Input**: "select con las opciones {lobato (a), guia, scout, pionera (o), caminante, dirigente, apoderado, admin}"
- **Información**: "Selecciona un tipo de usuario de la lista desplegable. De acuerdo a la opción seleccionada los campos de más adelante serán diferentes, por esto es fundamental que elijas adecuadamente. * Este campo es obligatorio"

---

## Paso 3: Nombre y apellido

- **Paso**: 3
- **Condición**: Sin condición previa
- **Pregunta**: "¿Cuál es tú Nombre?"
- **Descripción**: "Cuéntanos cuál es tu nombre."
- **Input**: "2 inputs de texto, 'Nombre' y 'Apellido'"
- **Información**: "Escribe el nombre completo de la persona que se está registrando, Recuerda que con estos datos realizaremos el registro, por lo que debes indicar todos tus nombres y todos tus apellidos en cada campo que corresponda. * Este campo es obligatorio"

---

## Paso 4: RUT

- **Paso**: 4
- **Condición**: Sin condición previa
- **Pregunta**: "¿Cuál es tú R.U.N.?"
- **Descripción**: "Cuéntanos cuál es tu R.U.N. o R.U.T."
- **Input**: "input de texto con formato RUT, con label 'R.U.T.'"
- **Información**: "Escribe el R.U.T. o R.U.N., de la persona que asiste a la actividad, sin puntos y con guión y dígito verificador, por ejemplo, 12345678-9. * Este campo es obligatorio"

---

## Paso 5: Teléfono

- **Paso**: 5
- **Condición**: Sin condición previa
- **Pregunta**: "¿Cuál es tu teléfono?"
- **Descripción**: "Escribe el número de teléfono de la persona que estás registrando, NO del apoderado"
- **Input**: "input de número con mascara de teléfono, con label 'Teléfono Móvil'"
- **Información**: "Si la persona que esta registrando es un niño o niña y no tiene teléfono móvil, o usted como adulta o adulto no quiere entregar esta información, NO coloque el teléfono del apoderado aquí para esa información hay un espacio más adelante. * Este campo es opcional"

---

## Paso 6: Fecha de nacimiento

- **Paso**: 6
- **Condición**: Sin condición previa
- **Pregunta**: "¿Cuándo Naciste?"
- **Descripción**: "Selecciona en el cuadro tu fecha de nacimiento"
- **Input**: "input de tipo date, con label 'Fecha de Nacimiento'"
- **Información**: "Ingrese la fecha de nacimiento de la persona que está registrando * Este campo es obligatorio"

---

## Paso 7: Correo Electrónico

- **Paso**: 7
- **Condición**: Sin condición previa
- **Pregunta**: "¿Cuál es tu Correo Electrónico?"
- **Descripción**: "Escribe tu correo electrónico, con este correo podrás luego restablecer tu contraseña y/o iniciar sesión en la página."
- **Input**: "input de tipo email, con label 'Correo Electrónico'"
- **Información**: "Ingrese el correo electrónico de la persona que esta registrando, el correo electrónico es obligatorio ya que es necesario en caso de necesitar restablecer la contraseña de la página o donde se enviaran las copias de formulario y autorizaciones que complete, el correo tiene un formato nombre@dominio.extensión. En caso de ser menor de edad y no tener un correo electrónico puede completar este campo con el RUT y el dominio del grupo, Ejemplo: 12345678-9@nuamana.cl * Este campo es obligatorio"

---

## Paso 8: Dirección y Comuna

- **Paso**: 8
- **Condición**: Sin condición previa
- **Pregunta**: "¿Dónde vives?"
- **Descripción**: "Escribe la dirección y comuna donde vive de la persona que estas registrando."
- **Input**: "[Dirección, input de texto, 70% del ancho, con label 'Dirección'] [Comuna, select, 30% del ancho, con label 'Comuna' y opciones {Cerrillos, Cerro Navia, Colina, Conchalí, El Bosque, Estación Central, Huechuraba, Independencia, La Cisterna, La Florida, La Granja, La Pintana, La Reina, Lampa, Las Condes, Lo Barnechea, Lo Espejo, Lo Prado, Macul, Maipú, Ñuñoa, Padre Hurtado, Pedro Aguirre Cerda, Peñaflor, Peñalolén, Pirque, Providencia, Pudahuel, Puente Alto, Quilicura, Quinta Normal, Recoleta, Renca, San Bernardo, San Joaquín, San José de Maipo, San Miguel, San Ramón, Santiago, Vitacura}]"
- **Información**: "Escribe la Dirección y selecciona la Comuna de la persona que se está registrando en nuestro grupo, esta información es necesaria para poder hacer el registro y ambos campos son obligatorios. * Este campo es obligatorio"

---

## Paso 9: Sexo

- **Paso**: 9
- **Condición**: Sin condición previa
- **Pregunta**: "¿Cuál es la asignación Femenina/Masculina entregada al nacer?"
- **Descripción**: "selecciona de la lista la asignación que se te entrego al nacer"
- **Input**: "select con opciones {femenina, masculina}"
- **Información**: "Selecciona la asignación femenina/masculina entregada al nacer de la persona que estás registrando. * Este campo es obligatorio"

---

## Paso 10: Religión

- **Paso**: 10
- **Condición**: Sin condición previa
- **Pregunta**: "¿Cúal es tu Condición Religiosa?"
- **Descripción**: "Selecciona de la lista tu religión o creencia espiritual."
- **Input**: "select con opciones {no-conocido, no-especifica, no-tiene, agnostico, catolico, evangelico, protestante, bautista, ultimos-dias, testigo-jehova, budista, cristiana, luterana, creyente, anglicana, adventista, metodista, ortodoxo, are-krishna, musulman, bahai, rastafari, deista, hinduista, sijes, taoista, sintoista, jainista, confusiano, zoroastriano, sunita, chiita, vedista, brahmanista, wicca, druida, asatru, judio, otra}"
- **Información**: "Seleccione la creencia espiritual de la persona que está registrando. * Este campo es obligatorio"

---

## Paso 11: Información Scout

- **Paso**: 11
- **Condición**: Para ver este paso no debe ser rol apoderado
- **Pregunta**: "¿Cuál es tu información Scout?"
- **Descripción**: "A continuación selecciona si eres de nuestro grupo Guías y Scouts Nua Mana o si perteneces a algun otro grupo, de la misma forma selecciona a que unidad perteneces."
- **Input**: "[Grupo, radio, usando el 50% del ancho, con label 'Grupo al que pertenece' y con las opciones {Guías y Scouts Nua Mana, Otro}], [Unidad, select, usando el 50% del ancho, con label 'Unidad' y con las opciones {Manada, Compañía, Tropa, Avanzada, Clan}]"
- **Información**: "Seleccione el grupo guía / scout al que pertenece el niño, niña o joven, normalmente debería ser Nua Mana.<br>Seleccione la unidad a la que pertenece la niña, niño o joven de acuerdo a la edad del mismo (si es adulto seleccione su unidad)<br>Manada – niños y niñas entre 7 y 11 años (unidad mixta)<br>Compañía – niñas y jóvenes mujeres entre 11 y 15 años (unidad femenina)<br>Tropa – niños y jóvenes entre 11 y 15 años (unidad masculina)<br>Avanzada – jóvenes entre 15 y 17 años (unidad mixta)<br>Clan – jóvenes entre 17 y 20 años (unidad mixta)<br><br>* Estos campos son obligatorios"

---

## Paso 12: Información Escolar

- **Paso**: 12
- **Condición**: Para ver este paso no debe ser rol apoderado, dirigente ni administrador
- **Pregunta**: "¿Cuál es tu información Escolar?"
- **Descripción**: "Seleccione un colegio de la lista para fines estadísticos del grupo, y además seleccione el nivel educacional en el que está actualmente la niña, niño o joven que se esta registrando."
- **Input**: "[Nombre del Colegio, Select, usando 50% del ancho, con label 'Colegio' y con las siguientes opciones {No Conocido, Colegio Los Navíos, Colegio Alma Mater, Colegio Arzobispo Crescente Errázuriz, Colegio Bahía Darwin, Colegio Christian Garden, Colegio Cardenal José María Caro, Colegio Los Pensamientos, Colegio Maria Elena, Colegio Poeta Neruda, Colegio Polivalente Jorge Huneeus Zegers, Colegio San Alberto Magno, Colegio San Marcelo, Colegio Santo Tomás, Colegio Técnico Profesional Aprender, Escuela Básica Profesora Aurelia Rojas Burgos, Escuela Benjamín Subercaseaux, Liceo Bicentenario Nuestra Señora de Guadalupe, Liceo Técnico Profesional Patricio Aylwin Azócar, Saint Christian College, Otro}], [Tipo de Educación, select, usando 50% del ancho, con label 'Estudiante de' y las siguientes opciones {No conocido, Educación Básica, Educación Media, Educación Superior}]"
- **Información**: "Seleccione el colegio al que asiste el niño, niña o joven, e indique el nivel educacional en el que se encuentra el curso que actualmente está cursando.<br>* Estos campos son obligatorios"

---

## Paso 13: Información del apoderado

- **Paso**: 13
- **Condición**: "Para ver este paso no debe ser rol apoderado, dirigente ni administrador"
- **Pregunta**: "¿Cuál es la información de la apoderada (o)?"
- **Descripción**: "Complete la información sobre la o el apoderado (a)."
- **Input**: "[Nombre del apoderado, input de texto, 50% del ancho, con label 'Nombre de la Apoderada (o)'], [Relación del apoderado, select, usando el 25% del ancho, con label 'Relación del Apoderado (a)' y con las siguientes opciones {No Aplica, Madre, Padre, Hermana (o), Tía (o), Abuela (o), Sobrina (o), Hija (o), Otra}], [Teléfono del Apoderado,Input de número con mascara de teléfono, usando el 25% del ancho, con label 'Teléfono del Apoderado (a)']"
- **Información**: "Indica los datos de tu apoderada (o), un teléfono donde ubicarla y selecciona la relación o parentesco que tiene contigo. estos datos serán agregados a los grupos de whatsapp del grupo.<br>* Estos campos son obligatorios"

---

## Paso 14: Información de Pupilos

- **Paso**: 14
- **Condición**: "Para ver este paso debe ser rol apoderado o dirigente"
- **Pregunta**: "¿Quiénes son tus pupilos?"
- **Descripción**: "Indica los nombres de las personas de quien eres apoderada (o)"
- **Input**: "[Nombre del Pupilo, Input de texto, 50% del ancho, con label 'Nombre del pupilo (a)'], [Relación con el pupilo (a), select, 25% del ancho, con label 'Es mi...', con opciones {No Aplica, Madre, Padre, Hermana (o), Tía (o), Abuela (o), Sobrina (o), Hija (o), Otra}], [Unidad del Pupilo, Select, 25% del ancho, con label 'Unidad del Pupilo', con opciones {No Aplica, Manada, Compañía, Tropa, Avanzada, Clan}], estos campos deben ser repetibles a necesidad del usuario, y deben poder enlazarse a perfiles de usuarios ya creados"
- **Información**: "Indica los datos de la pupila (o) tu relación o parentesco con el pupilo, y la unidad a la que pertenece.<br>Seleccione la unidad a la que pertenece la niña, niño o joven de acuerdo a la edad del mismo.<br>Manada - niños y niñas entre 7 y 11 años (unidad mixta).<br>Compañía - niñas y jóvenes mujeres entre 11 y 15 años (unidad femenina).<br>Tropa - niños y jóvenes entre 11 y 15 años (unidad masculina).<br>Avanzada - jóvenes entre 15 y 17 años (unidad mixta).<br>Clan - jóvenes entre 17 y 20 años (unidad mixta).<br><br>* Estos campos son obligatorios"

---

## Paso 15: Contactos de Emergencia

- **Paso**: 15
- **Condición**: Para ver este paso no debe ser rol apoderado
- **Pregunta**: "¿Cuáles son tus **Contactos de Emergencia**?"
- **Descripción**: "Indícanos detalles de a quien avisar en caso de una emergencia"
- **Input**: "[Nombre Contacto de Emergencia, input de texto, 50% del ancho, label 'Nombre Contacto de Emergencia'],[Relación con el contacto, select, 25% del ancho, opciones {No Aplica, Madre, Padre, Hermana (o), Tía (o), Abuela (o), Sobrina (o), Hija (o), Otra}],[Teléfono del Contacto, input de números con mascara de teléfono, 25% del ancho, label 'Teléfono del Contacto'] estos campos deben ser repetibles en cuanto complete todos los datos deben aparecer los siguientes tres debajo"
- **Información**: "Agrega los datos de contactos de emergencia donde podamos dar aviso en caso de alguna situación.<br>* Estos campos son obligatorios"

---

## Paso 16: Sistema de Salud

- **Paso**: 16
- **Condición**: Para ver este paso no debe ser rol apoderado
- **Pregunta**: "¿Cuál es tu Sistema de Salud?"
- **Descripción**: "Indícanos detalles de tu sistema de salud, esta información puede ser necesaria en caso de recurrir a un centro medico, selecciona de la lista tu sistema y de ser necesario especifica más abajo"
- **Input**: "[Sistema de Salud, select, 100% del ancho, label 'Sistema de Salud', opciones {No Aplica, FONASA, Isapre, Particular, Fuerzas Armadas}],[Detalle del Sistema de Salud, sólo aparece si selecciono la opción 'Isapre' en el select anterior, input de texto, 100% del ancho, label 'Nombre de tu Isapre']"
- **Información**: "Selecciona tu sistema de salud, esta información es necesaria para que en caso de emergencia dirigirnos rápidamente al centro de urgencia adecuado.<br>Si es isapre por favor detalla el nombre de la isapre.<br><br>* Estos campos son obligatorios."

---

## Paso 17: Tipo de Sangre 

- **Paso**: 17
- **Condición**: Para ver este paso no debe ser rol apoderado
- **Pregunta**: "¿Cuál es tu tipo de sangre?"
- **Descripción**: "Este dato puede salvar tu vida"
- **Input**: "select, 100% del ancho, sin label, opciones {No Aplica, A+, A-, AB+, AB-, B+, B-, O+, O-, No Sabe}"
- **Información**: "Indique el tipo de sangre, este es un dato vital en caso de una emergencia médica.<br><br>* Este campo es obligatorio"

---

## Paso 18: Alergias 

- **Paso**: 18
- **Condición**: Para ver este paso no debe ser rol apoderado
- **Pregunta**: "¿Tienes alguna Alergia?"
- **Descripción**: "Indícanos las alergias que sabes que tienes"
- **Input**: "textbox, 100% del ancho, sin label"
- **Información**: "Indique primero el tipo de alergia y luego a lo que tenga alergia el miembro beneficiario, por ejemplo: Medicamentos - Ibuprofeno, las categorías en general son Medicamentos, Comida y Otros.<br><br>Si el Niño / Niña o Joven no tiene ninguna alergia por favor indique **Ninguna** o **No Tiene**<br><br>* Este campo es obligatorio"

---

## Paso 19: Antecedentes Médicos

- **Paso**: 19
- **Condición**: Para ver este paso no debe ser rol apoderado
- **Pregunta**: "¿Tiene algún Antecedente Médico?"
- **Descripción**: "Dinos si tienes alguna información medica relevante, si tienes alguna enfermedad crónica o tratamiento especial"
- **Input**: "textbox, 100% del ancho, sin label"
- **Información**: "Indique si ha padecido **enfermedades o Intervenciones quirúrgicas de Relevancia** (indique cuales) Si no presenta ninguna, por favor indicar ninguna o **No Tiene**.<br><br>* Este campo es obligatorio"

---

## Paso 20: Tratamientos Médicos

- **Paso**: 20
- **Condición**: Para ver este paso no debe ser rol apoderado
- **Pregunta**: "¿Está haciendo algún Tratamiento Médico?"
- **Descripción**: "Dinos si tienes alguna información medica relevante, si tienes alguna enfermedad crónica o tratamiento especial"
- **Input**: "textbox, 100% del ancho, sin label"
- **Información**: "Indique si se está efectuando algún **Tratamiento médico que Requiera de cuidados** (descríbalo) Si no tiene tratamientos médicos, por favor indicar **No Tiene**.<br><br>* Este campo es obligatorio"

---

## Paso 21: Medicamentos

- **Paso**: 21
- **Condición**: Para ver este paso no debe ser rol apoderado
- **Pregunta**: "¿Está consumiendo algún medicamento?"
- **Descripción**: "Dinos si consumes algún medicamento con regularidad, dinos los horarios y/o frecuencias"
- **Input**: "textbox, 100% del ancho, sin label"
- **Información**: "Indique si está consumiendo algún Tipo de medicamento (**indique cual y su horario**) Si no consume, por favor escriba __No Consume__.<br><br>* Este campo es obligatorio"

---

## Paso 22: Dieta Alimentaria 

- **Paso**: 22
- **Condición**: Para ver este paso no debe ser rol apoderado
- **Pregunta**: "¿Cuál es tu dieta alimentaria?"
- **Descripción**: "Dinos que no puedes comer, esto es necesario para considerarlo en el menú de campamento"
- **Input**: "checkbox, opciones múltiples, 100% del ancho, centrado, sin label, opciones {No Aplica, Menú general, Menú vegetariano, Menú vegano, Menú celíaco, Intolerante a la lactosa}"
- **Información**: "Selecciona el tipo de comida que consumes en tu vida cotidiana, esta respuesta es importante para establecer el menú de campamento.<br><br>* Este campo es obligatorio"

---

## Paso 23: Autorización de Uso de Fotografías

- **Paso**: 23
- **Condición**: Sin condición previa
- **Pregunta**: "Autorización de Uso de Fotografías"
- **Descripción**: "Autorizo voluntariamente a **Guías y Scouts Nua Mana** y a sus representantes, personas voluntarias y/o personal remunerado autorizados por esta, a capturar, difundir, reproducir y utilizar la imagen y la voz del registrado en fotografías, videos, grabaciones u otros medios visuales o sonoros."
- **Input**: "radio, opciones {si, no}"
- **Información**: "Esto incluye el uso de la imagen y la voz de la persona registrada para promover, difundir y documentar las actividades, eventos y programas de **Guías y Scouts Nua Mana**. La imagen y voz podrán ser utilizadas en materiales informativos, educativos, promocionales, comerciales o para cualquier otro fin que **Guías y Scouts Nua Mana** estime conveniente, sin limitación de tiempo o de territorios. Esto incluye, pero no se limita a, impresiones, publicaciones digitales, sitios web, redes sociales y otros medios o plataformas, actuales o futuros.<br><br>Declaro que la persona registrada ha sido informado sobre esta autorización, que asiente y se encuentra de acuerdo con la utilización de su imagen y voz.<br><br>Reconozco y acepto que **Guías y Scouts Nua Mana** tiene el derecho de editar, modificar, adaptar y alterar el material audiovisual y gráfico de acuerdo con sus necesidades, respetando siempre los principios de moral y buenas costumbres. Entiendo que **Guías y Scouts Nua Mana** puede optar por no utilizar el material capturado o utilizar solo una parte de este, y que no tengo derecho a recibir compensación económica alguna por el uso de dicho material. Aunque la autorización es amplia, tengo el derecho de solicitar la eliminación de la imagen y voz de la persona registrada de futuros materiales mediante notificación escrita a quien corresponda en **Guías y Scouts Nua Mana** (Nivel Grupal, Distrital, Zonal o Nacional), quien procederá a efectuar la eliminación en un plazo razonable.<br><br>Declaro que he leído y comprendido en su totalidad el contenido de este documento y confirmo que soy la tutora o el tutor legal, de la persona registrada mencionada, con la capacidad legal para otorgar esta autorización."

---

## Paso 24: Fé Pública

- **Paso**: 24
- **Condición**: Sin condición previa
- **Pregunta**: "Fé Pública"
- **Descripción**: "Doy fe que los datos contenidos en esta Ficha son verdaderos y no he omitido ninguna información importante."
- **Input**: "radio, opciones {si, no}"
- **Información**: "Guías y Scouts Nua Mana"

---

## Paso 25: Contraseña (sólo para roles sin contraseña predeterminada)

- **Paso**: 25
- **Condición**: Sin condición previa
- **Pregunta**: "¿Cuál será tu Contraseña?"
- **Descripción**: "Crea una contraseña segura para tu cuenta"
- **Input**: "input de tipo contraseña, con confirmación de contraseña, con label 'Contraseña'"
- **Información**: "Crea una contraseña segura para tu cuenta. La contraseña debe tener al menos 6 caracteres. * Este campo es obligatorio"

---

## Notas de Implementación

### Lógica de Navegación
- Si un rol no debe ver ciertos pasos, se salta directamente a la validación final

### Validación
- Cada paso tiene su propia función de validación (validateStepN)
- Todos los campos obligatorios se validan antes de permitir continuar al siguiente paso