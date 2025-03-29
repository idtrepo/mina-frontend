<template>
    <VListadoView :elementos="categoriasListado" :numElementos="numeroElementos" :obtenerListado="obtenerCategorias"
        :reiniciarData="reiniciarDataCreacion">
        <template #formulario-buscar>
            <CategoriasBuscador />
        </template>
        <template #formulario-agregar>
            <CategoriasFormulario />
        </template> 
    </VListadoView>
</template>

<script setup>
import { onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useCategorias from '../composables/useCategorias';

// dependencias
const { categoriasListado, numeroElementos, obtenerCategorias, reiniciarDataCreacion, reiniciarDataCategorias } = useCategorias();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const CategoriasBuscador = defineAsyncComponent(() => import('../components/forms/categorias/CategoriasBuscador.vue'));
const CategoriasFormulario = defineAsyncComponent(() => import('../components/forms/categorias/CategoriasFormulario.vue'));

// ciclo de vida
onUnmounted(() => {
    reiniciarDataCategorias()
})
</script>