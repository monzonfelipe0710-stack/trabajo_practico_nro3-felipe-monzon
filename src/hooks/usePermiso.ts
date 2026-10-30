import { useCallback, useEffect, useState } from "react";
import { AppState, Linking, Platform } from "react-native";
import * as Camera from "expo-camera";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

export type Recurso = "camara" | "ubicacion" | "notificaciones";
export type EstadoPermiso = "cargando" | "concedido" | "preguntable" | "bloqueado";

export function usePermiso(recurso: Recurso) {
  const [respuesta, setRespuesta] = useState<any>(null);
  const [estado, setEstado] = useState<EstadoPermiso>("cargando");

  const consultar = useCallback(async () => {
    let r: any;
    if (recurso === "camara") r = await Camera.getCameraPermissionsAsync();
    else if (recurso === "ubicacion") r = await Location.getForegroundPermissionsAsync();
    else r = await Notifications.getPermissionsAsync();
    setRespuesta(r);
    setEstado(r.granted || r.status === "granted"
      ? "concedido"
      : r.canAskAgain ? "preguntable" : "bloqueado");
    return r;
  }, [recurso]);

  const pedir = useCallback(async () => {
    if (recurso === "notificaciones" && Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("reportes", {
        name: "Reportes", importance: Notifications.AndroidImportance.DEFAULT
      });
    }
    let r: any;
    if (recurso === "camara") r = await Camera.requestCameraPermissionsAsync();
    else if (recurso === "ubicacion") r = await Location.requestForegroundPermissionsAsync();
    else r = await Notifications.requestPermissionsAsync();
    setRespuesta(r);
    setEstado(r.granted || r.status === "granted"
      ? "concedido"
      : r.canAskAgain ? "preguntable" : "bloqueado");
    return r;
  }, [recurso]);

  const abrirAjustes = useCallback(() => Linking.openSettings(), []);

  useEffect(() => {
    consultar();
    const sub = AppState.addEventListener("change", state => {
      if (state === "active") consultar();
    });
    return () => sub.remove();
  }, [consultar]);

  const parcial = recurso === "ubicacion"
    ? (Platform.OS === "android"
        ? respuesta?.android?.accuracy === "coarse"
        : respuesta?.ios?.accuracy === "reduced")
    : respuesta?.accessPrivileges === "limited";

  return { estado, parcial, respuesta, pedir, consultar, abrirAjustes };
}