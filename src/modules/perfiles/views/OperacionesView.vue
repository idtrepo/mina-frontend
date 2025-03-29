<template>
    <VListadoView :elementos="operacionesListado" :numElementos="numeroElementos" :obtenerListado="obtenerOperaciones"
        :reiniciarData="reiniciarDataCreacion">
        <template #formulario-buscar>
            <OperacionesBuscador />
        </template>
        <template #formulario-agregar>
            <OperacionesFormulario />
        </template>
    </VListadoView>
</template>

<script setup>
import { onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useOperaciones from '../composables/useOperaciones';

// dependencias
const { operacionesListado, numeroElementos, obtenerOperaciones, reiniciarDataCreacion, reiniciarDataOperaciones } = useOperaciones();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const OperacionesBuscador = defineAsyncComponent(() => import('../components/forms/operaciones/OperacionesBuscador.vue'));
const OperacionesFormulario = defineAsyncComponent(() => import('../components/forms/operaciones/OperacionesFormulario.vue'));

// ciclo de vida
onUnmounted(() => {
    reiniciarDataOperaciones()
})
</script>