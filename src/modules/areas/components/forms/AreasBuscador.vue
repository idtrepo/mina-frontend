<template>
    <VBuscadorBase :="confFormulario">
        <template #contenido>
            <AreasBuscadorBase/>
        </template>
    </VBuscadorBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useAreas from '../../composables/useAreas';

// dependencias
const { obtenerAreas } = useAreas();

// componentes
const VBuscadorBase = defineAsyncComponent(() => import('@/components/forms/VBuscadorBase.vue'));
const AreasBuscadorBase = defineAsyncComponent(() => import('./AreasBuscadorBase.vue'))

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'buscar',
    accionFormulario: obtenerAreas,
})
</script>