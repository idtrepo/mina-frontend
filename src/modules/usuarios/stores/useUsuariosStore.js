import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import usuariosService from '@/modules/usuarios/services/usuariosService';

export default defineStore('usuarios', () => {
    const usuarios = ref([]);
    const hayUsuarios = computed(() => usuarios.value.length > 0);

    const asignarDataUsuarios = ({ data }) => {
        usuarios.value = data;
    }

    const obtenerUsuarios = async () => {
        try {
            const res = await usuariosService.obtenerElementos();
            const json = res.data;
            asignarDataUsuarios(json);

            return json;
        } catch (err) {
            throw err;
        }
    };

    const obtenerUsuario = async ({ id }) => {
        try {
            const res = await usuariosService.obtenerElemento({ id });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const crearUsuario = async ({ data }) => {
        try {
            const res = await usuariosService.crearElemento({ data: toValue(data) });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const editarUsuario = async ({ id, data }) => {
        try {
            const res = await usuariosService.editarElemento({ id, data });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    return {
        usuarios,
        hayUsuarios,
        obtenerUsuarios,
        obtenerUsuario,
        crearUsuario,
        editarUsuario,
    }
});