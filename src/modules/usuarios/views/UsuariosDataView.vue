<template>
    <section>
        <header class="mb-5 flex justify-between items-center">
            <h2 class="uppercase text-xl font-bold">informacion del usuario</h2>
            <section>
                <template v-if="editar">
                    <NButton @click="cancelarEdicion" type="warning">
                        Cancelar
                    </NButton>
                    <NButton @click="editarUsuario" type="info" class="ml-1">
                        Guardar
                    </NButton>
                </template>
                <template v-else>
                    <NButton @click="habilitarEdicion" type="warning">
                        Editar
                    </NButton>
                </template>
            </section>
        </header>
        <NDivider/>
        <section class="grid grid-cols-4 gap-5 h-full">
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
        </section>
    </section>
</template>

<script setup>
import { ref, computed, toValue } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import useUsuariosStore from '../stores/useUsuariosStore';
import { NButton, NInput, NSelect, NSwitch, NDivider } from 'naive-ui'
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

//Info usuario
const copiaUsuario = ref(null);
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
const editar = ref(false);
const validarPassword = computed(() => {
    if(!usuario.value.password) return true;
    return usuario.value.password === verificarPassword.value;
});

const habilitarEdicion = () => {
    editar.value = true;
    copiaUsuario.value = { ...usuario.value };
}

const cancelarEdicion = () => {
    editar.value = false;
    usuario.value = { ...copiaUsuario.value };
    usuario.value.password = null;
    copiaUsuario.value = null;
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

        editar.value = false;
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
        .catch(err => console.log(err));

    perfilesStore.obtenerPerfiles()
        .then(console.log)
        .catch(console.log);

    clientesStore.obtenerClientes()
        .then(console.log)
        .catch(console.log);
})
</script>