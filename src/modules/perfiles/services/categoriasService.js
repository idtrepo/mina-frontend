import service from "@/services";

export class CategoriasService {
  static recurso = "categorias";

  static obtenerElementos = async ({ params = null } = {}) => {
    try {
      const res = await service.get(CategoriasService.recurso, { params });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static crearElemento = async ({ data }) => {
    try {
      const res = await service.post(CategoriasService.recurso, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static obtenerElemento = async ({ id }) => {
    try {
      const res = await service.get(`${CategoriasService.recurso}/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static editarElemento = async ({ id, data }) => {
    try {
      const res = await service.patch(
        `${CategoriasService.recurso}/${id}`,
        data
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  };
}
