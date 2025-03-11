import servicio from '@/services'

export class UsuariosService {
    static recurso = "usuarios";

    static obtenerElementos = async ({ params = null} = {}) => {
        try{
            const res = await servicio.get(UsuariosService.recurso, { params });
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    static crearElemento = async ({data}) => {
        try{
            const res = await servicio.post(UsuariosService.recurso, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    static obtenerElemento = async ({ id}) => {
        try{
            const res = await servicio.get(`${UsuariosService.recurso}/${id}`);
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    static editarElemento = async ({ id, data }) => {
        try{
            const res = await servicio.patch(`${UsuariosService.recurso}/${id}`, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    }
}