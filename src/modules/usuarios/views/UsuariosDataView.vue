<template>
    <VDataView 
        :peticiones="peticiones"
        :reiniciar-data="reiniciarDataUsuarios"
        :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarUsuario">
        <template #formulario>
            <UsuariosFormularioBase/>
        </template>
    </VDataView>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineAsyncComponent, ref } from 'vue';
import useUsuarios from '../composables/useUsuarios';
import useAreas from '@/modules/areas/composables/useAreas';
import useClientes from '@/modules/clientes/composables/useClientes';
import usePerfiles from '@/modules/perfiles/composables/usePerfiles';
import useSucursales from '@/modules/sucursales/composables/useSucursales';

// dependencias
const route = useRoute();
const { obtenerUsuario, reiniciarDataUsuarios, habilitarEdicion, editarUsuario } = useUsuarios();
const { obtenerAreas } = useAreas();
const { obtenerClientes } = useClientes();
const { obtenerPerfiles } = usePerfiles();
const { obtenerSucursales } = useSucursales();

// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const UsuariosFormularioBase = defineAsyncComponent(() => import('../components/forms/UsuariosFormularioBase.vue'));

// configuracion vista
const peticiones = ref([
    obtenerUsuario({ id: route.params.id }),
    obtenerAreas({ params: { listado: true } }),
    obtenerClientes({ params: { listado: true } }),
    obtenerPerfiles({ params: { listado: true } }),
    obtenerSucursales({ params: { listado: true } }),
])
</script>