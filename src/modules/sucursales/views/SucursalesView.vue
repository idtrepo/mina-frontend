<template>
    <VListadoView :elementos="sucursalesListado" :numElementos="numeroElementos" :obtenerListado="obtenerSucursales"
        :reiniciarData="reiniciarDataCreacion">
        <template #formulario-buscar>
            <SucursalesBuscador />
        </template>
        <template #formulario-agregar>
            <SucursalesFormulario />
        </template>
        <template #formulario-extra>
            <formularioReporte></formularioReporte>
        </template>
        <template #boton-extra="{ mostrarModalExtra }">
            <NButton @click="mostrarModalExtra" type="info">
                <span class="uppercase font-bold">reporte</span>
            </NButton>
        </template>
        <template #boton-extra-float="{ mostrarModalExtra }">
            <NFloatButton @click="mostrarModalExtra" type="info">
                <i class="fa-solid fa-file"></i>
            </NFloatButton>
        </template>
    </VListadoView>
</template>

<script setup>
import { onUnmounted, onMounted, defineAsyncComponent } from 'vue'
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useClientes from '@/modules/clientes/composables/useClientes';
import { NButton, NFloatButton } from 'naive-ui';
import useFiltrosStore from '@/stores/useFiltrosStore';
import { useRoute } from 'vue-router'

// dependencias
const { sucursalesListado, numeroElementos, obtenerSucursales, reiniciarDataSucursales, reiniciarDataCreacion } = useSucursales();
const { obtenerClientes } = useClientes();
const { filtros } = useFiltrosStore();
const route = useRoute();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const SucursalesBuscador = defineAsyncComponent(() => import('../components/forms/SucursalesBuscador.vue'));
const SucursalesFormulario = defineAsyncComponent(() => import('../components/forms/SucursalesFormulario.vue'));
const formularioReporte = defineAsyncComponent(() => import('@/components/forms/reporteFormulario.vue'));

// ciclo de vida
onMounted(() => {
    Promise.allSettled([
        obtenerClientes(),
    ])
        .then(console.log)
        .catch(console.log);
    if (route.query.cliente) {
        filtros.cliente = route.query.cliente;
    }
});

onUnmounted(() => {
    reiniciarDataSucursales()
})
</script>