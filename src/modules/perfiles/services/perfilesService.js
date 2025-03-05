import service from "@/services";

export class PerfilesService {
  static recurso = "perfiles";

  static obtenerElementos = async ({ params = null } = {}) => {
    try {
      const res = await service.get(PerfilesService.recurso, { params });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static crearElemento = async ({ data }) => {
    try {
      const res = await service.post(PerfilesService.recurso, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static obtenerElemento = async ({ id }) => {
    try {
      const res = await service.get(`${PerfilesService.recurso}/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static editarElemento = async ({ id, data }) => {
    try {
      const res = await service.patch(`${PerfilesService.recurso}/${id}`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };
}
