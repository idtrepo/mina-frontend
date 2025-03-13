<template>
    <VDataView 
        :peticiones="peticiones"
        :reiniciar-data="reiniciarDataClientes"
        :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarCliente">
        <template #formulario>
            <ClientesFormularioBase/>
        </template>
    </VDataView>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineAsyncComponent, ref } from 'vue';
import useClientes from '../composables/useClientes';

// dependencias
const route = useRoute();
const { obtenerCliente, reiniciarDataClientes, habilitarEdicion, editarCliente } = useClientes();

// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const ClientesFormularioBase = defineAsyncComponent(() => import('../components/forms/ClientesFormularioBase.vue'));

// configuracion vista
const peticiones = ref([
    obtenerCliente({ id: route.params.id }),
])
</script>