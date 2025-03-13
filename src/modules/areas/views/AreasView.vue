<template>
    <VListadoView
        :elementos="areasListado"
        :resultados="numElementos"
        :obtener-listado = "obtenerAreas"
        :reiniciar-data = "reiniciarDataCreacion"
        >
        <template #formulario-buscar>
            <AreasBuscador/>
        </template>
        <template #formulario-agregar>
            <AreasFormulario/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useAreas from '../composables/useAreas';
import useSucursales from '@/modules/sucursales/composables/useSucursales';

// dependencias
const { obtenerSucursales } = useSucursales();
const { areasListado, numElementos, obtenerAreas, reiniciarDataCreacion,reiniciarDataAreas  } = useAreas();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const AreasBuscador = defineAsyncComponent(() => import('../components/forms/AreasBuscador.vue'));
const AreasFormulario = defineAsyncComponent(() => import('../components/forms/AreasFormulario.vue'));


onMounted(() => {
    Promise.allSettled([
        obtenerAreas(),
        obtenerSucursales({params: { listado: true } }),
    ])
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    reiniciarDataAreas()
})
</script>