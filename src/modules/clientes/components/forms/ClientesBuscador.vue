<template>
    <VBuscadorBase :="confFormulario">
        <template #contenido>
            <ClientesBuscadorBase/>
        </template>
    </VBuscadorBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useClientes from '../../composables/useClientes';

// dependencias
const { obtenerClientes } = useClientes();

// componentes
const VBuscadorBase = defineAsyncComponent(() => import('@/components/forms/VBuscadorBase.vue'));
const ClientesBuscadorBase = defineAsyncComponent(() => import('./ClientesBuscadorBase.vue'))

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'buscar',
    accionFormulario: obtenerClientes,
})
</script>