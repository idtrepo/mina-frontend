<template>
    <VDataView 
        :peticiones="peticiones"
        :reiniciar-data="reiniciarDataPerfiles"
        :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarPerfil">
        <template #formulario>
            <PerfilesFormularioBase/>
        </template>
    </VDataView>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineAsyncComponent, ref } from 'vue';
import usePerfiles from '../composables/usePerfiles';

// dependencias
const route = useRoute();
const { obtenerPerfil, reiniciarDataPerfiles, habilitarEdicion, editarPerfil } = usePerfiles();

// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const PerfilesFormularioBase = defineAsyncComponent(() => import('../components/forms/PerfilesFormularioBase.vue'));

// configuracion vista
const peticiones = ref([
    obtenerPerfil({ id: route.params.id }),
])
</script>