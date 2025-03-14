<template>
    <VFormularioBase :="confFormulario">
        <template #contenido>
            <ModulosFormularioBase/>
        </template>
    </VFormularioBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useModulos from '../../composables/useModulos';

// dependencias
const { crearModulo } = useModulos();

// componentes
const VFormularioBase = defineAsyncComponent(() => import('@/components/forms/VFormularioBase.vue'));
const ModulosFormularioBase = defineAsyncComponent(() => import('./ModulosFormularioBase.vue'));

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'crear',
    accionFormulario: crearModulo,
})
</script>