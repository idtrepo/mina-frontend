import axios from "axios";
import { storeToRefs } from 'pinia'
import useAuthStore from "@/modules/auth/stores/useAuthStore";
import { BASE_URL } from "../../../config/settings";

const URL_REFRESH = 'autenticacion/actualizar';

export const interceptorRequest = async (request) => {
    const authStore = useAuthStore();
    const { autenticado, tokenAccess, tokenRefresh, tokenCaducidad } = storeToRefs(authStore);

    if (!autenticado.value) return request;

    const tiempoActual = (new Date()).getTime();

    if (tiempoActual > tokenCaducidad.value) {
        try {
            const res = await axios.post(`${BASE_URL}${URL_REFRESH}`, {
                refresh: tokenRefresh.value
            });
            const { data } = res.data;
            authStore.asignarTokenData({ access: data.access });
        } catch (err) {
            console.error(err);
        }
    }

    request.headers['Authorization'] = `Bearer ${tokenAccess.value}`;

    return request
}

export const interceptorRequestError = error => Promise.reject(error);