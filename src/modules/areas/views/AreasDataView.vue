<template>
    <VDataView 
        :peticiones="peticiones"
        :reiniciar-data="reiniciarDataAreas"
        :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarArea">
        <template #formulario>
            <AreasFormularioBase/>
        </template>
    </VDataView>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineAsyncComponent, ref } from 'vue';
import useAreas from '../composables/useAreas';
import useSucursales from '@/modules/sucursales/composables/useSucursales';

// dependencias
const route = useRoute();
const { obtenerArea, reiniciarDataAreas, habilitarEdicion, editarArea } = useAreas();
const { obtenerSucursales } = useSucursales();

// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const AreasFormularioBase = defineAsyncComponent(() => import('../components/forms/AreasFormularioBase.vue'));

// configuracion vista
const peticiones = ref([
    obtenerArea({ id: route.params.id }),
    obtenerSucursales({ params: { listado: true } })
])
</script>