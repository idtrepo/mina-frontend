import servicio from "@/services";

export class ModulosService {
  static recurso = "modulos";

  static obtenerElementos = async ({ params = null } = {}) => {
    try {
      const res = await servicio.get(ModulosService.recurso, { params });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static crearElemento = async ({ data }) => {
    try {
      const res = await servicio.post(ModulosService.recurso, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static obtenerElemento = async ({ id }) => {
    try {
      const res = await servicio.get(`${ModulosService.recurso}/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static editarElemento = async ({ id, data }) => {
    try {
      const res = await servicio.patch(`${ModulosService.recurso}/${id}`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static async obtenerElementoData({ id }) {
    return await servicio.get(`${ModulosService.recurso}/${id}/data`);
  }
}
