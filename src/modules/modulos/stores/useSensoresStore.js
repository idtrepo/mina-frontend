import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import sensoresService from '@/modules/modulos/services/sensoresService';

export default defineStore('sensores', () => {
    const sensores = ref([]);
    const haySensores = computed(() => sensores.value.length > 0);

    const asignarDataSensores = ({ data }) => {
        sensores.value = data;
    }

    const obtenerSensores = async () => {
        try {
            const res = await sensoresService.obtenerElementos();
            const json = res.data;
            asignarDataSensores(json);
            return json;
        } catch (err) {
            throw err;
        }
    };

    const obtenerSensor = async ({ id }) => {
        try {
            const res = await sensoresService.obtenerElemento({ id });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const crearSensor = async ({ data }) => {
        try {
            const res = await sensoresService.crearElemento({ data: toValue(data) });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const editarSensor = async ({ id, data }) => {
        try {
            const res = await sensoresService.editarElemento({ id, data });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    return {
        sensores,
        haySensores,
        obtenerSensores,
        obtenerSensor,
        crearSensor,
        editarSensor,
    }
});