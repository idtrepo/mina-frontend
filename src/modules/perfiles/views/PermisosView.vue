<template>
    <VListadoView :elementos="permisosListado" :numElementos="numeroElementos" :obtenerListado="obtenerPermisos"
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
import usePermisos from '../composables/usePermisos';

// dependencias
const { permisosListado, numeroElementos, obtenerPermisos, reiniciarDataCreacion, reiniciarDataPermisos } = usePermisos();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
// const PerfilesBuscador = defineAsyncComponent(() => import('../components/forms/PerfilesBuscador.vue'));
// const PerfilesFormulario = defineAsyncComponent(() => import('../components/forms/PerfilesFormulario.vue'));

// ciclo de vida
onUnmounted(() => {
    reiniciarDataPermisos()
})
</script>