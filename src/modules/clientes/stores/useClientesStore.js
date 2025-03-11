import {ref, computed} from 'vue';
import { defineStore } from "pinia";

export default defineStore('clientes-store', () => {
    const cliente = ref({
        nombre: null,
    });

    const clientes = ref([]);
    const numeroElementos = ref(1);

    const asignarDataClientes = ({data, resultados}) => {
        clientes.value = data;
        numeroElementos.value = resultados;
    };

    const asignarDataCliente = (data) => {
        const {id, nombre} = data;
        cliente.value["id"] = id;
        cliente.value.nombre = nombre;
    }

    const clientesOpciones = computed(() => clientes.value.map(({id, nombre}) => ({
        label: nombre,
        value: id,
    })));

    return {
        cliente,
        clientes,
        numeroElementos,
        asignarDataClientes,
        asignarDataCliente,
        clientesOpciones
    }
})