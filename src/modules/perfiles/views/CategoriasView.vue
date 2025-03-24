<template>
    <VListadoView :elementos="categoriasListado" :numElementos="numeroElementos" :obtenerListado="obtenerCategorias"
        :reiniciarData="reiniciarDataCreacion">
        <!-- <template #formulario-buscar>
            <PerfilesBuscador />
        </template>
        <template #formulario-agregar>
            <PerfilesFormulario />
        </template> -->
    </VListadoView>
</template>

<script setup>
import { onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useCategorias from '../composables/useCategorias';

// dependencias
const { categoriasListado, numeroElementos, obtenerCategorias, reiniciarDataCreacion, reiniciarDataCategorias } = useCategorias();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
// const PerfilesBuscador = defineAsyncComponent(() => import('../components/forms/PerfilesBuscador.vue'));
// const PerfilesFormulario = defineAsyncComponent(() => import('../components/forms/PerfilesFormulario.vue'));

// ciclo de vida
onUnmounted(() => {
    reiniciarDataCategorias()
})
</script>