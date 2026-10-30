import { useState } from "react";
import { Link } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function Escanear() {
  const [permiso, pedirPermiso] = useCameraPermissions();
  const [aula, setAula] = useState("");
  if (!permiso) return <View style={s.center}><Text>Consultando permiso…</Text></View>;
  if (!permiso.granted) return <View style={s.container}>
    <Text style={s.title}>{permiso.canAskAgain ? "Necesitamos la cámara" : "Cámara bloqueada"}</Text>
    <Text style={s.text}>Usamos la cámara para leer el QR pegado en la puerta del aula.</Text>
    {permiso.canAskAgain
      ? <Link href={{ pathname: "/permisos/[recurso]", params: { recurso: "camara" } }} style={s.button}>Continuar</Link>
      : <Text style={s.text}>Habilitá la cámara desde Ajustes o escribí el aula manualmente.</Text>}
    <TextInput style={s.input} placeholder="Código del aula" value={aula} onChangeText={setAula} />
    <Text style={s.result}>Aula ingresada: {aula || "—"}</Text>
  </View>;
  return <View style={s.container}>
    <CameraView style={s.camera} facing="back" onBarcodeScanned={({ data }) => setAula(data)} />
    <Text style={s.text}>Enfocá el código QR del aula.</Text>
    <TextInput style={s.input} placeholder="También podés escribir el aula" value={aula} onChangeText={setAula} />
    <Text style={s.result}>Código: {aula || "Esperando QR…"}</Text>
  </View>;
}
const s = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 14 }, center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", color: "#17233D" }, text: { color: "#35425A", lineHeight: 22 },
  camera: { height: 320, borderRadius: 12, overflow: "hidden" }, input: { backgroundColor: "white", padding: 14, borderRadius: 9 },
  result: { color: "#2457D6", fontWeight: "700" }, button: { backgroundColor: "#2457D6", color: "white", padding: 15, textAlign: "center", overflow: "hidden", borderRadius: 10 }
});