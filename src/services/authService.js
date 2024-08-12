import servicio from './index'

const recurso = 'autenticacion/';

export default {
    iniciarSesion: (data) => {
        return servicio.post(`${recurso}login`);
    },
    actualizarSesion: (data) => {
        return servicio.post(`${recurso}refresh`);
    }
}