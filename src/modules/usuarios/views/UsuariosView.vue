<template>
    <VListadoView :elementos="usuariosListado" :numElementos="numeroElementos" :obtenerListado="obtenerUsuarios"
        :reiniciarData="reiniciarDataCreacion">
        <template #formulario-buscar>
            <UsuariosBuscador />
        </template>
        <template #formulario-agregar>
            <UsuariosFormulario />
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useUsuarios from '../composables/useUsuarios';
import usePerfiles from '@/modules/perfiles/composables/usePerfiles';
import useClientes from '@/modules/clientes/composables/useClientes';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useAreas from '@/modules/areas/composables/useAreas';

// dependencias
const { usuariosListado, numeroElementos, obtenerUsuarios, reiniciarDataCreacion, reiniciarDataUsuarios } = useUsuarios();
const { obtenerPerfiles } = usePerfiles();
const { obtenerClientes } = useClientes();
const { obtenerSucursales } = useSucursales();
const { obtenerAreas } = useAreas();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const UsuariosBuscador = defineAsyncComponent(() => import('../components/forms/UsuariosBuscador.vue'));
const UsuariosFormulario = defineAsyncComponent(() => import('../components/forms/UsuariosFormulario.vue'));


onMounted(() => {
    Promise.allSettled([
        obtenerPerfiles({ params: { listado: true } }),
        obtenerClientes({ params: { listado: true } }),
        obtenerSucursales({ params: { listado: true } }),
        obtenerAreas({ params: { listado: true } }),
    ])
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    reiniciarDataUsuarios()
})
</script>