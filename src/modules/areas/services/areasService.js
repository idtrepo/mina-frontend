import servicio from '@/services'

const recurso = 'areas/';

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
        console.log('Editando el elemento');
        console.log('ID DEL ELEMENTO: ', id);
        console.log('DATA DEL ELEMENTO: ', data);
        return servicio.patch(`${recurso}${id}`, data);
    }
}