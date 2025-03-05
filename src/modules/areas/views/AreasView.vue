<template>
    <VListadoView
        :elementos="areasListado"
        :resultados="numElementos"
        :obtener-listado = "obtenerAreas"
        :reiniciar-data = "reiniciarDataCreacion"
        >
        <template #buscador>
            <AreasBuscador/>
        </template>
        <template #formulario>
            <AreasForm/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, provide, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useAreas from '../composables/useAreas';
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';

// dependencias
const sucursalesStore = useSucursalesStore();
const { areasListado, numElementos, obtenerAreas, reiniciarDataCreacion,reiniciarDataAreas  } = useAreas();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const AreasForm = defineAsyncComponent(() => import('@/modules/areas/components/AreasForm.vue'));
const AreasBuscador = defineAsyncComponent(() => import('@/modules/areas/components/AreasBuscador.vue'));


onMounted(() => {
    Promise.allSettled([
        obtenerAreas(),
        sucursalesStore.obtenerSucursales(),
    ])
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    reiniciarDataAreas()
})
</script>