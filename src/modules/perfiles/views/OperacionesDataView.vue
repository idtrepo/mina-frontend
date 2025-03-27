<template>
    <VDataView :peticiones="peticiones" :reiniciar-data="reiniciarDataOperaciones" :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarOperacion">
        <template #formulario>
            <OperacionesFormularioBase />
        </template>
    </VDataView>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineAsyncComponent, ref, onMounted, h, computed } from 'vue';
import { storeToRefs } from 'pinia'
import useOperaciones from '../composables/useOperaciones';

// dependencias
const route = useRoute();
const { obtenerOperacion, reiniciarDataOperaciones, habilitarEdicion, editarOperacion, edicionHabilitada } = useOperaciones();

// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const OperacionesFormularioBase = defineAsyncComponent(() => import('../components/forms/operaciones/OperacionesFormularioBase.vue'));

const peticiones = ref([
    obtenerOperacion({ id: route.params.id })
])
// ciclo de vida
onMounted(() => {
    const operacionId = route.params.id;
    obtenerOperacion(operacionId);
})
</script>