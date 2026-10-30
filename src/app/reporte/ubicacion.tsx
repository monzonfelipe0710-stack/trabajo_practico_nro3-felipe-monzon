import { useState } from "react";
import * as Location from "expo-location";
import { Link } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function UbicacionReporte() {
  const [sector, setSector] = useState("");
  const [mensaje, setMensaje] = useState("Todavía no se marcó una ubicación.");
  const sectores = ["Patio", "Estacionamiento", "Pasillo", "Aula"];
  async function marcar() {
    const p = await Location.getForegroundPermissionsAsync();
    if (!p.granted) {
      setMensaje("No hay permiso. Elegí el sector manualmente.");
      return;
    }
    const pos = await Location.getCurrentPositionAsync({});
    setMensaje(p.android?.accuracy === "coarse" || p.ios?.accuracy === "reduced"
      ? "Ubicación aproximada guardada."
      : `Ubicación marcada: ${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`);
  }
  return <View style={s.container}>
    <Text style={s.title}>¿Dónde está el problema?</Text>
    <Text style={s.text}>La ubicación se solicita solo cuando tocás el botón.</Text>
    <Link href={{ pathname: "/permisos/[recurso]", params: { recurso: "ubicacion" } }} style={s.outline}>Continuar para habilitar ubicación</Link>
    <Pressable style={s.button} onPress={marcar}><Text style={s.white}>Usar mi ubicación</Text></Pressable>
    <Text style={s.label}>O elegí el sector a mano:</Text>
    {sectores.map(x => <Pressable key={x} onPress={() => { setSector(x); setMensaje(`Sector elegido: ${x}`); }} style={[s.option, sector === x && s.active]}>
      <Text style={sector === x ? s.white : s.text}>{x}</Text>
    </Pressable>)}
    <Text style={s.text}>{mensaje}</Text>
  </View>;
}
const s = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 13 }, title: { fontSize: 24, fontWeight: "700", color: "#17233D" },
  text: { color: "#35425A", lineHeight: 22 }, outline: { color: "#2457D6", borderWidth: 1, borderColor: "#2457D6", padding: 13, textAlign: "center", overflow: "hidden", borderRadius: 10 },
  button: { backgroundColor: "#2457D6", padding: 15, borderRadius: 10, alignItems: "center" }, white: { color: "white", fontWeight: "700" },
  label: { fontWeight: "700", color: "#35425A" }, option: { backgroundColor: "white", padding: 13, borderRadius: 9 }, active: { backgroundColor: "#2457D6" }
});