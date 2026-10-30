import { useState } from "react";
import { Link } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { View, Text, Pressable, Image, StyleSheet, Alert } from "react-native";

export default function FotoReporte() {
  const [permiso] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const [abrirCamara, setAbrirCamara] = useState(false);
  if (abrirCamara && permiso?.granted) return <View style={s.container}>
    <CameraView style={s.camera} facing="back" />
    <Text style={s.text}>Vista de cámara lista. Usá el selector para adjuntar una imagen al reporte.</Text>
    <Pressable style={s.button} onPress={() => setAbrirCamara(false)}><Text style={s.white}>Volver</Text></Pressable>
  </View>;
  return <View style={s.container}>
    <Text style={s.title}>Adjuntá una foto</Text>
    <Text style={s.text}>Elegir una imagen usa el selector del sistema y no necesita permiso de galería.</Text>
    <Pressable style={s.button} onPress={async () => {
      const r = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], quality: 0.7 });
      if (!r.canceled) setUri(r.assets[0].uri);
    }}><Text style={s.white}>Elegir de la galería</Text></Pressable>
    {permiso?.granted
      ? <Pressable style={s.outline} onPress={() => setAbrirCamara(true)}><Text style={s.blue}>Sacar foto</Text></Pressable>
      : <Link href={{ pathname: "/permisos/[recurso]", params: { recurso: "camara" } }} style={s.outline}>Habilitar cámara para sacar foto</Link>}
    {uri ? <Image source={{ uri }} style={s.preview} /> : null}
  </View>;
}
const s = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16 }, title: { fontSize: 24, fontWeight: "700", color: "#17233D" },
  text: { color: "#35425A", lineHeight: 22 }, button: { backgroundColor: "#2457D6", padding: 15, borderRadius: 10, alignItems: "center" },
  white: { color: "white", fontWeight: "700" }, outline: { borderWidth: 1, borderColor: "#2457D6", padding: 15, borderRadius: 10, alignItems: "center", color: "#2457D6" },
  blue: { color: "#2457D6", fontWeight: "700" }, preview: { width: "100%", height: 240, borderRadius: 10 }, camera: { height: 300 }
});