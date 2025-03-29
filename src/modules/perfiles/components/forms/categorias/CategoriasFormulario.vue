<template>
    <VFormularioBase :="confFormulario">
        <template #contenido>
            <CategoriasFormularioBase/>
        </template>
    </VFormularioBase>
</template>

<script setup>
import {ref, defineAsyncComponent} from 'vue';
import useCategorias from '../../../composables/useCategorias';

// dependencias
const {crearCategoria} = useCategorias();

// componentes
const VFormularioBase = defineAsyncComponent(() => import('@/components/forms/VFormularioBase.vue'));
const CategoriasFormularioBase = defineAsyncComponent(() => import('./CategoriasFormularioBase.vue'));

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'crear',
    accionFormulario: crearCategoria,
})
</script>