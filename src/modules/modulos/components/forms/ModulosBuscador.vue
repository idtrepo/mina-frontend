<template>
    <VBuscadorBase :="confFormulario">
        <template #contenido>
            <ModulosBuscadorBase/>
        </template>
    </VBuscadorBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useModulos from '../../composables/useModulos';

// dependencias
const { obtenerModulos } = useModulos();

// componentes
const VBuscadorBase = defineAsyncComponent(() => import('@/components/forms/VBuscadorBase.vue'));
const ModulosBuscadorBase = defineAsyncComponent(() => import('./ModulosBuscadorBase.vue'));

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'buscar',
    accionFormulario: obtenerModulos,
})
</script>