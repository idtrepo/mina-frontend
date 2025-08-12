<template>
    <VListadoView :elementos="areasListado" :numElementos="numeroElementos" :obtenerListado="obtenerAreas"
        :reiniciarData="reiniciarDataCreacion">
        <template #formulario-buscar>
            <AreasBuscador />
        </template>
        <template #formulario-agregar>
            <AreasFormulario />
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useAreas from '../composables/useAreas';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useFiltrosStore from '@/stores/useFiltrosStore';
import { useRoute } from 'vue-router'

// dependencias
const { obtenerSucursales } = useSucursales();
const { areasListado, numeroElementos, obtenerAreas, reiniciarDataCreacion, reiniciarDataAreas } = useAreas();
const { filtros } = useFiltrosStore();
const route = useRoute();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const AreasBuscador = defineAsyncComponent(() => import('../components/forms/AreasBuscador.vue'));
const AreasFormulario = defineAsyncComponent(() => import('../components/forms/AreasFormulario.vue'));


onMounted(() => {
    Promise.allSettled([
        obtenerAreas(),
        obtenerSucursales({ params: { listado: true } }),
    ])
        .then(console.log)
        .catch(console.log);
    if (route.params.id) {
        filtros.sucursal = route.params.id;
    }
});

onUnmounted(() => {
    reiniciarDataAreas()
})
</script>