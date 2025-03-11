<template>
    <VDataView
        :peticiones="peticiones"
        :reiniciar-data="reiniciarDataPerfiles"
        :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarPerfil">
        <template #formulario>
            <PerfilesFormBase />
        </template>    
    </VDataView>
</template>

<script setup>
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import usePerfiles from '../composables/usePerfiles'

// dependencias
const route = useRoute();
const {obtenerPerfil, editarPerfil, reiniciarDataPerfiles, habilitarEdicion} = usePerfiles();

const peticiones = ref([
    obtenerPerfil({id: route.params.id}),
])

// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const PerfilesFormBase = defineAsyncComponent(() => import('../components/forms/PerfilesFormBase.vue'));


</script>