import axios from "axios";
import { storeToRefs } from 'pinia'
import useAutenticacion from '@/modules/auth/composables/useAutenticacion';
import { BASE_URL } from "../../../config/settings";

const URL_REFRESH = 'autenticacion/actualizar';

export const interceptorRequest = async (request) => {
    const { autenticado, access, refresh, tiempoExpiracion, guardarSesion } = useAutenticacion();

    if (!autenticado.value) return request;

    const tiempoActual = (new Date()).getTime();

    if (tiempoActual > tiempoExpiracion.value) {
        try {
            const res = await axios.post(`${BASE_URL}${URL_REFRESH}`, {
                refresh: refresh.value
            });
            const { data } = res.data;
            guardarSesion({ access: data.access });
        } catch (err) {
            console.error(err);
        }
    }

    request.headers['Authorization'] = `Bearer ${access.value}`;

    return request
}

export const interceptorRequestError = error => Promise.reject(error);