import servicio from '@/services'

export class DataService{
    static recurso = 'data';

    static obtenerElementos = async ({params = null} = {}) => {
        try {
            const res = await servicio.get(DataService.recurso, {params});
            return res.data;
        } catch (err) {
            throw err;
        }
    };
}