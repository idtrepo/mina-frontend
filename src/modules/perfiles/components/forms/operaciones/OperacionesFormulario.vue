<template>
    <VFormularioBase :="confFormulario">
        <template #contenido>
            <OperacionesFormularioBase/>
        </template>
    </VFormularioBase>
</template>

<script setup>
import {ref, defineAsyncComponent} from 'vue';
import useOperaciones from '../../../composables/useOperaciones';

// dependencias
const {crearOperacion} = useOperaciones();

// componentes
const VFormularioBase = defineAsyncComponent(() => import('@/components/forms/VFormularioBase.vue'));
const OperacionesFormularioBase = defineAsyncComponent(() => import('./OperacionesFormularioBase.vue'));

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'crear',
    accionFormulario: crearOperacion,
})
</script>