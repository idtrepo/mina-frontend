<template>
    <VListadoView
        :elementos="perfilesListado"
        :resultados="numResultados">
        <template #buscador>
            <PerfilesBuscador/>
        </template>
        <template #formulario>
            <PerfilesForm/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, provide, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue'
import usePerfilesStore from '../stores/usePerfilesStore';

// dependencias
const perfilesStore = usePerfilesStore();
const { perfilesListado, numResultados, filtros, filtroActivo } = storeToRefs(perfilesStore);

// componentes
const VListadoView = defineAsyncComponent(() => import('@/modules/global/views/VListadoView.vue'));
const PerfilesForm = defineAsyncComponent(() => import('@/modules/perfiles/components/PerfilesForm.vue'));
const PerfilesBuscador = defineAsyncComponent(() => import('@/modules/perfiles/components/PerfilesBuscador.vue'));

// hooks
provide('filtros', {
    filtros,
    filtroActivo,
    obtenerElementos: perfilesStore.obtenerPerfiles,
    reiniciarBusqueda: perfilesStore.reinciarFiltros,
});

onMounted(() => {
    perfilesStore.obtenerPerfiles()
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    perfilesStore.reinciarFiltros();
})
</script>