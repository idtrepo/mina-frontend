export class LS {
  static ls = localStorage;

  static guardar = (clave, valor) => {
    LS.ls.setItem(clave, valor);
  };

  static obtener = (clave) => {
    return LS.ls.getItem(clave);
  };

  static borrar = (clave) => {
    LS.ls.removeItem(clave);
  };

  static limpiarLS = () => {
    LS.ls.clear();
  };
}
