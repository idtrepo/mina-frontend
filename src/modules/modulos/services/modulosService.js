import servicio from '@/services'
const recurso = 'modulos/';

export default {
    obtenerElementos: ({ params }) => {
        return servicio.get(recurso, { params });
    },
    obtenerElemento: ({ id }) => {
        return servicio.get(`${recurso}${id}`);
    },
    obtenerDataElemento: ({ id }) => {
        return servicio.get(`${recurso}${id}/data`);
    },
    crearElemento: ({ data }) => {
        return servicio.post(recurso, data);
    },
    editarElemento: ({ id, data }) => {
        return servicio.patch(`${recurso}${id}`, data);
    }
}