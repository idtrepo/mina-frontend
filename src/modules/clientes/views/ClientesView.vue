<template>
    <VListadoView
        :elementos="clientesListado"
        :numElementos="numeroElementos"
        :obtenerListado="obtenerClientes"
        :reiniciarData="reiniciarDataCreacion">
        <template #formulario-buscar>
            <ClientesBuscador/>
        </template>
        <template #formulario-agregar>
            <ClientesFormulario/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, provide, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useClientes from '../composables/useClientes';

// dependencias
const { clientesListado, numeroElementos,obtenerClientes, reiniciarDataClientes, reiniciarDataCreacion} = useClientes();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const ClientesBuscador = defineAsyncComponent(() => import('../components/forms/ClientesBuscador.vue'));
const ClientesFormulario = defineAsyncComponent(() => import('../components/forms/ClientesFormulario.vue'));

onMounted(() => {
    obtenerClientes({params:{ listado: true }})
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    reiniciarDataClientes();
})
</script>