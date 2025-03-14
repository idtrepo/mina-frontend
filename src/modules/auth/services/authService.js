import service from "@/services";

export class AuthService {
  static recurso = "autenticacion";

  static iniciarSesion = async ({ data }) => {
    try {
      const res = await service.post(`${AuthService.recurso}/login`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static actualizarSesion = async ({ data }) => {
    try {
      const res = await service.post(`${AuthService.recurso}/actualizar`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };
}
