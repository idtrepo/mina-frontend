const ls = localStorage;

export const guardarLS = (clave, valor) => {
  ls.setItem(clave, valor);
};

export const obtenerLS = (clave) => {
  return ls.getItem(clave);
};

export const borrarLs = (clave) => {
  ls.removeItem(clave);
};

export const borrarTodoLS = () => {
  ls.clear();
};
