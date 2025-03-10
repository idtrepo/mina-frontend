<template>
    <VListadoView
        :elementos="areasListado"
        :numElementos="numeroElementos"
        :obtenerListado = "obtenerAreas"
        :reiniciarData = "reiniciarDataCreacion"
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
import useSucursales from '@/modules/sucursales/composables/useSucursales';

// dependencias
const { obtenerSucursales } = useSucursales();
const { areasListado, numeroElementos, obtenerAreas, reiniciarDataCreacion,reiniciarDataAreas  } = useAreas();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const AreasForm = defineAsyncComponent(() => import('@/modules/areas/components/AreasForm.vue'));
const AreasBuscador = defineAsyncComponent(() => import('@/modules/areas/components/AreasBuscador.vue'));


onMounted(() => {
    Promise.allSettled([
        obtenerAreas({params:{ listado: true }}),
        obtenerSucursales(),
    ])
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    reiniciarDataAreas()
})
</script>