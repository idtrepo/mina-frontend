<template>
    <article class="w-11/12 md:w-10/12 lg:w-1/3 px-7 py-5 bg-gray-800 rounded-lg shadow-gray-100/30 shadow-sm">
        <header class="mb-5">
            <h3 class="text-center font-bold uppercase text-gray-100">Inicio de sesion</h3>
        </header>
        <section class="mb-7">
            <article class="mb-3">
                <p class="mb-2 uppercase text-slate-300">correo</p>
                <NInput 
                    v-model:value="credenciales.correo" 
                    :placeholder="AUTH_PLACEHOLDER.CORREO" 
                    type="text"/>
            </article>
            <article>
                <p class="mb-2 uppercase text-slate-300">password</p>
                <NInput 
                    v-model:value="credenciales.password" 
                    :placeholder="AUTH_PLACEHOLDER.PASSWORD" 
                    type="password"/>
            </article>
        </section>
        <footer>
            <NButton 
                @click="iniciarSesion"
                type="info" 
                class="w-full">
                Iniciar sesion
            </NButton>
        </footer>
    </article>
</template>

<script setup>
import { ref } from 'vue'
import { NButton, NInput } from 'naive-ui'
import { useRouter } from 'vue-router';
import useAuthStore from '../../stores/useAuthStore';
import { AUTH_PLACEHOLDER } from '@/modules/global/utils/placeholder';
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { MENSAJE_ERROR, MENSAJE_EXITO } from '@/modules/global/utils/mensajes';
import { VISTAS } from '@/modules/global/utils/vistas';

// dependencias
const notificacion = useNotificacion();
const authStore = useAuthStore();
const router = useRouter();

// iniciar sesion
const credenciales = ref({
    correo: null,
    password: null
});

const reiniciarCredenciales = () => {
    for(let clave in credenciales.value){
        credenciales.value[clave] = null;
    }
}

const iniciarSesion = async() => {
    try{
        const res = await authStore.iniciarSesion({ credenciales });
        notificacion.nExito({ mensaje: MENSAJE_EXITO.SESION });
        router.push({ name: VISTAS.MODULOS });
    }catch(err){
        console.log(err);
        notificacion.nError({ mensaje: MENSAJE_ERROR.SESION });
    }finally{
        reiniciarCredenciales();
    }
}
</script>