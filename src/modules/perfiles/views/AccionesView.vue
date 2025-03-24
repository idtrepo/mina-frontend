<template>
    <VListadoView :elementos="accionesListado" :numElementos="numeroElementos" :obtenerListado="obtenerAcciones"
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
import useAcciones from '../composables/useAcciones';

// dependencias
const { accionesListado, numeroElementos, obtenerAcciones, reiniciarDataCreacion, reiniciarDataAcciones } = useAcciones();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
// const PerfilesBuscador = defineAsyncComponent(() => import('../components/forms/PerfilesBuscador.vue'));
// const PerfilesFormulario = defineAsyncComponent(() => import('../components/forms/PerfilesFormulario.vue'));

// ciclo de vida
onUnmounted(() => {
    reiniciarDataAcciones()
})
</script>