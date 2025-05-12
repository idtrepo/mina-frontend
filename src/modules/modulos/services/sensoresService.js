import servicio from "@/services";

export class SensoresService {
  static recurso = "sensores";

  static obtenerElementos = async ({ params = null } = {}) => {
    try {
      const res = await servicio.get(SensoresService.recurso, { params });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static crearElemento = async ({ data }) => {
    try {
      const res = await servicio.post(SensoresService.recurso, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static obtenerElemento = async ({ id }) => {
    try {
      const res = await servicio.get(`${SensoresService.recurso}/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static editarElemento = async ({ id, data }) => {
    try {
      const res = await servicio.patch(
        `${SensoresService.recurso}/${id}`,
        data
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  };
}
