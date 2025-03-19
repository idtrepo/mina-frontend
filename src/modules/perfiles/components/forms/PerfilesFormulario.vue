<template>
    <VFormularioBase :="confFormulario">
        <template #contenido>
            <PerfilesFormularioBase/>
        </template>
    </VFormularioBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import usePerfiles from '../../composables/usePerfiles';

// dependencias
const { crearPerfil } = usePerfiles();

// componentes
const VFormularioBase = defineAsyncComponent(() => import('@/components/forms/VFormularioBase.vue'));
const PerfilesFormularioBase = defineAsyncComponent(() => import('./PerfilesFormularioBase.vue'));

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'crear',
    accionFormulario: crearPerfil,
})
</script>