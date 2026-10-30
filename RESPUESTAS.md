# RESPUESTAS — Trabajo Práctico N.º 3

Respuestas breves de las partes A a F. Se prioriza explicar el comportamiento de Android, iOS y Expo con palabras simples.

## Parte A · ¿Qué es un permiso y por qué existe?

### A1. Conceptos

**a)** Un permiso es una autorización para acceder a una función o dato protegido del dispositivo. La app explica para qué lo necesita, el sistema operativo muestra y aplica la solicitud, y la persona decide.

**b)** La sandbox es el espacio aislado de cada aplicación. Evita que una app lea libremente los datos privados de otra. Sin permisos puede usar sus propios archivos, mostrar pantallas, hacer cálculos y usar recursos públicos habilitados.

**c)** Los permisos existen para proteger la privacidad (contactos), la seguridad (cámara), controlar recursos sensibles del dispositivo (micrófono) y dar control a la persona usuaria (ubicación).

**d)** La visita es la app, el portero es el sistema operativo y el dueño es la persona usuaria. Que el portero recuerde significa que el sistema conserva la decisión y puede no volver a preguntar.

### A2. Declarar y solicitar

| | Declarar (compilar) | Solicitar (ejecutar) |
|---|---|---|
| Qué se hace | Se informa qué capacidades podría usar la app. | Se pide autorización cuando la función se necesita. |
| Android | `AndroidManifest.xml`, normalmente generado desde la configuración Expo. | API de permisos de Android o módulo Expo. |
| iOS | Claves y textos de propósito en `Info.plist`. | API del sistema mediante el módulo Expo. |
| Expo | `app.json` / `app.config.ts` y plugins. | Funciones `request…PermissionsAsync()` o hooks del módulo. |
| Si se omite | El sistema puede impedir el acceso o la build puede fallar. | La app no obtiene autorización y debe ofrecer alternativa. |

### A3. Verdadero o falso

- **a) F.** El diálogo lo presenta el sistema operativo, no un componente de la app.
- **b) V.** En Expo, la configuración fuente es `app.json` o `app.config.ts`; los archivos nativos se generan.
- **c) F.** Agregar una clave de privacidad modifica la configuración nativa y requiere una nueva build.
- **d) F.** Si el permiso no está declarado, Android no tiene por qué mostrar el diálogo y puede fallar el acceso.
- **e) F.** `expo-permissions` está obsoleto; se usan los módulos específicos.
- **f) V.** Las notificaciones de iOS no requieren una clave de propósito en `Info.plist`.
- **g) V.** En fotos con acceso limitado, el estado puede ser `granted` y el detalle está en `accessPrivileges`.
- **h) F.** En iOS reinstalar no es un método confiable para reiniciar decisiones; conviene usar Ajustes o las herramientas de simulación.

### A4. Estados de un permiso

**a)** Flujo habitual: sin decidir → concedido o denegado. Si se deniega y aún se puede preguntar, se puede volver a solicitar. Si queda bloqueado, la app debe llevar a Ajustes. En Android dos rechazos pueden impedir nuevas preguntas; en iOS, para muchos permisos, el primer rechazo ya obliga a ir a Ajustes.

**b)**

| Estado | status | canAskAgain | ¿Puede aparecer el diálogo? |
|---|---|---|---|
| Sin decidir | `undetermined` | `true` | Sí |
| Concedido | `granted` | normalmente `true` | No hace falta |
| Denegado, preguntable | `denied` | `true` | Sí |
| Bloqueado | `denied` | `false` | No; abrir Ajustes |

## Parte B · Android

### B1. Clasificación

| Permiso | Tipo | Cómo se obtiene |
|---|---|---|
| INTERNET | Instalación/normal | Se declara; se concede automáticamente. |
| CAMERA | Tiempo de ejecución | Diálogo del sistema. |
| VIBRATE | Instalación/normal | Se declara; concesión automática. |
| SYSTEM_ALERT_WINDOW | Especial | La persona lo habilita desde Ajustes. |
| POST_NOTIFICATIONS | Tiempo de ejecución (Android 13+) | Diálogo del sistema. |
| ACCESS_NETWORK_STATE | Instalación/normal | Se declara; concesión automática. |
| READ_CONTACTS | Tiempo de ejecución | Diálogo del sistema. |
| SCHEDULE_EXACT_ALARM | Especial | Acceso especial desde Ajustes, según versión y caso. |
| RECORD_AUDIO | Tiempo de ejecución | Diálogo del sistema. |
| MANAGE_EXTERNAL_STORAGE | Especial | Acceso amplio habilitado desde Ajustes y sujeto a políticas de Play. |

