import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { reportes } from "../lib/reportes";

export default function Inicio() {
  const [, actualizar] = useState(0);
  useFocusEffect(useCallback(() => { actualizar(n => n + 1); }, []));
  return <ScrollView contentContainerStyle={s.container}>
    <Text style={s.title}>Mis reportes</Text>
    <Text style={s.sub}>Consultá el estado de los desperfectos informados.</Text>
    <Link href="/reporte/nuevo" style={s.primary}>＋ Nuevo reporte</Link>
    {reportes.length === 0
      ? <Text style={s.empty}>Todavía no hay reportes. Tocá “Nuevo reporte” para cargar el primero.</Text>
      : reportes.map(r => <Link key={r.id} href={{ pathname: "/reporte/[id]", params: { id: r.id } }} style={s.card}>
          <Text style={s.cardTitle}>{r.titulo}</Text>
          <Text style={s.sub}>{r.aula || r.sector || "Lugar sin especificar"}</Text>
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
  container: { padding: 20, gap: 14 }, title: { fontSize: 28, fontWeight: "700", color: "#17233D" },
  sub: { color: "#68758C", marginTop: 4 },
  primary: { backgroundColor: "#2457D6", color: "white", padding: 15, borderRadius: 12, textAlign: "center", overflow: "hidden", fontWeight: "700" },
  card: { backgroundColor: "white", padding: 17, borderRadius: 12, gap: 5 },
  cardTitle: { fontSize: 17, fontWeight: "700", color: "#17233D" },
  state: { color: "#2457D6", fontWeight: "600", marginTop: 5 },
  empty: { backgroundColor: "white", padding: 18, borderRadius: 12, color: "#68758C", lineHeight: 22 },
  links: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  link: { color: "#2457D6", fontWeight: "600" }
});