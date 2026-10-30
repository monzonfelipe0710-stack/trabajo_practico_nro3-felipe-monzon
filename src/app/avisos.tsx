import { ScrollView, Text, StyleSheet } from "react-native";
import { avisos } from "../lib/reportes";

export default function Avisos() {
  return <ScrollView contentContainerStyle={s.container}>
    <Text style={s.title}>Bandeja de avisos</Text>
    {avisos.length === 0
      ? <Text style={s.empty}>Todavía no tenés avisos. Cuando se resuelva un reporte sin notificaciones, aparecerá acá.</Text>
      : avisos.map((a, i) => <Text key={i} style={s.card}>{a}</Text>)}
  </ScrollView>;
}
const s = StyleSheet.create({
  container: { padding: 20, gap: 12 }, title: { fontSize: 24, fontWeight: "700", color: "#17233D" },
  empty: { backgroundColor: "white", padding: 18, borderRadius: 10, color: "#68758C", lineHeight: 22 },
  card: { backgroundColor: "white", padding: 16, borderRadius: 10, color: "#35425A" }
});