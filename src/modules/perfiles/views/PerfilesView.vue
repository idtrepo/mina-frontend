<template>
    <VListadoView :elementos="perfilesListado" :numElementos="numeroElementos" :obtenerListado="obtenerPerfiles"
        :reiniciarData="reiniciarDataCreacion">
        <template #formulario-buscar>
            <PerfilesBuscador />
        </template>
        <template #formulario-agregar>
            <PerfilesFormulario />
        </template>
    </VListadoView>
</template>

<script setup>
import { onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import usePerfiles from '../composables/usePerfiles';

// dependencias
const { perfilesListado, numeroElementos, obtenerPerfiles, reiniciarDataCreacion, reiniciarDataPerfiles } = usePerfiles();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const PerfilesBuscador = defineAsyncComponent(() => import('../components/forms/PerfilesBuscador.vue'));
const PerfilesFormulario = defineAsyncComponent(() => import('../components/forms/PerfilesFormulario.vue'));

// ciclo de vida
onUnmounted(() => {
    reiniciarDataPerfiles()
})
</script>