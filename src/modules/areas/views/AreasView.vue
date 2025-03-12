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
import useFiltrosStore from '@/stores/useFiltrosStore';
import {useRoute} from 'vue-router'

// dependencias
const { obtenerSucursales } = useSucursales();
const { areasListado, numeroElementos, obtenerAreas, reiniciarDataCreacion,reiniciarDataAreas  } = useAreas();
const {filtros} = useFiltrosStore();
const route = useRoute();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const AreasForm = defineAsyncComponent(() => import('@/modules/areas/components/AreasForm.vue'));
const AreasBuscador = defineAsyncComponent(() => import('@/modules/areas/components/AreasBuscador.vue'));


onMounted(() => {
    if(route.params.id){
        filtros.sucursal = route.params.id;
    }
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