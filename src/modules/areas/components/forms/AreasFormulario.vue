<template>
    <VFormularioBase :="confFormulario">
        <template #contenido>
            <AreasFormularioBase/>
        </template>
    </VFormularioBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useAreas from '../../composables/useAreas';

// dependencias
const { crearArea } = useAreas();

// componentes
const VFormularioBase = defineAsyncComponent(() => import('@/components/forms/VFormularioBase.vue'));
const AreasFormularioBase = defineAsyncComponent(() => import('./AreasFormularioBase.vue'));

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'crear',
    accionFormulario: crearArea,
})
</script>