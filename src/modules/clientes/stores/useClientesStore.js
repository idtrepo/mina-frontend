import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import clientesService from '@/modules/clientes/services/clientesService';

export default defineStore('clientes', () => {
    const clientes = ref([]);
    const hayClientes = computed(() => clientes.value.length > 0);
    const opcionesClientes = computed(() => clientes.value.map(({ id, nombre }) => ({
        label: nombre,
        value: id
    })));

    const asignarDataClientes = ({ data }) => {
        clientes.value = data;
    }

    const obtenerClientes = async () => {
        try {
            const res = await clientesService.obtenerElementos();
            const json = res.data;
            asignarDataClientes(json);
            return json;
        } catch (err) {
            throw err;
        }
    };

    const obtenerCliente = async ({ id }) => {
        try {
            const res = await clientesService.obtenerElemento({ id });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const crearCliente = async ({ data }) => {
        try {
            const res = await clientesService.crearElemento({ data: toValue(data) });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    const editarCliente = async ({ id, data }) => {
        try {
            const res = await clientesService.editarElemento({ id, data });
            const json = res.data;
            return json;
        } catch (err) {
            throw err;
        }
    }

    return {
        clientes,
        hayClientes,
        opcionesClientes,
        obtenerClientes,
        obtenerCliente,
        crearCliente,
        editarCliente,
    }
});