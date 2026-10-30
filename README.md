# Mantenimiento IPF

Aplicación móvil del Trabajo Práctico N.º 3 — Permisos móviles (React Native, Expo SDK 57 y Expo Router).

## Ejecutar

```bash
npm install
npx expo install expo-camera expo-location expo-image-picker expo-notifications expo-router
npx expo start
``

Para revisar tipos: `npm run typecheck`. Para probar permisos nativos, generar una development build; Expo Go no usa los textos nativos propios de esta aplicación.

## Rutas

```text
src/
  app/
    _layout.tsx
    index.tsx
    avisos.tsx
    ajustes-app.tsx
    permisos/
      index.tsx
      [recurso].tsx
    reporte/
      nuevo.tsx
      escanear.tsx
      foto.tsx
      ubicacion.tsx
      [id].tsx
  hooks/
    usePermiso.ts
  lib/
    reportes.ts
``

## Permisos

| Recurso | Módulo | Cuándo se pide | Alternativa |
|---|---|---|---|
| Cámara | expo-camera | Al escanear QR o sacar foto | Escribir el aula o elegir foto |
| Ubicación | expo-location | Al tocar “Usar mi ubicación” | Elegir patio, estacionamiento, pasillo o aula |
| Notificaciones | expo-notifications | Al activar el interruptor | Bandeja interna /avisos |
| Fotos | expo-image-picker | No se pide permiso de galería; abre el selector del sistema | Adjuntar más tarde |

## Configuración de permisos

El bloque `expo.plugins` de `app.json` configura los textos de cámara y ubicación. En cámara se desactiva el micrófono con `microphonePermission: false` y `recordAudioAndroid: false`. Se bloquean `SYSTEM_ALERT_WINDOW`, `READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO` y `RECORD_AUDIO`: la app no necesita ventanas superpuestas, acceso amplio a la galería ni audio.

Los permisos se declaran en `app.json`; los archivos nativos generados no deben editarse manualmente porque Expo los regenera.

## Pruebas pendientes en dispositivo

La implementación debe verificarse en Expo Go y en una development build Android o iOS. Antes de entregar, agregar capturas reales del escáner en sus cuatro estados, ubicación concedida/denegada, selector de fotos, notificación y panel antes/después de volver de Ajustes. No se incluyen capturas inventadas.
