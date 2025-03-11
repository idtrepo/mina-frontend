<template>
    <VListadoView
        :elementos="clientesListado"
        :resultados="numElementos"
        :obtener-listado="obtenerClientes"
        :reiniciar-data="reiniciarDataCreacion">
        <template #buscador>
            <ClientesBuscador/>
        </template>
        <template #formulario>
            <ClientesForm/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, provide, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useClientes from '../composables/useClientes';

// dependencias
const { clientesListado, numElementos,obtenerClientes, reiniciarDataClientes, reiniciarDataCreacion} = useClientes();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const ClientesForm = defineAsyncComponent(() => import('@/modules/clientes/components/ClientesForm.vue'));
const ClientesBuscador = defineAsyncComponent(() => import('@/modules/clientes/components/ClientesBuscador.vue'));

onMounted(() => {
    obtenerClientes({params:{ listado: true }})
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    reiniciarDataClientes();
})
</script>