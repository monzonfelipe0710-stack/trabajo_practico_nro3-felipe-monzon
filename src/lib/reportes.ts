export type Reporte = {
  id: string; titulo: string; descripcion: string; aula: string;
  categoria: string; sector: string; foto?: string; estado: "Pendiente" | "En curso" | "Resuelto";
};
export const reportes: Reporte[] = [];
export const avisos: string[] = [];
export function guardarReporte(data: Omit<Reporte, "id" | "estado">) {
  const reporte: Reporte = { ...data, id: String(Date.now()), estado: "Pendiente" };
  reportes.unshift(reporte);
  return reporte;
}