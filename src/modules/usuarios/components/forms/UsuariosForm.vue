<template>
    <BaseForm :config="config">
        <template #contenido>
            <article class="mb-3">
                <p class="mb-1 uppercase">nombre</p>
                <NInput 
                    v-model:value="dataUsuario.nombre"
                    :placeholder="USUARIOS_PLACEHOLDER.NOMBRE"/>
            </article>
            <article class="mb-3">
                <p class="mb-1 uppercase">apellido</p>
                <NInput 
                    v-model:value="dataUsuario.apellido"
                    :placeholder="USUARIOS_PLACEHOLDER.APELLIDO"/>
            </article>
            <article class="mb-3">
                <p class="mb-1 uppercase">correo</p>
                <NInput 
                    v-model:value="dataUsuario.correo"
                    :placeholder="USUARIOS_PLACEHOLDER.CORREO"/>
            </article>
            <article class="mb-3">
                <p class="mb-1 uppercase">password</p>
                <NInput 
                    v-model:value="dataUsuario.password"
                    :placeholder="USUARIOS_PLACEHOLDER.PASSWORD" 
                    type="password"/>
            </article>
            <article class="mb-3">
                <p class="mb-1 uppercase">verificar password</p>
                <NInput 
                    v-model:value="verificarPassword"
                    :placeholder="USUARIOS_PLACEHOLDER.PASSWORD_VERIFICACION" 
                    type="password"/>
            </article>
            <article class="mb-3">
                <p class="mb-1 uppercase">perfil</p>
                <NSelect 
                    :options="opcionesPerfiles"
                    v-model:value="dataUsuario.idPerfil"
                    :placeholder="USUARIOS_PLACEHOLDER.PERFIL"/>
            </article>
            <article class="mb-3">
                <p class="mb-1 uppercase">cliente</p>
                <NSelect 
                    :options="opcionesPerfiles"
                    v-model:value="dataUsuario.idPerfil"
                    :placeholder="USUARIOS_PLACEHOLDER.PERFIL"/>
            </article>
        </template>
    </BaseForm>
</template>

<script setup>
import { ref, toValue, onMounted, computed } from 'vue';
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia'
import { NInput, NSelect } from 'naive-ui'
import useUsuariosStore from '../../stores/useUsuariosStore';
import { evaluarUsuario } from '../../schemas/usuariosSchema';
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { MENSAJE_ERROR, MENSAJE_EXITO } from '@/modules/global/utils/mensajes';
import usePerfilesStore from '@/modules/perfiles/stores/usePerfilesStore';
import { USUARIOS_PLACEHOLDER } from '@/modules/global/utils/placeholder';
import useClientesStore from '@/modules/clientes/stores/useClientesStore';

//Componentes
const BaseForm = defineAsyncComponent(() => import('@/modules/global/components/forms/BaseForm.vue'))

//Dependencias
const clientesStore = useClientesStore();
const perfilesStore = usePerfilesStore();
const usuariosStore = useUsuariosStore();
const notificacion = useNotificacion();
const { opcionesPerfiles } = storeToRefs(perfilesStore);
const { opcionesClientes } = storeToRefs(clientesStore);

//Crear usuario
const verificarPassword = ref(null);
const dataUsuario = ref({
    nombre: null,
    apellido: null,
    correo: null,
    password: null,
    idPerfil: null,
});
const validarPassword = computed(() => {
    if(!dataUsuario.value.password) return false;
    return dataUsuario.value.password === verificarPassword.value
});

const crearUsuario = async() => {
    const { data, error } = await evaluarUsuario(toValue(dataUsuario));

    if(error){
        notificacion.nError({ mensaje: MENSAJE_ERROR.VALIDACION });
        return;
    }

    console.log(validarPassword.value);

    if(!validarPassword.value){
        return notificacion.nError({ mensaje: MENSAJE_ERROR.PASSWORD })
    }

    try{
        const { mensaje } = await usuariosStore.crearUsuario({ data });

        notificacion.nExito({ mensaje });
        reiniciarDataUsuario();
        await usuariosStore.obtenerUsuarios();
    }catch({ response: { data: { error:mensaje } } }){
        notificacion.nError({ mensaje });
    }   
}

const reiniciarDataUsuario = () => {
    for(let clave in dataUsuario.value){
        dataUsuario.value[clave] = null
    }
    verificarPassword.value = null;
}


//Config
const config = ref({
    funcionCrear: crearUsuario,
    tituloForm: 'Nuevo usuario'
})

//Hooks
onMounted(async() => {
    perfilesStore.obtenerPerfiles()
        .then(console.log)
        .catch(console.log);
});
</script>