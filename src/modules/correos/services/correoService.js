import servicio from '@/services'

export class CorreoService {
    static recurso = "correos";

    static obtenerElementos = async ({params = null} = {}) => {
        try{
            const res = await servicio.get(CorreoService.recurso, {params});
            return res.data;
        } catch (err) {
            throw err;
        }
    }
    static crearElemento = async ({data}) => {
        try{
            const res = await servicio.post(CorreoService.recurso, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    }
    static obtenerElemento = async ({id}) => {
        try{
            const res = await servicio.get(`${CorreoService.recurso}/${id}`);
            return res.data;
        } catch (err) {
            throw err;
        }
    }
    static editarElemento = async ({id, data}) => {
        try{
            const res = await servicio.patch(`${CorreoService.recurso}/${id}`, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    static eliminarElemento = async ({id}) => {
        try{
            const res = await servicio.delete(`${CorreoService.recurso}/${id}`);
            return res.data;
        } catch (err) {
            throw err;
        }
    }
}