### B2. Grupos y nombres

**a)** Un grupo reúne permisos relacionados. Si se solicitan ubicación precisa y aproximada juntas, normalmente se presenta un único diálogo de ubicación.

**b)** El prefijo es `android.permission.`. Cámara: `android.permission.CAMERA`.

**c)** Los permisos de firma solo se conceden a apps firmadas con el mismo certificado que la app que declara el permiso (o con condiciones de sistema). No son para apps comunes porque no controlamos la firma de otras aplicaciones.

### B3. Leer el manifiesto

**a)** `INTERNET` se concede automáticamente. `CAMERA`, `ACCESS_COARSE_LOCATION`, `ACCESS_FINE_LOCATION` y `POST_NOTIFICATIONS` requieren solicitud en tiempo de ejecución en las versiones que los aplican.

**b)** `maxSdkVersion="32"` limita esa declaración hasta Android 12L. Desde Android 13 se usan permisos multimedia separados, como `READ_MEDIA_IMAGES` y `READ_MEDIA_VIDEO`; Android 14 también permite acceso seleccionado.

**c)** `tools:node="remove"` elimina del manifiesto final un permiso agregado por una dependencia. En Expo se configura, por ejemplo:
```json
{
  "expo": {
    "android": {
      "blockedPermissions": ["android.permission.RECORD_AUDIO"]
    }
  }
}
```

**d)** En `expo.android.permissions` se agrega `android.permission.SCHEDULE_EXACT_ALARM`.

**e)** Expo puede regenerar el manifiesto en cada prebuild, por eso los cambios manuales se pierden. `blockedPermissions` se aplica al generar una build nativa; no modifica Expo Go.

### B4. Así pregunta Android

**a)** No se puede personalizar libremente el texto del diálogo. La explicación propia debe mostrarse antes, en una pantalla de contexto.

**b)** “Mientras la app está en uso” permite el acceso cuando la app está activa. “Solo esta vez” concede acceso temporal. Está disponible para permisos como ubicación, cámara y micrófono, según versión.

**c)** En Android 11+ dos rechazos pueden hacer que el sistema no vuelva a mostrar el diálogo; `canAskAgain` pasa a `false`.

**d)** La ubicación aproximada sirve para mostrar servicios o puntos de interés de una zona. No alcanza para navegación precisa hasta una puerta o registrar una ruta exacta.

**e)** Al revocar permisos desde Ajustes, Android puede terminar el proceso de la app. Al volver, hay que consultar el permiso nuevamente.

### B5. Android, versión por versión

| Cambio | Versión aproximada | Implicancia |
|---|---|---|
| Permisos en tiempo de ejecución | Android 6 / API 23 | Pedir permisos sensibles al usar la función. |
| Ubicación en segundo plano separada | Android 10 / API 29 | Solicitar primero ubicación en uso y después segundo plano. |
| Dos rechazos equivalen a no volver a preguntar | Android 11 / API 30 | Revisar `canAskAgain` y ofrecer Ajustes. |
| Precisa o aproximada | Android 12 / API 31 | La app debe funcionar con precisión reducida. |
| `POST_NOTIFICATIONS` | Android 13 / API 33 | Pedir permiso para notificaciones. |
| Fotos seleccionadas | Android 14 / API 34 | Contemplar acceso parcial y el selector del sistema. |
| Permiso de red local | Android 17 / API 37 | Revisar el nuevo permiso si la app descubre dispositivos de la red local. |

El `targetSdkVersion` indica a qué versión de Android apunta la app y qué reglas modernas debe cumplir. Para este práctico se trabaja con Expo SDK 57; el target exacto debe comprobarse en la build generada. Google Play exige target API 36 desde el 31 de agosto de 2026.

