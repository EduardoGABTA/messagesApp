export interface Menu {
  menu: Array<GenericItem>;
}

interface GenericItem {
  descripcion: string;
  ruta: string;
  icon: string;
  hijos: Array<GenericItem>;
}
