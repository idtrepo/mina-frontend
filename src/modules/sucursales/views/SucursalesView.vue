<template>
    <VListadoView
        :elementos="sucursalesListado"
        :numElementos="numeroElementos"
        :obtenerListado = "obtenerSucursales"
        :reiniciarData = "reiniciarDataCreacion"
        >
        <template #formulario-buscar>
            <SucursalesBuscador/>
        </template>
        <template #formulario-agregar>
            <SucursalesFormulario/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onUnmounted, onMounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useClientes from '@/modules/clientes/composables/useClientes';

// dependencias
const { sucursalesListado, numeroElementos, obtenerSucursales, reiniciarDataSucursales, reiniciarDataCreacion } = useSucursales();
const { obtenerClientes } = useClientes();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const SucursalesBuscador = defineAsyncComponent(() => import('../components/forms/SucursalesBuscador.vue'));
const SucursalesFormulario = defineAsyncComponent(() => import('../components/forms/SucursalesFormulario.vue'));

// ciclo de vida
onMounted(() => {
    Promise.allSettled([
        obtenerClientes(),
    ])
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    reiniciarDataSucursales()
})
</script>