## Parte C · iOS

### C1. Claves del Info.plist

| Recurso | Clave |
|---|---|
| Cámara | `NSCameraUsageDescription` |
| Micrófono | `NSMicrophoneUsageDescription` |
| Ubicación en uso | `NSLocationWhenInUseUsageDescription` |
| Ubicación siempre | `NSLocationAlwaysAndWhenInUseUsageDescription` |
| Fotos (leer) | `NSPhotoLibraryUsageDescription` |
| Fotos (solo guardar) | `NSPhotoLibraryAddUsageDescription` |
| Contactos | `NSContactsUsageDescription` |
| Face ID | `NSFaceIDUsageDescription` |
| Rastreo entre apps | `NSUserTrackingUsageDescription` |
| Notificaciones | No lleva clave de propósito en Info.plist. |

### C2. Sin texto, no hay permiso

**a)** Si falta la descripción, el acceso puede provocar el cierre de la app. En la validación de App Store también puede rechazarse la build; el error habitual de Xcode es el de acceso a datos sensibles sin descripción de uso.

**b)** Para muchos permisos iOS muestra el diálogo una sola vez. Si la persona rechaza, la app debe explicar cómo habilitarlo desde Ajustes.

**c)** El sistema arma el diálogo y los botones; el desarrollador escribe el motivo. En Expo se configura en los plugins de `app.json`.

**d)** Una dependencia puede declarar una API protegida aunque la app no la use. Se debe quitar esa capacidad de la configuración nativa o agregar una descripción válida si realmente se necesita.

### C3. Probador de textos

| Texto | ¿Aprobado? | Versión mejorada |
|---|---|---|
| “Necesitamos tu ubicación.” | No, no explica el beneficio. | “Usamos tu ubicación para mostrar los puntos de reciclaje cercanos.” |
| “Para mejorar tu experiencia.” | No, es demasiado general. | “Usamos tu ubicación para indicar dónde se encuentra el desperfecto.” |
| “Usamos tu ubicación para mostrarte las farmacias de turno más cercanas.” | Sí, explica el uso concreto. | — |
| “La app no funciona sin ubicación.” | No, es coercitivo y no explica el beneficio. | “Usamos tu ubicación para marcar el lugar del reporte; también podés elegir el sector manualmente.” |
| “Ubicación requerida por el sistema.” | No, no explica el beneficio. | “Usamos tu ubicación para señalar el sector donde está el problema.” |

### C4. Acceso parcial y gradual

| Caso | iOS | En Expo |
|---|---|---|
| Fotos limitadas | iOS 14+ | `accessPrivileges === 'limited'`; selector para ampliar selección. |
| Ubicación aproximada | iOS 14+ | Revisar precisión en la respuesta de ubicación y solicitar precisión temporal si corresponde. |
| Permitir una vez | iOS 13+ para ubicación | Solicitar ubicación en primer plano; la concesión es temporal. |
| De “al usar” a “Siempre” | iOS 13+ | Solicitar primero When In Use y luego Always. |
| Notificaciones provisionales | iOS 12+ | `requestPermissionsAsync({ allowProvisional: true })` y revisar estado. |
| App Tracking Transparency | iOS 14.5+ | `expo-tracking-transparency` y su función de solicitud. |

La versión mínima de iOS de Expo SDK 57 limita qué casos de la tabla pueden probarse. Los casos anteriores a esa versión mínima no se pueden tomar como compatibles con el proyecto; revisar el mínimo declarado por el SDK al generar la build.

### C5. Android vs iOS

| Tema | Android | iOS |
|---|---|---|
| Declaración | AndroidManifest.xml | Info.plist |
| Texto del diálogo | Texto estándar del sistema; explicación previa propia | El sistema muestra el texto de propósito configurado por la app |
| Oportunidades | Puede volver a preguntar mientras `canAskAgain` sea true | Muchos permisos muestran el diálogo una vez; luego Ajustes |
| Una vez | Disponible para ciertos permisos | “Permitir una vez” para ubicación |
| Notificaciones | POST_NOTIFICATIONS desde Android 13 | Autorización del sistema; puede ser provisional |
| Ubicación segundo plano | Permiso separado | Flujo gradual desde “al usar” a “Siempre” |
| Si falta declaración | El acceso falla o no se solicita correctamente | Puede cerrarse la app o rechazarse la build |

