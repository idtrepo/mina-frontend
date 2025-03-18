<template>
    <VBuscadorBase :="confFormulario">
        <template #contenido>
            <UsuariosBuscadorBase/>
        </template>
    </VBuscadorBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useUsuarios from '../../composables/useUsuarios';

// dependencias
const { obtenerUsuarios } = useUsuarios();

// componentes
const VBuscadorBase = defineAsyncComponent(() => import('@/components/forms/VBuscadorBase.vue'));
const UsuariosBuscadorBase = defineAsyncComponent(() => import('./UsuariosBuscadorBase.vue'))

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'buscar',
    accionFormulario: obtenerUsuarios,
})
</script>