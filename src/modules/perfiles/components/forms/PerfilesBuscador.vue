<template>
    <VBuscadorBase :="confFormulario">
        <template #contenido>
            <PerfilesBuscadorBase/>
        </template>
    </VBuscadorBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import usePerfiles from '../../composables/usePerfiles';

// dependencias
const { obtenerPerfiles } = usePerfiles();

// componentes
const VBuscadorBase = defineAsyncComponent(() => import('@/components/forms/VBuscadorBase.vue'));
const PerfilesBuscadorBase = defineAsyncComponent(() => import('./PerfilesBuscadorBase.vue'))

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'buscar',
    accionFormulario: obtenerPerfiles,
})
</script>