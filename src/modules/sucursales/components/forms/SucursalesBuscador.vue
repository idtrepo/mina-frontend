<template>
    <VBuscadorBase :="confFormulario">
        <template #contenido>
            <SucursalesBuscadorBase/>
        </template>
    </VBuscadorBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useSucursales from '../../composables/useSucursales';

// dependencias
const { obtenerSucursales } = useSucursales();

// componentes
const VBuscadorBase = defineAsyncComponent(() => import('@/components/forms/VBuscadorBase.vue'));
const SucursalesBuscadorBase = defineAsyncComponent(() => import('./SucursalesBuscadorBase.vue'))

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'buscar',
    accionFormulario: obtenerSucursales,
})
</script>