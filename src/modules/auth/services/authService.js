import servicio from '@/services'

const recurso = 'autenticacion/';

export default {
    iniciarSesion: ({ data }) => {
        return servicio.post(`${recurso}login`, data);
    },
    actualizarSesion: ({ data }) => {
        return servicio.post(`${recurso}actualizar`, data);
    }
}