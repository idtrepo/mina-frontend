<template>
    <BaseView :config="config">
        <template #modal-form>
            <UsuariosForm/>
        </template>
    </BaseView>
</template>

<script setup>
import { computed } from 'vue'
import { onMounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { SIMBOLO } from '@/modules/global/utils/simbolos';
import useUsuariosStore from '@/modules/usuarios/stores/useUsuariosStore';
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { VISTA } from '@/modules/global/utils/vistas';

//Componentes
const BaseView = defineAsyncComponent(() => import('@/modules/global/views/BaseView.vue'))
const UsuariosForm = defineAsyncComponent(() => import('@/modules/usuarios/components/forms/UsuariosForm.vue'))

//Dependencias
const notifiacion = useNotificacion();
const usuariosStore = useUsuariosStore();
const { usuarios } = storeToRefs(usuariosStore);

//Listado de usuarios
const mapUsuarios = computed(() => usuarios.value.map(usuario => ({
    id: usuario.id,
    titulo: usuario.nombre,
    icono: SIMBOLO.USUARIOS,
    vista: VISTA.USUARIOS_DATA
})));

//Hooks
onMounted(() => {
    usuariosStore.obtenerUsuarios()
        .then(console.log)
        .catch(({ response }) => {
            const { data } = response;
            console.log(response);
            notifiacion.nError({ mensaje: data.error });
        });
});

//Config vista
const config = computed(() => ({
    data: mapUsuarios.value
}))
</script>