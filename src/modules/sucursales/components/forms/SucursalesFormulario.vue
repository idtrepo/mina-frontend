<template>
    <VFormularioBase :="confFormulario">
        <template #contenido>
            <SucursalesFormularioBase/>
        </template>
    </VFormularioBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useSucursales from '../../composables/useSucursales';

// dependencias
const { crearSucursal } = useSucursales();

// componentes
const VFormularioBase = defineAsyncComponent(() => import('@/components/forms/VFormularioBase.vue'));
const SucursalesFormularioBase = defineAsyncComponent(() => import('./SucursalesFormBase.vue'));

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'crear',
    accionFormulario: crearSucursal,
})
</script>