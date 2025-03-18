<template>
    <VDataView 
        :peticiones="peticiones"
        :reiniciar-data="reiniciarDataSucursales"
        :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarSucursal">
        <template #formulario>
            <SucursalesFormularioBase/>
        </template>
    </VDataView>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineAsyncComponent, ref } from 'vue';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useClientes from '@/modules/clientes/composables/useClientes';

// dependencias
const route = useRoute();
const { obtenerSucursal, reiniciarDataSucursales, habilitarEdicion, editarSucursal } = useSucursales();
const { obtenerClientes } = useClientes();

// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const SucursalesFormularioBase = defineAsyncComponent(() => import('../components/forms/SucursalesFormularioBase.vue'));

// configuracion vista
const peticiones = ref([
    obtenerSucursal({ id: route.params.id }),
    obtenerClientes({ params: { listado: true } })
])
</script>