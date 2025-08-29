<template>
    <VListadoView :elementos="modulosListado" :numElementos="numeroElementos" :obtenerListado="obtenerModulos"
        :reiniciarData="reiniciarDataCreacion">
        <template v-if="permisoNotificaciones" #boton-extra="{ mostrarModalExtra }">
            <NButton @click="mostrarModalExtra" type="info">
                <span class="uppercase font-bold">Notificaciones</span>
            </NButton>
        </template>
        <template #boton-extra-float="{ mostrarModalExtra }">
            <NFloatButton @click="mostrarModalExtra" type="info">
                <i class="fa-solid fa-bell"></i>
            </NFloatButton>
        </template>
        <template #formulario-extra>
            <FormularioNotificaciones />
        </template>
        <template #formulario-buscar>
            <ModulosBuscador />
        </template>
        <template #formulario-agregar>
            <ModulosFormulario />
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { NButton, NFloatButton } from 'naive-ui';
import useModulos from '../composables/useModulos';
import useAreas from '@/modules/areas/composables/useAreas';
import useClientes from '@/modules/clientes/composables/useClientes';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useUsuarioStore from '@/stores/useUsuarioStore';
import useFiltrosStore from '@/stores/useFiltrosStore';
import useAutenticacion from '@/modules/auth/composables/useAutenticacion';
import { useRoute } from 'vue-router';

// dependencias
const { modulosListado, numeroElementos, obtenerModulos, reiniciarDataModulos, reiniciarDataCreacion } = useModulos();
const { obtenerAreas } = useAreas();
const { obtenerClientes } = useClientes();
const { obtenerSucursales } = useSucursales();
const { usuarioPerfilId } = useUsuarioStore();
const { filtros } = useFiltrosStore();
const route = useRoute();
const { usuarioPermisos } = useAutenticacion();
const permisoNotificaciones = computed(() => usuarioPermisos.value?.correos?.includes('crear') || false);
// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const ModulosBuscador = defineAsyncComponent(() => import('../components/forms/ModulosBuscador.vue'));
const ModulosFormulario = defineAsyncComponent(() => import('../components/forms/ModulosFormulario.vue'));
const FormularioNotificaciones = defineAsyncComponent(() => import('../components/forms/NotificacionesFormulario.vue'));

onMounted(async () => {
    await obtenerAreas({ params: { listado: true } }),
    await obtenerClientes({ params: { listado: true } }),
    await obtenerSucursales({ params: { listado: true } }),
    route.params.id ? filtros.area = route.params.id : filtros.area = undefined;
    Promise.allSettled([
        obtenerModulos({ params: { listado: true } })
    ])
        .then(console.log)
        .catch(console.log)
});

onUnmounted(() => {
    reiniciarDataModulos();
})
</script>