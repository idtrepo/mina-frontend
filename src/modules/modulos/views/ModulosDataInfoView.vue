<template>
    <VDataView 
        :peticiones="peticiones"
        :reiniciar-data="reiniciarDataModulos"
        :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarModulo">
        <template #formulario>
            <ModulosFormularioBase/>
        </template>
    </VDataView>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineAsyncComponent, ref } from 'vue';
import useModulos from '../composables/useModulos';

// dependencias
const route = useRoute();
const { obtenerModulo, reiniciarDataModulos, habilitarEdicion, editarModulo } = useModulos();

// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const ModulosFormularioBase = defineAsyncComponent(() => import('../components/forms/ModulosFormularioBase.vue'));

// configuracion vista
const peticiones = ref([
    obtenerModulo({ id: route.params.id }),
])
</script>