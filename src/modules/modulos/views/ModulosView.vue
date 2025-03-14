<template>
    <VListadoView
        :elementos="modulosListado"
        :numElementos="numeroElementos"
        :obtenerListado="obtenerModulos"
        :reiniciarData="reiniciarDataCreacion">
        <template #formulario-buscar>
            <ModulosBuscador/>
        </template>
        <template #formulario-agregar>
            <ModulosFormulario/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useModulos from '../composables/useModulos';

// dependencias
const { modulosListado, numeroElementos, obtenerModulos, reiniciarDataModulos, reiniciarDataCreacion } = useModulos();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const ModulosBuscador = defineAsyncComponent(() => import('../components/forms/ModulosBuscador.vue'));
const ModulosFormulario = defineAsyncComponent(() => import('../components/forms/ModulosFormulario.vue'));

onMounted(() => {

});

onUnmounted(() => {
    reiniciarDataModulos();
})
</script>