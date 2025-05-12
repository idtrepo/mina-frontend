<template>
    <VBuscadorBase :="confFormulario">
        <template #contenido>
            <DataBuscadorBase/>
        </template>
    </VBuscadorBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useData from '../../composables/useData';

// dependencias
const { obtenerData } = useData();

// componentes
const VBuscadorBase = defineAsyncComponent(() => import('@/components/forms/VBuscadorBase.vue'));
const DataBuscadorBase = defineAsyncComponent(() => import('./DataBuscadorBase.vue'));

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'buscar',
    accionFormulario: obtenerData,
})
</script>