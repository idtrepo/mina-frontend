import service from "@/services";

export class AccionesService {
  static recurso = "acciones";

  static obtenerElementos = async ({ params = null } = {}) => {
    try {
      const res = await service.get(AccionesService.recurso, { params });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static crearElemento = async ({ data }) => {
    try {
      const res = await service.post(AccionesService.recurso, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static obtenerElemento = async ({ id }) => {
    try {
      const res = await service.get(`${AccionesService.recurso}/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static editarElemento = async ({ id, data }) => {
    try {
      const res = await service.patch(`${AccionesService.recurso}/${id}`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };
}
