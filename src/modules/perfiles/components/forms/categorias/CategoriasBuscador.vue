<template>
    <VBuscadorBase :="confFormulario">
        <template #contenido>
            <CategoriasBuscadorBase/>
        </template>
    </VBuscadorBase>
</template>

<script setup>
import {ref, defineAsyncComponent} from 'vue';
import useCategorias from '../../../composables/useCategorias';

// dependencias
const {obtenerCategorias} = useCategorias();

// componentes
const VBuscadorBase = defineAsyncComponent(() => import('@/components/forms/VBuscadorBase.vue'));
const CategoriasBuscadorBase = defineAsyncComponent(() => import('./CategoriasBuscadorBase.vue'));

// data
const confFormulario = ref({
    tituloBoton: 'buscar',
    accionFormulario: obtenerCategorias,
})
</script>