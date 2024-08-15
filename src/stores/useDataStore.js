import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import dataService from '@/services/dataService';

export default defineStore('data', () => {
    const datos = ref([]);
    const hayDatos = computed(() => datos.value.length > 0);

    const asignarDataDatos = ({ data }) => {
        datos.value = data;
    }

    const obtenerDatos = async () => {
        try {
            const res = await dataService.obtenerElementos();
            const json = res.data;
            asignarDataDatos(json);
            return json;
        } catch (err) {
            throw err;
        }
    };

    const obtenerDato = async ({ id }) => {
        try {
            const res = await dataService.obtenerElemento({ id });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const crearDato = async ({ data }) => {
        try {
            const res = await dataService.crearElemento({ data: toValue(data) });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const editarDato = async ({ id, data }) => {
        try {
            const res = await dataService.editarElemento({ id, data });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    return {
        datos,
        hayDatos,
        obtenerDatos,
        obtenerDato,
        crearDato,
        editarDato,
    }
});