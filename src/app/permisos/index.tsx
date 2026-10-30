import { Link } from "expo-router";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { usePermiso } from "../../hooks/usePermiso";

function Fila({ nombre, recurso }: { nombre: string; recurso: "camara" | "ubicacion" | "notificaciones" }) {
  const p = usePermiso(recurso);
  return <Link href={{ pathname: "/permisos/[recurso]", params: { recurso } }} style={s.card}>
    <View>
      <Text style={s.name}>{nombre}</Text>
      <Text style={s.detail}>{p.estado}{p.parcial ? " · acceso parcial/aproximado" : ""}</Text>
    </View>
    <Text style={s.arrow}>›</Text>
  </Link>;
}

export default function PanelPermisos() {
  return <ScrollView contentContainerStyle={s.container}>
    <Text style={s.title}>Permisos del dispositivo</Text>
    <Text style={s.help}>Podés consultar el estado y habilitar cada función cuando la necesites.</Text>
    <Fila nombre="Cámara" recurso="camara" />
    <Fila nombre="Ubicación en primer plano" recurso="ubicacion" />
    <Fila nombre="Notificaciones" recurso="notificaciones" />
  </ScrollView>;
}
const s = StyleSheet.create({
  container: { padding: 20, gap: 14 }, title: { fontSize: 24, fontWeight: "700", color: "#17233D" },
  help: { color: "#68758C", lineHeight: 21 }, card: { backgroundColor: "white", padding: 17, borderRadius: 12, flexDirection: "row", justifyContent: "space-between" },
  name: { fontWeight: "700", color: "#17233D" }, detail: { color: "#68758C", marginTop: 5, textTransform: "capitalize" }, arrow: { fontSize: 25, color: "#2457D6" }
});