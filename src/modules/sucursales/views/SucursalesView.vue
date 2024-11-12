<template>
    <VListadoView
        :elementos="sucursalesListado"
        :resultados="numResultados">
        <template #buscador>
            <SucursalesBuscador/>
        </template>
        <template #formulario>
            <SucursalesForm/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, provide, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue'
import useSucursalesStore from '../stores/useSucursalesStore';
import useClientesStore from '@/modules/clientes/stores/useClientesStore';

// dependencias
const clientesStore = useClientesStore();
const sucursalesStore = useSucursalesStore();
const { sucursalesListado, numResultados, filtros, filtroActivo } = storeToRefs(sucursalesStore);

// componentes
const VListadoView = defineAsyncComponent(() => import('@/modules/global/views/VListadoView.vue'));
const SucursalesForm = defineAsyncComponent(() => import('@/modules/sucursales/components/SucursalesForm.vue'));
const SucursalesBuscador = defineAsyncComponent(() => import('@/modules/sucursales/components/SucursalesBuscador.vue'));

// hooks
provide('filtros', {
    filtros,
    filtroActivo,
    obtenerElementos: sucursalesStore.obtenerSucursales,
    reiniciarBusqueda: sucursalesStore.reinciarFiltros,
});

onMounted(() => {
    Promise.allSettled([
        sucursalesStore.obtenerSucursales(),
        clientesStore.obtenerClientes(),
    ])
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    sucursalesStore.reinciarFiltros();
})
</script>