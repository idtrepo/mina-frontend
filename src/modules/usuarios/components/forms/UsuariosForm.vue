<template>
    <VFormularioBase :="confFormulario">
        <template #contenido>
            <UsuariosFormularioBase/>
        </template>
    </VFormularioBase>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useUsuarios from '../../composables/useUsuarios';

// dependencias
const { crearUsuario } = useUsuarios();

// componentes
const VFormularioBase = defineAsyncComponent(() => import('@/components/forms/VFormularioBase.vue'));
const UsuariosFormularioBase = defineAsyncComponent(() => import('./UsuarioFormularioAgregarBase.vue'));

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'crear',
    accionFormulario: crearUsuario,
})
</script>