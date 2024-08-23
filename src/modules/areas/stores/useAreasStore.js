import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import areasService from '@/modules/areas/services/areasService';

export default defineStore('areas', () => {
    const areas = ref([]);
    const hayAreas = computed(() => areas.value.length > 0);
    const opcionesAreas = computed(() => areas.value.map(({ id, nombre }) => ({
        label: nombre,
        value: id
    })));

    const asignarDataAreas = ({ data }) => {
        areas.value = data;
    }

    const obtenerAreas = async () => {
        try {
            const res = await areasService.obtenerElementos();
            const json = res.data;
            asignarDataAreas(json);
            return json;
        } catch (err) {
            throw err;
        }
    };

    const obtenerArea = async ({ id }) => {
        try {
            const res = await areasService.obtenerElemento({ id });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const crearArea = async ({ data }) => {
        try {
            const res = await areasService.crearElemento({ data: toValue(data) });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const editarArea = async ({ id, data }) => {
        try {
            const res = await areasService.editarElemento({ id, data });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    return {
        areas,
        hayAreas,
        opcionesAreas,
        obtenerArea,
        obtenerAreas,
        crearArea,
        editarArea,
    }
});