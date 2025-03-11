<template>
    <VListadoView
        :elementos="perfilesListado"
        :resultados="numElementos"
        :obtener-listado="obtenerPerfiles"
        :reiniciar-data="reiniciarDataCreacion">
        <template #buscador>
            <PerfilesBuscador/>
        </template>
        <template #formulario>
            <PerfilesForm/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, provide, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import usePerfiles from '../composables/usePerfiles';

//dependencias
const { numElementos, perfilesListado, obtenerPerfiles, reiniciarDataPerfiles, reiniciarDataCreacion } = usePerfiles()

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const PerfilesForm = defineAsyncComponent(() => import('@/modules/perfiles/components/PerfilesForm.vue'));
const PerfilesBuscador = defineAsyncComponent(() => import('@/modules/perfiles/components/PerfilesBuscador.vue'));

onUnmounted(() => {
    reiniciarDataPerfiles();
    })
</script>