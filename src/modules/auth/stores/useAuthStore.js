import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode';
import authService from '@/modules/auth/services/authService';

const ls = localStorage;

export default defineStore('autenticacion', () => {
    const access = ref(null);
    const refresh = ref(null);
    const usuario = ref(null);
    const caducidadSesion = ref(null);
    const autenticado = computed(() => !!access.value);

    const guardarSesionStorage = ({ access: accessToken, refresh: refreshToken = null } = {}) => {
        ls.setItem('access', accessToken);

        if (refreshToken) ls.setItem('refresh', refreshToken);
    }

    const guardarSesionEstado = ({ access: accessToken, refresh: refreshToken = null } = {}) => {
        const { usuario: dataUsuario, exp } = jwtDecode(accessToken);

        usuario.value = dataUsuario;
        caducidadSesion.value = exp * 1000;
        access.value = accessToken;

        if (refreshToken) refresh.value = refreshToken;
    }

    const guardarSesion = ({ data }) => {
        guardarSesionStorage(data);
        guardarSesionEstado(data);
    }

    const iniciarSesion = async ({ credenciales }) => {
        try {
            const res = await authService.iniciarSesion(toValue(credenciales));
            const json = res.data;

            guardarSesion(json);

            return json;
        } catch (err) {
            throw err;
        }
    }

    const actualizarSesion = async ({ token }) => {
        try {
            const res = await authService.actualizarSesion({
                refresh: toValue(token)
            });
            const json = res.data;

            guardarSesion(json);

            return json;
        } catch (err) {
            throw err;
        }
    }

    const cerrarSesion = () => {
        access.value = null;
        refresh.value = null;
        usuario.value = null;
        caducidadSesion.value = null;
        ls.clear();
    }

    const verificarSesion = async () => {
        const accessToken = ls.getItem('access');
        const refreshToken = ls.getItem('refresh');

        if (!accessToken || !refreshToken) {
            cerrarSesion();
            throw { error: 'Tokens eliminados' };
        }

        guardarSesion({
            data: {
                access: accessToken,
                refresh: refreshToken
            }
        });

        try {
            const res = await actualizarSesion({ token: refresh });
            return res;
        } catch (err) {
            cerrarSesion();
            throw err;
        }
    }

    return {
        access,
        refresh,
        usuario,
        caducidadSesion,
        autenticado,
        guardarSesion,
        iniciarSesion,
        cerrarSesion,
        verificarSesion
    }
})