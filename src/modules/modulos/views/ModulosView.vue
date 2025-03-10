<template>
    <VListadoView
        :elementos="modulosListado"
        :resultados="numResultados"
        :obtener-listado="obtenerModulos"
        :reiniciar-data="reiniciarDataCreacion">
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
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue'
import useModulos from '../composables/useModulos';
import useClientes from '@/modules/clientes/composables/useClientes';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useAreas from '@/modules/areas/composables/useAreas';

// dependencias
const clientes = useClientes();
const sucursales = useSucursales();
const areas = useAreas();
const { modulosListado, numResultados, obtenerModulos, reiniciarDataModulos, reiniciarDataCreacion } = useModulos();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const ModulosForm = defineAsyncComponent(() => import('@/modules/modulos/components/ModulosForm.vue'));
const ModulosBuscador = defineAsyncComponent(() => import('@/modules/modulos/components/ModulosBuscador.vue'));

onMounted(() => {
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