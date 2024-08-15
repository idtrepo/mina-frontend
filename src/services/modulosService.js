import servicio from './index'

const recurso = 'modulos/';

export default {
    obtenerElementos: ({ } = {}) => {
        return servicio.get(recurso);
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