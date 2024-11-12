<template>
    <VListadoView
        :elementos="modulosListado"
        :resultados="numResultados">
        <template #buscador>
            <ModulosBuscador/>
        </template>
        <template #formulario>
            <ModulosForm/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, provide, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue'
import useModulosStore from '../stores/useModulosStore';
import useClientesStore from '@/modules/clientes/stores/useClientesStore';
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';
import useAreasStore from '@/modules/areas/stores/useAreasStore';

// dependencias
const clientesStore = useClientesStore();
const sucursalesStore = useSucursalesStore();
const areasStore = useAreasStore();
const modulosStore = useModulosStore();
const { modulosListado, numResultados, filtros, filtroActivo } = storeToRefs(modulosStore);

// componentes
const VListadoView = defineAsyncComponent(() => import('@/modules/global/views/VListadoView.vue'));
const ModulosForm = defineAsyncComponent(() => import('@/modules/modulos/components/ModulosForm.vue'));
const ModulosBuscador = defineAsyncComponent(() => import('@/modules/modulos/components/ModulosBuscador.vue'));

// hooks
provide('filtros', {
    filtros,
    filtroActivo,
    obtenerElementos: modulosStore.obtenerModulos,
    reiniciarBusqueda: modulosStore.reinciarFiltros,
});

onMounted(() => {
    Promise.allSettled([
        modulosStore.obtenerModulos(),
        clientesStore.obtenerClientes(),
        sucursalesStore.obtenerSucursales(),
        areasStore.obtenerAreas()
    ])
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    modulosStore.reinciarFiltros();
})
</script>