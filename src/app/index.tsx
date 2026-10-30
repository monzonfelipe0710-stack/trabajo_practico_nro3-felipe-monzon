import { Link } from "expo-router";
import { ScrollView, Text, View, StyleSheet } from "react-native";

const reportes = [
  { id: "1", titulo: "Luz quemada", lugar: "Aula 4", estado: "Pendiente" },
  { id: "2", titulo: "Canilla con pérdida", lugar: "Baño planta baja", estado: "En curso" },
  { id: "3", titulo: "Proyector sin señal", lugar: "Aula 2", estado: "Resuelto" }
];

export default function Inicio() {
  return <ScrollView contentContainerStyle={s.container}>
    <Text style={s.title}>Mis reportes</Text>
    <Text style={s.sub}>Consultá el estado de los desperfectos informados.</Text>
    <Link href="/reporte/nuevo" style={s.primary}>＋ Nuevo reporte</Link>
    {reportes.map(r => <Link key={r.id} href={{ pathname: "/reporte/[id]", params: { id: r.id } }} style={s.card}>
      <Text style={s.cardTitle}>{r.titulo}</Text>
      <Text style={s.sub}>{r.lugar}</Text>
      <Text style={s.state}>{r.estado}</Text>
    </Link>)}
    <View style={s.links}>
      <Link href="/avisos" style={s.link}>Avisos</Link>
      <Link href="/permisos" style={s.link}>Permisos</Link>
      <Link href="/ajustes-app" style={s.link}>Ajustes</Link>
    </View>
  </ScrollView>;
}
const s = StyleSheet.create({
  container: { padding: 20, gap: 14 },
  title: { fontSize: 28, fontWeight: "700", color: "#17233D" },
  sub: { color: "#68758C", marginTop: 4 },
  primary: { backgroundColor: "#2457D6", color: "white", padding: 15, borderRadius: 12, textAlign: "center", overflow: "hidden", fontWeight: "700" },
  card: { backgroundColor: "white", padding: 17, borderRadius: 12, gap: 5 },
  cardTitle: { fontSize: 17, fontWeight: "700", color: "#17233D" },
  state: { color: "#2457D6", fontWeight: "600", marginTop: 5 },
  links: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  link: { color: "#2457D6", fontWeight: "600" }
});