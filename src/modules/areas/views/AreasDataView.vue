<template>
    <VDataView
        :peticiones="peticiones"
        :reiniciar-data="reiniciarDataAreas"
        :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarArea">
        <template #formulario>
            <AreaFormBase />
        </template>    
    </VDataView>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import useAreas from '../composables/useAreas';
import useSucursales from '@/modules/sucursales/composables/useSucursales';

// dependencias
const route = useRoute();
const {obtenerArea, reiniciarDataAreas, editarArea, habilitarEdicion} = useAreas();
const { obtenerSucursales } = useSucursales();
const peticiones = [
    obtenerArea({id: route.params.id}),
    obtenerSucursales({params:{ listado: true }}),
]

// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const AreaFormBase = defineAsyncComponent(() => import('../components/forms/AreasFormbase.vue'));

</script>