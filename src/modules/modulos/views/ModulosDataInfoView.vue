<template>
    <VDataView :peticiones="peticiones" :reiniciar-data="reiniciarDataModulos" :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarModulo">
        <template #formulario>
            <ModulosFormularioBase />
        </template>
    </VDataView>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineAsyncComponent, ref } from 'vue';
import useModulos from '../composables/useModulos';
import useAreas from '@/modules/areas/composables/useAreas';
import useClientes from '@/modules/clientes/composables/useClientes';
import useSucursales from '@/modules/sucursales/composables/useSucursales';

// dependencias
const route = useRoute();
const { obtenerModulo, reiniciarDataModulos, habilitarEdicion, editarModulo } = useModulos();
const { obtenerAreas } = useAreas();
const { obtenerClientes } = useClientes();
const { obtenerSucursales } = useSucursales();

// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const ModulosFormularioBase = defineAsyncComponent(() => import('../components/forms/ModulosFormularioBase.vue'));

// configuracion vista
const peticiones = ref([
    obtenerModulo({ id: route.params.id }),
    obtenerAreas({ params: { listado: true } }),
    obtenerSucursales({ params: { listado: true } }),
    obtenerClientes({ params: { listado: true } }),
])
</script>