<template>
    <VBuscadorBase :="confFormulario">
        <template #contenido>
            <SensoresBuscadorBase/>
        </template>
    </VBuscadorBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useSensores from '../../composables/useSensores';

// dependencias
const { obtenerSensores } = useSensores();

// componentes
const VBuscadorBase = defineAsyncComponent(() => import('@/components/forms/VBuscadorBase.vue'));
const SensoresBuscadorBase = defineAsyncComponent(() => import('./SensoresBuscadorBase.vue'));

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'buscar',
    accionFormulario: obtenerSensores,
})
</script>