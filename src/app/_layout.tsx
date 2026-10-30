import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return <>
    <StatusBar style="dark" />
    <Stack screenOptions={{
      headerStyle: { backgroundColor: "#2457D6" },
      headerTintColor: "#fff",
      contentStyle: { backgroundColor: "#F5F7FB" }
    }}>
      <Stack.Screen name="index" options={{ title: "Mantenimiento IPF" }} />
      <Stack.Screen name="reporte/nuevo" options={{ title: "Nuevo reporte" }} />
      <Stack.Screen name="reporte/escanear" options={{ title: "Escanear aula" }} />
      <Stack.Screen name="reporte/foto" options={{ title: "Adjuntar foto" }} />
      <Stack.Screen name="reporte/ubicacion" options={{ title: "Ubicación" }} />
      <Stack.Screen name="reporte/[id]" options={{ title: "Detalle del reporte" }} />
      <Stack.Screen name="avisos" options={{ title: "Avisos" }} />
      <Stack.Screen name="permisos/index" options={{ title: "Permisos" }} />
      <Stack.Screen name="permisos/[recurso]" options={{ presentation: "modal", title: "Antes de continuar" }} />
      <Stack.Screen name="ajustes-app" options={{ title: "Ajustes de la app" }} />
    </Stack>
  </>;
}