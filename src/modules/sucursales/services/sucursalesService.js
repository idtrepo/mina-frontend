import servicio from '@/services'

export class SucursalesService {
    static recurso = "sucursales";

    static obtenerElementos = async ({params = null} = {}) => {
        try{
            const res = await servicio.get(SucursalesService.recurso, {params});
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    static crearElemento = async ({data}) => {
        try{
            const res = await servicio.post(SucursalesService.recurso, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    static obtenerElemento = async ({id}) => {
        try{
            const res = await servicio.get(`${SucursalesService.recurso}/${id}`);
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    static editarElemento = async ({id, data}) => {
        try{
            const res = await servicio.patch(`${SucursalesService.recurso}/${id}`, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    };
}