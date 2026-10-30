import { useLocalSearchParams, router } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { usePermiso, Recurso } from "../../hooks/usePermiso";

const info: Record<string, { titulo: string; beneficio: string }> = {
  camara: { titulo: "Usar la cámara", beneficio: "Usamos tu cámara para leer el QR del aula o sacar una foto del desperfecto." },
  ubicacion: { titulo: "Marcar ubicación", beneficio: "Usamos tu ubicación para señalar dónde está el problema." },
  notificaciones: { titulo: "Recibir avisos", beneficio: "Usamos notificaciones para avisarte cuando se resuelva tu reporte." }
};

export default function PermisoPrevio() {
  const { recurso } = useLocalSearchParams<{ recurso: string }>();
  const valido = (recurso || "camara") as Recurso;
  const p = usePermiso(valido);
  const texto = info[valido] || info.camara;
  const bloqueado = p.estado === "bloqueado";
  return <View style={s.container}>
    <Text style={s.title}>{texto.titulo}</Text>
    <Text style={s.text}>{texto.beneficio}</Text>
    <Text style={s.note}>Podés cambiar este permiso más adelante desde Ajustes del dispositivo.</Text>
    {p.estado === "cargando" ? <Text>Consultando permiso…</Text> :
      <Pressable style={s.button} onPress={async () => {
        if (bloqueado) await p.abrirAjustes();
        else if (p.estado === "preguntable") await p.pedir();
        router.back();
      }}>
        <Text style={s.buttonText}>{bloqueado ? "Abrir Ajustes" : "Continuar"}</Text>
      </Pressable>}
  </View>;
}
const s = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", gap: 16, backgroundColor: "white" },
  title: { fontSize: 26, fontWeight: "700", color: "#17233D" }, text: { fontSize: 17, lineHeight: 25, color: "#35425A" },
  note: { color: "#68758C", lineHeight: 22 }, button: { backgroundColor: "#2457D6", padding: 16, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "700" }
});