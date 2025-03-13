<template>
    <VFormularioBase :="confFormulario">
        <template #contenido>
            <ClientesFormularioBase/>
        </template>
    </VFormularioBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useClientes from '../../composables/useClientes';

// dependencias
const { crearCliente } = useClientes();

// componentes
const VFormularioBase = defineAsyncComponent(() => import('@/components/forms/VFormularioBase.vue'));
const ClientesFormularioBase = defineAsyncComponent(() => import('./ClientesFormularioBase.vue'));

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'crear',
    accionFormulario: crearCliente,
})
</script>