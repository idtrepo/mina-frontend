<template>
    <VDataView
        :peticiones="peticiones"
        :reiniciar-data="reiniciarDataModulos"
        :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarModulo">
        <template #formulario>
            <ModulosFormBase />
        </template>    
    </VDataView>
</template>

<script setup>
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import useModulos from '../composables/useModulos'
import useAreas from '@/modules/areas/composables/useAreas'
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useClientes from '@/modules/clientes/composables/useClientes'

const { obtenerModulo, editarModulo, reiniciarDataModulos, habilitarEdicion } = useModulos();
const { obtenerAreas } = useAreas();
const { obtenerSucursales } = useSucursales();
const { obtenerClientes } = useClientes();
const route = useRoute();

const peticiones = ref([
    obtenerModulo({id: route.params.id}),
    obtenerAreas({params:{ listado: true }}),
    obtenerSucursales({params:{ listado: true }}),
    obtenerClientes({params:{ listado: true }})
])

//componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const ModulosFormBase = defineAsyncComponent(() => import('../components/forms/ModulosFormbase.vue'));
</script>