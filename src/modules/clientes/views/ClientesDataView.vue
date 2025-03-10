<template>
    <VDataView
        :peticiones="peticiones"
        :reiniciar-data="reiniciarDataClientes"
        :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarCliente">
        <template #formulario>
            <ClientesFormbase />
        </template>    
    </VDataView>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import useClientes from '../composables/useClientes';

// dependencias
const route = useRoute();
const {reiniciarDataClientes, habilitarEdicion, editarCliente, obtenerCliente} = useClientes();

const peticiones = [
    obtenerCliente({id: route.params.id}),
]

// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const ClientesFormbase = defineAsyncComponent(() => import('../components/forms/ClientesFormbase.vue'));

</script>