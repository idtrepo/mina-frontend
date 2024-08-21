<template>
    <section class="flex justify-center items-center w-full h-full">
        <AuthFormLogin/>
    </section>
</template>

<script setup>
import { provide } from 'vue'
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import useAuthStore from '@/modules/auth/stores/useAuthStore';
import { VISTA } from '@/modules/global/utils/vistas';
import useNotificacion from '@/modules/global/composables/useNotificacion';

//Componentes
const AuthFormLogin = defineAsyncComponent(() => import('@/modules/auth/components/forms/AuthFormLogin.vue'));

//Dependencias
const notificacion = useNotificacion();
const router = useRouter();
const authStore = useAuthStore();

//Inicio de sesion
const credenciales = ref({
    correo: null,
    password: null
})

const credencialesCompletas = computed(() => (
    !!credenciales.value.correo
    && !!credenciales.value.password
));

const reiniciarCredenciales = () => {
    for(let clave in credenciales.value){
        credenciales.value[clave] = null;
    }
}

const iniciarSesion = async() => {
    if(!credencialesCompletas.value) return;

    try{
        const { mensaje } = await authStore.iniciarSesion({ credenciales });
        notificacion.nExito({ mensaje })
        router.push({ name: VISTA.MODULOS });
    }catch({ response: { data: { error:mensaje } } }){
        notificacion.nError({ mensaje });
    }finally{
        reiniciarCredenciales();
    }
}

//Inyeccion de dependencias
provide('auth-login', {
    credenciales,
    iniciarSesion
})
</script>
