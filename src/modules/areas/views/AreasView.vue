<template>
    <VListadoView
        :elementos="areasListado"
        :resultados="numResultados">
        <template #buscador>
            <AreasBuscador/>
        </template>
        <template #formulario>
            <AreasForm/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, provide, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue'
import useAreasStore from '../stores/useAreasStore';
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';

// dependencias
const sucursalesStore = useSucursalesStore();
const areasStore = useAreasStore();
const { areasListado, numResultados, filtros, filtroActivo } = storeToRefs(areasStore);

// componentes
const VListadoView = defineAsyncComponent(() => import('@/modules/global/views/VListadoView.vue'));
const AreasForm = defineAsyncComponent(() => import('@/modules/areas/components/AreasForm.vue'));
const AreasBuscador = defineAsyncComponent(() => import('@/modules/areas/components/AreasBuscador.vue'));

// hooks
provide('filtros', {
    filtros,
    filtroActivo,
    obtenerElementos: areasStore.obtenerAreas,
    reiniciarBusqueda: areasStore.reinciarFiltros,
});

onMounted(() => {
    Promise.allSettled([
        areasStore.obtenerAreas(),
        sucursalesStore.obtenerSucursales(),
    ])
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    areasStore.reinciarFiltros();
})
</script>