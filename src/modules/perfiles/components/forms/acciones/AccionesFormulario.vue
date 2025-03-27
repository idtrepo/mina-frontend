<template>
    <VFormularioBase :="confFormulario">
        <template #contenido>
            <AccionesFormularioBase/>
        </template>
    </VFormularioBase>
</template>

<script setup>
import {ref, defineAsyncComponent} from 'vue';
import useAcciones from '../../../composables/useAcciones';

// dependencias
const {crearAccion} = useAcciones();

// componentes
const VFormularioBase = defineAsyncComponent(() => import('@/components/forms/VFormularioBase.vue'));
const AccionesFormularioBase = defineAsyncComponent(() => import('./AccionesFormularioBase.vue'));

//data
const confFormulario = ref({
    tituloBoton: 'crear',
    accionFormulario: crearAccion,
})
</script>