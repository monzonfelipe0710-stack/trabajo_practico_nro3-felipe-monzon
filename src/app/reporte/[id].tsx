import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import { avisos, reportes } from "../../lib/reportes";

export default function DetalleReporte() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const reporte = reportes.find(r => r.id === id);
  const [estado, setEstado] = useState(reporte?.estado || "Pendiente");
  if (!reporte) return <Text style={s.empty}>No existe un reporte con ese identificador.</Text>;
  async function simular() {
    setEstado("Resuelto");
    reporte.estado = "Resuelto";
    const permiso = await Notifications.getPermissionsAsync();
    if (permiso.granted) {
      await Notifications.scheduleNotificationAsync({
        content: { title: "Reporte resuelto", body: `Se resolvió: ${reporte.titulo}`, data: { id } },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 10, channelId: "reportes" }
      });
    } else {
      avisos.unshift(`Se resolvió el reporte: ${reporte.titulo}`);
      Alert.alert("Aviso guardado", "Podés verlo en la bandeja de avisos.");
    }
  }
  return <ScrollView contentContainerStyle={s.container}>
    <Text style={s.title}>{reporte.titulo}</Text>
    <Text style={s.state}>{estado}</Text>
    <Text style={s.label}>Descripción</Text><Text style={s.text}>{reporte.descripcion}</Text>
    <Text style={s.label}>Aula / lugar</Text><Text style={s.text}>{reporte.aula || reporte.sector || "Sin especificar"}</Text>
    <Text style={s.label}>Categoría</Text><Text style={s.text}>{reporte.categoria}</Text>
    <Pressable style={s.button} onPress={simular}><Text style={s.white}>Simular resolución</Text></Pressable>
  </ScrollView>;
}
const s = StyleSheet.create({
  container: { padding: 20, gap: 13 }, title: { fontSize: 25, fontWeight: "700", color: "#17233D" },
  state: { color: "#2457D6", fontWeight: "700" }, label: { fontWeight: "700", color: "#35425A", marginTop: 7 },
  text: { color: "#68758C" }, button: { backgroundColor: "#2457D6", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10 },
  white: { color: "white", fontWeight: "700" }, empty: { padding: 20, color: "#35425A" }
});