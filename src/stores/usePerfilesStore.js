import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import perfilesService from '@/services/perfilesService';

export default defineStore('perfiles', () => {
    const perfiles = ref([]);
    const hayPerfiles = computed(() => perfiles.value.length > 0);

    const asignarDataPerfiles = ({ data }) => {
        perfiles.value = data;
    }

    const obtenerPerfiles = async () => {
        try {
            const res = await perfilesService.obtenerElementos();
            const json = res.data;
            asignarDataPerfiles(json);
            return json;
        } catch (err) {
            throw err;
        }
    };

    const obtenerPerfil = async ({ id }) => {
        try {
            const res = await perfilesService.obtenerElemento({ id });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const crearPerfil = async ({ data }) => {
        try {
            const res = await perfilesService.crearElemento({ data: toValue(data) });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const editarPerfil = async ({ id, data }) => {
        try {
            const res = await perfilesService.editarElemento({ id, data });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    return {
        perfiles,
        hayPerfiles,
        obtenerPerfiles,
        obtenerPerfil,
        crearPerfil,
        editarPerfil,
    }
});