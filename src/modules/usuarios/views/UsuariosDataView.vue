<template>
    <VDataView
        :peticiones="peticiones"
        :reiniciar-data="reiniciarDataUsuarios"
        :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarUsuario">>               
            <template #formulario>
                <UsuarioFormBase/>
            </template>      
    </VDataView>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import useUsuarios from '../composables/useUsuarios'
import usePerfiles from '@/modules/perfiles/composables/usePerfiles'
import useClientes from '@/modules/clientes/composables/useClientes'
import useAreas from '@/modules/areas/composables/useAreas'
import useSucursales from '@/modules/sucursales/composables/useSucursales';

// dependencias
const route = useRoute();
const {obtenerUsuario, editarUsuario, reiniciarDataUsuarios, habilitarEdicion} = useUsuarios();
const { obtenerPerfiles } = usePerfiles();
const { obtenerAreas} = useAreas();
const { obtenerClientes} = useClientes();
const { obtenerSucursales} = useSucursales();


// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const UsuarioFormBase = defineAsyncComponent(() => import('../components/forms/UsuarioFormBase.vue'));

const peticiones = ref([
    obtenerUsuario({id: route.params.id}),
    obtenerAreas({params:{ listado: true }}),
    obtenerClientes({params:{ listado: true }}),
    obtenerSucursales({params:{ listado: true }}),
    obtenerPerfiles({params:{ listado: true }}),
])
</script>