## Parte D · Expo

### D1. Módulos y funciones

| Necesidad | Módulo | Función |
|---|---|---|
| Escanear QR | expo-camera | `useCameraPermissions()` |
| Grabar video con sonido | expo-camera | `useCameraPermissions()` y permiso de micrófono |
| Mostrar farmacias cercanas | expo-location | `useForegroundPermissions()` |
| Seguir envío en segundo plano | expo-location | `requestBackgroundPermissionsAsync()` después de foreground |
| Recordatorio | expo-notifications | `getPermissionsAsync()` / `requestPermissionsAsync()` |
| Nota de voz | expo-audio | `requestRecordingPermissionsAsync()` |
| Galería propia | expo-media-library | Permiso de biblioteca, si se necesita leerla completa |
| Publicidad personalizada iOS | expo-tracking-transparency | Solicitud ATT |

Un tutorial que importa `expo-permissions` está desactualizado: ese paquete no es la forma recomendada para SDK 57.

### D2. Consultar, pedir y hook

**a)** `get…PermissionsAsync()` consulta el estado sin mostrar diálogo. `request…PermissionsAsync()` solicita el permiso y puede mostrarlo.

**b)** El hook devuelve: respuesta actual, función para pedir y función para consultar. En el primer render la respuesta puede ser `null`; hay que mostrar carga hasta conocer el estado.

**c)** Si `canAskAgain` es false, pedir otra vez no muestra el diálogo; se debe abrir Ajustes. Un bucle de solicitudes insiste, confunde y no resuelve el bloqueo.

### D3. Leer la respuesta

| Respuesta | Qué hace la app |
|---|---|
| `null` | Mostrar carga y esperar la consulta. |
| `{ status: 'granted', granted: true }` | Habilitar la función. |
| `{ status: 'undetermined', canAskAgain: true }` | Explicar el beneficio y permitir solicitar. |
| `{ status: 'denied', canAskAgain: true }` | Ofrecer alternativa y permitir volver a pedir cuando la persona lo intente. |
| `{ status: 'denied', canAskAgain: false }` | Mostrar cómo abrir Ajustes. |
| `{ status: 'granted', accessPrivileges: 'limited' }` | Funcionar con los elementos seleccionados y permitir ampliar selección. |
| `{ status: 'granted', android: { accuracy: 'coarse' } }` | Funcionar con ubicación aproximada, sin mostrar precisión falsa. |

Los dos campos principales son `status` (si está concedido) y `canAskAgain` (si se puede volver a preguntar).

### D4. Simulación del ciclo completo

**Android 14, recién instalada:**

| Paso | Resultado esperado | canAskAgain | Diálogo |
|---|---|---|---|
| 1. Consultar | `undetermined` | true | No |
| 2. Pedir y rechazar | `denied` | true | Sí |
| 3. Pedir y rechazar otra vez | `denied` | false | Sí, última oportunidad |
| 4. Pedir | `denied` | false | No |
| 5. Habilitar en Ajustes y consultar | `granted` | true | No |
| 6. Volver sin consultar | La pantalla conserva el estado anterior hasta actualizar | — | No |

En iOS cambia el paso 3: el sistema normalmente no vuelve a mostrar el diálogo después del primer rechazo; se debe ir a Ajustes. “Permitir una vez” concede acceso temporal y puede volver a requerir autorización al cerrar y abrir la app.

### D5. Configurar app.json

```json
{
  "expo": {
    "plugins": [
      ["expo-camera", {
        "cameraPermission": "Usamos tu cámara para leer el QR del aula.",
        "microphonePermission": false,
        "recordAudioAndroid": false
      }],
      ["expo-location", {
        "locationWhenInUsePermission": "Usamos tu ubicación para mostrar los puntos de reciclaje cercanos."
      }]
    ],
    "android": {
      "blockedPermissions": [
        "android.permission.RECORD_AUDIO",
        "android.permission.SYSTEM_ALERT_WINDOW"
      ]
    }
  }
}
```

