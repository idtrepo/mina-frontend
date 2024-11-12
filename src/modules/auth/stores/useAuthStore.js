import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode';
import authService from '@/modules/auth/services/authService';
import { PERFILES } from '../utils/perfiles';

const ls = localStorage;

export default defineStore('autenticacion', () => {
    const access = ref(null);
    const refresh = ref(null);
    const usuario = ref(null);
    const caducidadSesion = ref(null);
    const autenticado = computed(() => !!access.value);
    const usuarioNombre = computed(() => usuario.value?.nombre?.split(' ')?.[0] ?? '');
    const usuarioApellido = computed(() => usuario.value?.apellido?.split(' ')?.[0] ?? '');
    const usuarioPerfil = computed(() => usuario.value?.perfil?.nombre ?? '');
    const usuarioNombreCompleto = computed(() => `${ usuarioNombre.value } ${ usuarioApellido.value }`);
    const usuarioCliente = computed(() => usuario.value?.cliente?.id);
    const usuarioSucursal = computed(() => usuario.value?.sucursal?.id);
    const esSuperUsuario = computed(() => usuarioPerfil.value === PERFILES.SUPER_USUARIO);
    const esAdministrador = computed(() => usuarioPerfil.value === PERFILES.ADMINISTRADOR);
    const esSupervisor = computed(() => usuarioPerfil.value === PERFILES.SUPERVISOR);

    const guardarSesionStorage = ({ access: accessToken, refresh: refreshToken = null } = {}) => {
        ls.setItem('access', accessToken);

        if (refreshToken) 
            ls.setItem('refresh', refreshToken);
    }

    const guardarSesionEstado = ({ access: accessToken, refresh: refreshToken = null } = {}) => {
        const { usuario: dataUsuario, exp } = jwtDecode(accessToken);

        access.value = accessToken;
        usuario.value = dataUsuario;
        caducidadSesion.value = exp * 1000;

        if (refreshToken) 
            refresh.value = refreshToken;
    }

    const guardarSesion = ({ data }) => {
        guardarSesionEstado(data);
        guardarSesionStorage(data);
    }

    const iniciarSesion = async ({ credenciales }) => {
        try {
            const res = await authService.iniciarSesion({ data: toValue(credenciales) });
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
                data: { refresh: toValue(token) }
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
        usuarioPerfil,
        usuarioNombre,
        usuarioApellido,
        usuarioNombreCompleto,
        caducidadSesion,
        autenticado,
        usuarioCliente, 
        usuarioSucursal,
        esSuperUsuario,
        esAdministrador,
        esSupervisor,
        guardarSesion,
        iniciarSesion,
        cerrarSesion,
        verificarSesion
    }
})