<template>
    <VListadoView :elementos="accionesListado" :numElementos="numeroElementos" :obtenerListado="obtenerAcciones"
        :reiniciarData="reiniciarDataCreacion">
        <template #formulario-buscar>
            <AccionesBuscador />
        </template>
        <template #formulario-agregar>
            <AccionesFormulario />
        </template> 
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
const AccionesBuscador = defineAsyncComponent(() => import('../components/forms/acciones/AccionesBuscador.vue'));
const AccionesFormulario = defineAsyncComponent(() => import('../components/forms/acciones/AccionesFormulario.vue'));

// ciclo de vida
onUnmounted(() => {
    reiniciarDataAcciones()
})
</script>