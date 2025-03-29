<template>
    <VBuscadorBase :="confFormulario">
        <template #contenido>
            <AccionesBuscadorBase/>
        </template>
    </VBuscadorBase>
</template>

<script setup>  
import {ref, defineAsyncComponent} from 'vue';
import useAcciones from '../../../composables/useAcciones';

// dependencias
const {obtenerAcciones} = useAcciones();

// componentes
const VBuscadorBase = defineAsyncComponent(() => import('@/components/forms/VBuscadorBase.vue'));
const AccionesBuscadorBase = defineAsyncComponent(() => import('./AccionesBuscadorBase.vue'));

//data
const confFormulario = ref({
    tituloBoton: 'buscar',
    accionFormulario: obtenerAcciones,
})
</script>