import axios from "axios";
import { storeToRefs } from 'pinia'
import useAuthStore from "@/stores/useAuthStore";
import { BASE_URL } from "../../../config/settings";

const URL_REFRESH = 'autenticacion/refresh';

export const interceptorRequest = async (request) => {
    const authStore = useAuthStore();
    const { autenticado, access, refresh, caducidadSesion } = storeToRefs(authStore);

    if (!autenticado.value) return request;

    const tiempoActual = (new Date()).getTime();

    if (tiempoActual > caducidadSesion.value) {
        try {
            const res = await axios.post(`${BASE_URL}${URL_REFRESH}`, {
                refresh: refresh.value
            });
            const { mensaje, data } = res.data;
            authStore.guardarSesion({ data });
        } catch (err) {
            console.error(err);
        }
    }

    request.headers['Authorization'] = `Bearer ${access.value}`;

    return request
}

export const interceptorRequestError = error => Promise.reject(error);