import servicio from '@/services'

const recurso = 'clientes/';

export default {
    obtenerElementos: ({ params }) => {
        return servicio.get(recurso, { params });
    },
    obtenerElemento: ({ id }) => {
        return servicio.get(`${recurso}${id}`);
    },
    crearElemento: ({ data }) => {
        return servicio.post(recurso, data);
    },
    editarElemento: ({ id, data }) => {
        return servicio.patch(`${recurso}${id}`, data);
    }
}