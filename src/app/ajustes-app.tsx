import { useState } from "react";
import { Switch, Text, View, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { usePermiso } from "../hooks/usePermiso";

export default function AjustesApp() {
  const [activo, setActivo] = useState(false);
  const permiso = usePermiso("notificaciones");
  async function cambiar(valor: boolean) {
    setActivo(valor);
    if (!valor) return;
    const r = await permiso.pedir();
    if (!r.granted) {
      setActivo(false);
      Alert.alert("Notificaciones desactivadas", "Podés habilitarlas desde Ajustes.");
    }
  }
  return <View style={s.container}>
    <Text style={s.title}>Avisos de reportes</Text>
    <View style={s.row}>
      <View style={s.copy}>
        <Text style={s.label}>Avisarme cuando se resuelva mi reporte</Text>
        <Text style={s.help}>El permiso se solicita solamente al activar esta opción.</Text>
      </View>
      <Switch value={activo} onValueChange={cambiar} />
    </View>
    <Text style={s.help}>Estado del permiso: {permiso.estado}</Text>
  </View>;
}
const s = StyleSheet.create({
  container: { padding: 20, gap: 18 }, title: { fontSize: 24, fontWeight: "700", color: "#17233D" },
  row: { backgroundColor: "white", padding: 16, borderRadius: 12, flexDirection: "row", alignItems: "center", gap: 10 },
  copy: { flex: 1, gap: 5 }, label: { fontWeight: "700", color: "#35425A" }, help: { color: "#68758C", lineHeight: 21 }
});