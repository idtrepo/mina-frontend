import {ref, computed} from 'vue';
import { defineStore } from "pinia";

export default defineStore('sucursales-store', () => {
    const sucursal = ref({
        nombre: null,
        idCliente: null
    });

    const sucursales = ref([]);
    const numeroElementos = ref(1);

    const asignarDataSucursales = ({data, resultados}) => {
        sucursales.value = data;
        numeroElementos.value = resultados;
    };

    const asignarDataSucursal = (data) => {
        const {id, nombre, cliente} = data;
        console.log(data)
        sucursal.value["id"] = id;
        sucursal.value.nombre = nombre;
        sucursal.value.idCliente = cliente.id;
    }

    const sucursalesOpciones = computed(() => sucursales.value.map(({id, nombre}) => ({
        label: nombre,
        value: id,
    })));

    return {
        sucursal,
        sucursales,
        numeroElementos,
        asignarDataSucursales,
        asignarDataSucursal,
        sucursalesOpciones
    }
})