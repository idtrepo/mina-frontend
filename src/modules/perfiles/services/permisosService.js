import service from "@/services";

export class PermisosService {
  static recurso = "permisos";

  static obtenerElementos = async ({ params = null } = {}) => {
    try {
      const res = await service.get(PermisosService.recurso, { params });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static crearElemento = async ({ data }) => {
    try {
      const res = await service.post(PermisosService.recurso, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static crearElementos = async ({ data }) => {
    try {
      const res = await service.post(PermisosService.recurso, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static obtenerElemento = async ({ id }) => {
    try {
      const res = await service.get(`${PermisosService.recurso}/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static editarElemento = async ({ id, data }) => {
    try {
      const res = await service.patch(`${PermisosService.recurso}/${id}`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };
}
