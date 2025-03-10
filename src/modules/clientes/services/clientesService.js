import servicio from '@/services'

export class ClientesService {
    static recurso = "clientes";

    static obtenerElementos = async ({params = null} = {}) => {
        try{
            const res = await servicio.get(ClientesService.recurso, {params});
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    static crearElemento = async ({data}) => {
        try{
            const res = await servicio.post(ClientesService.recurso, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    static obtenerElemento = async ({id}) => {
        try{
            const res = await servicio.get(`${ClientesService.recurso}/${id}`);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    static editarElemento = async ({id, data}) => {
        try{
            const res = await servicio.patch(`${ClientesService.recurso}/${id}`, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

}