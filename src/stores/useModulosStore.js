import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import modulosService from '@/services/modulosService';

export default defineStore('modulos', () => {
    const modulos = ref([]);
    const hayModulos = computed(() => modulos.value.length > 0);

    const asignarDataModulos = ({ data }) => {
        modulos.value = data;
    }

    const obtenerModulos = async () => {
        try {
            const res = await modulosService.obtenerElementos();
            const json = res.data;
            asignarDataModulos(json);
            return json;
        } catch (err) {
            throw err;
        }
    };

    const obtenerModulo = async ({ id }) => {
        try {
            const res = await modulosService.obtenerElemento({ id });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const crearModulo = async ({ data }) => {
        try {
            const res = await modulosService.crearElemento({ data: toValue(data) });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const editarModulo = async ({ id, data }) => {
        try {
            const res = await modulosService.editarElemento({ id, data });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    return {
        modulos,
        hayModulos,
        obtenerModulo,
        crearModulo,
        editarModulo,
        obtenerModulos,
    }
});