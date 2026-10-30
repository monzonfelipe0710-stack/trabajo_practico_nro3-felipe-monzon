import { useState } from "react";
import { router } from "expo-router";
import { ScrollView, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { guardarReporte } from "../../lib/reportes";

const categorias = ["Electricidad", "Agua", "Mobiliario", "Equipos"];
export default function NuevoReporte() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [aula, setAula] = useState("");
  const [categoria, setCategoria] = useState("Electricidad");
  const [sector, setSector] = useState("");
  const [foto, setFoto] = useState<string | undefined>();
  return <ScrollView contentContainerStyle={s.container}>
    <Text style={s.title}>Contanos qué pasó</Text>
    <TextInput style={s.input} placeholder="Título del problema" value={titulo} onChangeText={setTitulo} />
    <TextInput style={[s.input, s.area]} placeholder="Descripción" multiline value={descripcion} onChangeText={setDescripcion} />
    <Text style={s.label}>Aula o lugar</Text>
    <TextInput style={s.input} placeholder="Ej. Aula 4" value={aula} onChangeText={setAula} />
    <Text style={s.label}>Categoría</Text>
    {categorias.map(c => <Pressable key={c} onPress={() => setCategoria(c)} style={[s.option, categoria === c && s.selected]}>
      <Text style={categoria === c ? s.selectedText : s.optionText}>{c}</Text>
    </Pressable>)}
    <Pressable style={s.secondary} onPress={() => router.push("/reporte/escanear")}><Text style={s.secondaryText}>Escanear QR del aula</Text></Pressable>
    <Pressable style={s.secondary} onPress={async () => {
      const r = await import("expo-image-picker");
      const result = await r.launchImageLibraryAsync({ mediaTypes: ["images"], quality: 0.7 });
      if (!result.canceled) setFoto(result.assets[0].uri);
    }}><Text style={s.secondaryText}>{foto ? "Foto adjuntada ✓" : "Elegir foto de galería"}</Text></Pressable>
    <Pressable style={s.secondary} onPress={() => router.push("/reporte/foto")}><Text style={s.secondaryText}>Sacar foto</Text></Pressable>
    <Pressable style={s.secondary} onPress={() => router.push("/reporte/ubicacion")}><Text style={s.secondaryText}>Marcar ubicación</Text></Pressable>
    <TextInput style={s.input} placeholder="Sector (si no usás ubicación)" value={sector} onChangeText={setSector} />
    <Pressable style={s.button} onPress={() => {
      if (!titulo.trim() || !descripcion.trim()) return Alert.alert("Faltan datos", "Completá el título y la descripción.");
      const r = guardarReporte({ titulo, descripcion, aula, categoria, sector, foto });
      router.replace({ pathname: "/reporte/[id]", params: { id: r.id } });
    }}><Text style={s.buttonText}>Enviar reporte</Text></Pressable>
  </ScrollView>;
}
const s = StyleSheet.create({
  container: { padding: 20, gap: 12 }, title: { fontSize: 24, fontWeight: "700", color: "#17233D", marginBottom: 5 },
  input: { backgroundColor: "white", borderRadius: 10, padding: 14, fontSize: 16 }, area: { minHeight: 90, textAlignVertical: "top" },
  label: { fontWeight: "700", color: "#35425A", marginTop: 5 }, option: { padding: 12, backgroundColor: "white", borderRadius: 9 },
  selected: { backgroundColor: "#2457D6" }, optionText: { color: "#35425A" }, selectedText: { color: "white", fontWeight: "700" },
  secondary: { padding: 13, borderWidth: 1, borderColor: "#2457D6", borderRadius: 10, alignItems: "center" },
  secondaryText: { color: "#2457D6", fontWeight: "600" }, button: { backgroundColor: "#2457D6", padding: 16, borderRadius: 10, alignItems: "center", marginTop: 8 },
  buttonText: { color: "white", fontWeight: "700" }
});