<template>
    <VDataView
        :peticiones="peticiones"
        :reiniciar-data="reiniciarDataSucursales"
        :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarSucursal">
        <template #formulario>
            <SucursalFormBase />
        </template>    
    </VDataView>
</template>

<script setup>
import { ref, computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import {useRoute} from 'vue-router'
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useClientes from '@/modules/clientes/composables/useClientes';

// dependencias
const route = useRoute()
const {obtenerSucursal, editarSucursal, habilitarEdicion, reiniciarDataSucursales} = useSucursales();
const {obtenerClientes} = useClientes();

const peticiones = ref([
    obtenerSucursal({id: route.params.id}),
    obtenerClientes({params:{ listado: true }}),
])

// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const SucursalFormBase = defineAsyncComponent(() => import('../components/forms/SucursalFormBase.vue'));

</script>