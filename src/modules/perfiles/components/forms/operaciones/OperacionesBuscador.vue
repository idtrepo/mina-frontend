<template>
    <VBuscadorBase :="confFormulario">
        <template #contenido>
            <OperacionesBuscadorBase/>
        </template>
    </VBuscadorBase>
</template>

<script setup>
import {ref, defineAsyncComponent} from 'vue';
import useOperaciones from '../../../composables/useOperaciones';

// dependencias
const {obtenerOperaciones} = useOperaciones();

// componentes
const VBuscadorBase = defineAsyncComponent(() => import('@/components/forms/VBuscadorBase.vue'));
const OperacionesBuscadorBase = defineAsyncComponent(() => import('./OperacionesBuscadorBase.vue'));

// data
const confFormulario = ref({
    tituloBoton: 'buscar',
    accionFormulario: obtenerOperaciones,
})
</script>