La cámara puede agregar `RECORD_AUDIO` porque el módulo también permite grabar video con sonido. Se desactiva para respetar el mínimo privilegio.

### D6. Expo Go no es tu app

**a)** Expo Go usa su propio binario y sus propios textos nativos; no incorpora los textos de propósito configurados por cada proyecto.

**b)** En Expo Go se pueden probar pantallas y buena parte de la lógica JavaScript. Push remoto en Android y permisos/servicios nativos específicos, como ubicación en segundo plano, requieren development build y configuración propia.

**c)** Comandos:
```bash
npx expo prebuild
npx expo run:android
```
También se puede compilar una development build con EAS Build.

**d)** Android (dispositivo conectado):
```bash
adb shell pm revoke com.ipf.mantenimiento android.permission.CAMERA
``
Simulador iOS:
```bash
xcrun simctl privacy booted reset camera com.ipf.mantenimiento
``
Los comandos concretos dependen del paquete y del recurso que se quiera reiniciar.

## Parte E · Leer y corregir código

### E1. Errores de cámara

Problemas: se usa `permiso.status` sin comprobar si el hook todavía devuelve `null`; no hay estado de carga; no se diferencia denegación preguntable de bloqueo; el botón no muestra explicación de contexto; no hay alternativa manual.

Versión simple del patrón:
```tsx
const [permiso, pedirPermiso] = useCameraPermissions();

if (!permiso) return <Text>Consultando permiso…</Text>;
if (permiso.granted) return <CameraView style={{ flex: 1 }} />;

if (!permiso.canAskAgain) {
  return <Text>Cámara bloqueada. Abrí Ajustes o escribí el aula manualmente.</Text>;
}
return <Explicacion texto="Usamos la cámara para leer el QR del aula.">
  <Button title="Continuar" onPress={() => pedirPermiso()} />
</Explicacion>;
```

### E2. Orden de ubicación

**a)** Está mal pedir segundo plano antes que primer plano. iOS requiere autorización “al usar” antes de solicitar “Siempre”; Android 11+ lleva al usuario a Ajustes para segundo plano.

**b)** Primero solicitar foreground; si se concede y la función realmente necesita seguimiento, recién entonces solicitar background.

**c)** Consultar permiso foreground; si no está concedido devolver `null`. Obtener posición con `getCurrentPositionAsync`. Devolver latitud, longitud y `aproximada`, considerando `android.accuracy === 'coarse'` o precisión reducida en iOS.

**d)** No. Para farmacias cercanas alcanza ubicación en primer plano. Google Play exige justificar y limitar el acceso en segundo plano, con declaración y revisión cuando corresponda.

### E3. Notificaciones mudas

**a)** En Android 13+ se debe crear primero el canal y luego solicitar `POST_NOTIFICATIONS`.

**b)** En Android 12 o anterior no existe ese permiso de ejecución; las notificaciones no requieren ese diálogo.

**c)** iOS permite autorización provisional. Se solicita con `allowProvisional: true` y se revisa el estado devuelto.

**d)** Pedirlo cuando la persona activa “Avisarme cuando se resuelva mi reporte”. Mal momento: apenas abre la app, antes de explicar el beneficio.

### E4. Fotos sin pedir permiso

| Necesidad | Herramienta | Permiso |
|---|---|---|
| Elegir foto de perfil | ImagePicker / selector del sistema | No requiere acceso completo a galería |
| Sacar foto | expo-camera | Cámara |
| Editor con toda la galería | expo-media-library | Permiso de fotos correspondiente |
| Adjuntar comprobante | ImagePicker | Selector del sistema, sin permiso de galería |

Google Play restringe los permisos de lectura amplia de imágenes y videos desde Android 13 (API 33), porque dan acceso a muchos archivos privados. “El mejor permiso” es el mínimo que permite cumplir la función; para elegir una imagen puntual, usar el selector del sistema.

### E5. Volver de Ajustes

Los espacios se completan así:
```ts
const estabaAfuera =
  anterior.current === 'background' || anterior.current === 'inactive';
if (estabaAfuera && nuevo === 'active') revisar();
return () => sub.remove();
```

