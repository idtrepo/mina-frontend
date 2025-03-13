<template>
    <VListadoView
        :elementos="modulosListado"
        :numElementos="numeroElementos"
        :obtenerListado="obtenerModulos"
        :reiniciarData="reiniciarDataCreacion">
        <template #buscador>
            <ModulosBuscador/>
        </template>
        <template #formulario>
            <ModulosForm/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, provide, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useModulos from '../composables/useModulos';
import useClientes from '@/modules/clientes/composables/useClientes';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useAreas from '@/modules/areas/composables/useAreas';
import {useRoute} from 'vue-router';
import useFiltrosStore from '@/stores/useFiltrosStore';
import {storeToRefs} from 'pinia'

// dependencias
const route = useRoute();
const filtrosStore = useFiltrosStore();
const {filtros} = storeToRefs(filtrosStore);
const clientes = useClientes();
const sucursales = useSucursales();
const areas = useAreas();
const { modulosListado, numeroElementos, obtenerModulos, reiniciarDataModulos, reiniciarDataCreacion } = useModulos();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const ModulosForm = defineAsyncComponent(() => import('@/modules/modulos/components/ModulosForm.vue'));
const ModulosBuscador = defineAsyncComponent(() => import('@/modules/modulos/components/ModulosBuscador.vue'));


onMounted(() => {
    if(route.params.id){
        filtros.value = { ...filtros.value, area: route.params.id };
    }
    Promise.allSettled([
        obtenerModulos({params:{ listado: true }}),
        clientes.obtenerClientes({params:{ listado: true }}),
        sucursales.obtenerSucursales({params:{ listado: true }}),
        areas.obtenerAreas({params:{ listado: true }})
    ])
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    reiniciarDataModulos();
})
</script>