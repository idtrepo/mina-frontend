<template>
    <VListadoView
        :elementos="clientesListado"
        :resultados="numResultados">
        <template #buscador>
            <ClientesBuscador/>
        </template>
        <template #formulario>
            <ClientesForm/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, provide, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue'
import useClientesStore from '../stores/useClientesStore';

// dependencias
const clientesStore = useClientesStore();
const { clientesListado, numResultados, filtroActivo, filtros } = storeToRefs(clientesStore);

// componentes
const VListadoView = defineAsyncComponent(() => import('@/modules/global/views/VListadoView.vue'));
const ClientesForm = defineAsyncComponent(() => import('@/modules/clientes/components/ClientesForm.vue'));
const ClientesBuscador = defineAsyncComponent(() => import('@/modules/clientes/components/ClientesBuscador.vue'));

// hooks
provide('filtros', {
    filtros,
    filtroActivo,
    obtenerElementos: clientesStore.obtenerClientes,
    reiniciarBusqueda: clientesStore.reinciarFiltros,
});

onMounted(() => {
    clientesStore.obtenerClientes()
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    clientesStore.reinciarFiltros();
})
</script>