**a)** Los hooks no se actualizan solos porque el cambio se hizo fuera de la app; hay que consultar al volver.

**b)** Pasar la función de consulta del hook de cámara, por ejemplo `consultarPermiso`.

**c)** El permiso puede cambiar desde Ajustes. Un store permanente queda desactualizado y puede habilitar una función que ya no está autorizada.

## Parte F · Buenas prácticas y tiendas

### F1. Pedir en contexto

| App y permiso | Cuándo pedirlo | Alternativa |
|---|---|---|
| Delivery · ubicación | Al tocar “Usar mi ubicación” para la dirección | Ingresar dirección manual |
| Billetera · cámara | Al escanear QR o documento | Carga manual de datos |
| Red social · contactos | Al elegir buscar amistades | Buscar por nombre o usuario |
| Mensajería · micrófono | Al grabar audio | Enviar texto |
| Turnos médicos · notificaciones | Al activar recordatorios | Consultar turnos dentro de la app |
| Editor · galería completa | Al entrar a una función que necesita explorar toda la biblioteca | Selector del sistema para elegir una foto |

Pedir cuatro permisos al abrir provoca rechazo automático porque la persona todavía no conoce el beneficio y siente que la app pide datos sin motivo.

### F2. Pantalla previa

**a)** Debe explicar qué dato se usa, para qué beneficio concreto y qué acción ocurrirá al continuar.

**b)** El botón dice “Continuar” porque el diálogo oficial lo presenta el sistema; la app no puede anticipar la decisión de la persona.

**c)** La pauta de Apple pide que la persona pueda rechazar o cerrar la explicación sin ser forzada a conceder el permiso. No se debe bloquear el uso general de la app.

**d)** Si está bloqueado, explicar cómo habilitarlo en Ajustes y ofrecer el botón “Abrir Ajustes”, sin volver a pedir.

### F3. Mínimo privilegio

**a)** Ubicación aproximada: alcanza para puntos de reciclaje del barrio.

**b)** Para registrar una carrera con el celular en el bolsillo se necesita ubicación en segundo plano, solicitada después de la de primer plano y con justificación.

**c)** Selector del sistema: solo se necesita subir una foto del DNI, no leer toda la galería.

**d)** expo-camera sin micrófono: escanear un QR no necesita grabar sonido.

### F4. Tiendas

**a)** Google Play: declarar permisos necesarios y justificar permisos sensibles; completar la sección de seguridad de datos. App Store: incluir textos de propósito correctos y declarar prácticas de privacidad/uso de datos.

**b)** `PrivacyInfo.xcprivacy` describe prácticas de privacidad, uso de APIs requeridas y dominios de seguimiento. En Expo se configura mediante el soporte de privacidad de los módulos/plugins y la configuración nativa generada.

**c)** Android 17 incorpora controles de red local y cambios de permisos; el requisito específico de Google Play para apps que hoy usan `READ_CONTACTS`, con fecha 27/01/2027, debe verificarse en la documentación vigente de Android/Play antes de publicar. No se debe agregar un permiso sin confirmar el alcance del cambio.

### F5. Errores comunes

**a)** Falta una clave de propósito en `Info.plist`. Agregar la descripción correspondiente en el plugin de Expo y generar una nueva build.

**b)** La build puede tener una declaración nativa faltante o una configuración incorrecta. Revisar `app.json`, permisos bloqueados y manifiesto generado; probar en una instalación limpia.

**c)** La app no consulta el permiso al volver de Ajustes. Escuchar `AppState` y volver a ejecutar la consulta cuando pasa a `active`.

**d)** Se llama a `request…()` en cada render. La solicitud debe ejecutarse únicamente por una acción de la persona, no durante el renderizado.

**e)** Las notificaciones son opcionales. La app debe permitir entrar y consultar turnos aunque se deniegue el permiso, ofreciendo recordatorios dentro de la app.

---

**Nota de implementación:** la app de este repositorio es una demostración local sencilla. Los reportes y avisos se guardan en memoria y se pierden al cerrar la app; no hay backend ni persistencia. Las capturas solicitadas por la consigna deben tomarse en un dispositivo o development build real.
