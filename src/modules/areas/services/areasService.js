import servicio from '@/services'

export class AreasService {
    static recurso = "areas";

    static obtenerElementos = async ({ params = null } = {}) => {
        try {
            const res = await servicio.get(AreasService.recurso, { params });
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    static crearElemento = async ({ data }) => {
        try {
            const res = await servicio.post(AreasService.recurso, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    static obtenerElemento = async ({ id }) => {
        try {
            const res = await servicio.get(`${AreasService.recurso}/${id}`);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    static editarElemento = async ({ id, data }) => {
        try {
            const res = await servicio.patch(`${AreasService.recurso}/${id}`, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    };
}

    

