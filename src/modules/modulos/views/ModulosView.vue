<template>
    <VListadoView
        :elementos="modulosListado"
        :numElementos="numeroElementos"
        :obtenerListado="obtenerModulos"
        :reiniciarData="reiniciarDataCreacion">
        <template #formulario-buscar>
            <ModulosBuscador/>
        </template>
        <template #formulario-agregar>
            <ModulosFormulario/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useModulos from '../composables/useModulos';
import useAreas from '@/modules/areas/composables/useAreas';
import useClientes from '@/modules/clientes/composables/useClientes';
import useSucursales from '@/modules/sucursales/composables/useSucursales';

// dependencias
const { modulosListado, numeroElementos, obtenerModulos, reiniciarDataModulos, reiniciarDataCreacion } = useModulos();
const { obtenerAreas } = useAreas();
const { obtenerClientes } = useClientes();
const { obtenerSucursales } = useSucursales();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const ModulosBuscador = defineAsyncComponent(() => import('../components/forms/ModulosBuscador.vue'));
const ModulosFormulario = defineAsyncComponent(() => import('../components/forms/ModulosFormulario.vue'));

onMounted(() => {
    Promise.allSettled([
        obtenerAreas({ params: { listado: true } }),
        obtenerClientes({ params: { listado: true } }),
        obtenerSucursales({ params: { listado: true } }),
    ])
        .then(console.log)
        .catch(console.log)
});

onUnmounted(() => {
    reiniciarDataModulos();
})
</script>