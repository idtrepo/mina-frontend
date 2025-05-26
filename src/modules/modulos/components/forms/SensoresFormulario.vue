<template>
    <VFormularioBase :="confFormulario">
        <template #contenido>
            <SensoresFormularioBase/>
        </template>
    </VFormularioBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useSensores from '../../composables/useSensores';
import { useRoute } from 'vue-router';

// dependencias
const route = useRoute();
const { crearSensor, sensor } = useSensores();
sensor.value.idModulo = parseInt(route.params.id);

// componentes
const VFormularioBase = defineAsyncComponent(() => import('@/components/forms/VFormularioBase.vue'));
const SensoresFormularioBase = defineAsyncComponent(() => import('./SensoresFormularioBase.vue'));

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'crear',
    accionFormulario: crearSensor,
})
</script>