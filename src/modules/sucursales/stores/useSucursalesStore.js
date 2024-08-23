import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import sucursalesService from '@/modules/sucursales/services/sucursalesService';

export default defineStore('sucursales', () => {
    const sucursales = ref([]);
    const haySucursales = computed(() => sucursales.value.length > 0);
    const opcionesSucursales = computed(() => sucursales.value.map(({ id, nombre }) => ({
        label: nombre,
        value: id
    })));

    const asignarDataSucursales = ({ data }) => {
        sucursales.value = data;
    }

    const obtenerSucursales = async () => {
        try {
            const res = await sucursalesService.obtenerElementos();
            const json = res.data;
            asignarDataSucursales(json);
            return json;
        } catch (err) {
            throw err;
        }
    };

    const obtenerSucursal = async ({ id }) => {
        try {
            const res = await sucursalesService.obtenerElemento({ id });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const crearSucursal = async ({ data }) => {
        try {
            const res = await sucursalesService.crearElemento({ data: toValue(data) });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const editarSucursal = async ({ id, data }) => {
        try {
            const res = await sucursalesService.editarElemento({ id, data });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    return {
        sucursales,
        haySucursales,
        opcionesSucursales,
        obtenerSucursales,
        obtenerSucursal,
        crearSucursal,
        editarSucursal,
    }
});