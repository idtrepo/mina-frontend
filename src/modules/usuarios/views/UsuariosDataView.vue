<template>
    <BaseDataView :config="config">
        <template #contenido="{ editar }">
            <article>
                <p class="uppercase mb-1">nombre</p>
                <NInput
                    v-model:value="usuario.nombre"
                    :placeholder="USUARIOS_PLACEHOLDER.NOMBRE"
                    :disabled="!editar"/>
            </article>
            <article>
                <p class="uppercase mb-1">apellido</p>
                <NInput
                    v-model:value="usuario.apellido"
                    :placeholder="USUARIOS_PLACEHOLDER.APELLIDO"
                    :disabled="!editar"/>
            </article>
            <article>
                <p class="uppercase mb-1">correo</p>
                <NInput
                    v-model:value="usuario.correo"
                    :placeholder="USUARIOS_PLACEHOLDER.CORREO"
                    :disabled="!editar"/>
            </article>
            <article>
                <p class="uppercase mb-1">perfil</p>
                <NSelect
                    v-model:value="usuario.idPerfil"
                    :options="opcionesPerfiles"
                    clearable
                    :placeholder="USUARIOS_PLACEHOLDER.PERFIL"
                    :disabled="!editar"/>
            </article>
            <article>
                <p class="uppercase mb-1">cliente</p>
                <NSelect 
                    v-model:value="usuario.idCliente"
                    :options="opcionesClientes"
                    :disabled="!editar"
                    :placeholder="USUARIOS_PLACEHOLDER.CLIENTE"/>
            </article>
            <template v-if="editar">
                <article>
                    <p class="uppercase mb-1">password</p>
                    <NInput
                        v-model:value="usuario.password"
                        :placeholder="USUARIOS_PLACEHOLDER.PASSWORD"
                        :disabled="!editar"/>
                </article>
                <article>
                    <p class="uppercase mb-1">verificar password</p>
                    <NInput
                        v-model:value="verificarPassword"
                        :placeholder="USUARIOS_PLACEHOLDER.PASSWORD_VERIFICACION"
                        :disabled="!editar"/>
                </article>
                <article>
                    <p class="uppercase mb-1">estatus</p>
                    <NSwitch 
                        v-model:value="usuario.estatus"
                        :disabled="!editar"/>
                </article>
            </template>
        </template>
    </BaseDataView>
</template>

<script setup>
import { ref, computed, toValue, defineAsyncComponent, provide } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import useUsuariosStore from '../stores/useUsuariosStore';
import { NInput, NSelect, NSwitch } from 'naive-ui'
import { USUARIOS_PLACEHOLDER } from '@/modules/global/utils/placeholder';
import usePerfilesStore from '@/modules/perfiles/stores/usePerfilesStore';
import useClientesStore from '@/modules/clientes/stores/useClientesStore';
import { evaluarUsuarioParcial } from '../schemas/usuariosSchema';
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { MENSAJE_ERROR } from '@/modules/global/utils/mensajes';
import { eliminarNulos } from '@/modules/global/utils/data';

//Dependencias
const notificacion = useNotificacion();
const route = useRoute();
const usuariosStore = useUsuariosStore();
const perfilesStore = usePerfilesStore();
const clientesStore = useClientesStore();
const { perfiles } = storeToRefs(perfilesStore);
const { clientes } = storeToRefs(clientesStore)

//Componentes
const BaseDataView = defineAsyncComponent(() => import('@/modules/global/views/BaseDataView.vue'));

//Info usuario
const usuario = ref({
    id: null,
    correo: null,
    password: null,
    nombre: null,
    apellido: null,
    idPerfil: null,
    idCliente: null,
    estatus: null
});
const hayInfoUsuario = computed(() => (!!usuario.value.correo
    && !!usuario.value.nombre
    && !!usuario.value.apellido
));

const asignarDataUsuario = ({ data }) => {
    const { id, correo, nombre, apellido, perfil, cliente, estatus } = data;

    usuario.value.id = id;
    usuario.value.nombre = nombre;
    usuario.value.apellido = apellido;
    usuario.value.correo = correo;
    usuario.value.estatus = estatus;
    usuario.value.idPerfil = perfil?.id ?? null;
    usuario.value.idCliente = cliente?.id ?? null;
}

//Opciones seleccion
const opcionesPerfiles = computed(() => perfiles.value.map(({ id, nombre }) => ({
    label: nombre,
    value: id
})));

const opcionesClientes = computed(() => clientes.value.map(({ id, nombre }) => ({
    label: nombre,
    value: id
})))

//Editar usuario
const verificarPassword = ref(null);
const validarPassword = computed(() => {
    if(!usuario.value.password) return true;
    return usuario.value.password === verificarPassword.value;
});

const cancelarEdicion = () => {
    usuario.value.password = null;
    verificarPassword.value = null;
}

const editarUsuario = async() => {
    const { id } = usuario.value;

    const { error, data } = await evaluarUsuarioParcial(toValue(usuario)); 

    if(error){
        return notificacion.nAviso({ mensaje: MENSAJE_ERROR.VALIDACION });
    }

    if(!validarPassword.value)
        return notificacion.nAviso({ mensaje: MENSAJE_ERROR.PASSWORD });

    try{
        const { mensaje } = await usuariosStore.editarUsuario({ id, data: eliminarNulos(data) });
        const resUsuario = await usuariosStore.obtenerUsuario({ id });

        notificacion.nExito({ mensaje });
        asignarDataUsuario(resUsuario);
    }catch({ response: { data: { error:mensaje } } }){
        notificacion.nError({ mensaje });
    }
}

//Hooks
onMounted(() => {
    const { params } = route;

    usuariosStore.obtenerUsuario({ id: params.id })
        .then(res => {
            console.log(res);
            asignarDataUsuario(res)
        })
        .catch(console.log);

    perfilesStore.obtenerPerfiles()
        .then(console.log)
        .catch(console.log);

    clientesStore.obtenerClientes()
        .then(console.log)
        .catch(console.log);
});

//Config vista
const config = ref({
    tituloVista: 'Datos del usuario',
    editarElemento: editarUsuario,
    cancelarEdicion,
})

provide('elemento', { elemento:usuario })
</script>