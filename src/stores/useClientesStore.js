import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import clientesService from '@/services/clientesService';

export default defineStore('clientes', () => {
    const clientes = ref([]);
    const hayClientes = computed(() => clientes.value.length > 0);

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
        obtenerClientes,
        obtenerCliente,
        crearCliente,
        editarCliente,
    }
});