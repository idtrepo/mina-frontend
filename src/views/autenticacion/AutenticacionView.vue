<template>
    <section class="flex justify-center items-center w-full h-full">
        <AutenticacionFormLogin/>
    </section>
</template>

<script setup>
import { provide } from 'vue'
import { ref, computed, defineAsyncComponent } from 'vue'
import { NInput, NButton } from 'naive-ui'
import { PLACEHOLDER_AUTH_CORREO, PLACEHOLDER_AUTH_PASSWORD } from '@/utils/mensajes';
import useAuthStore from '@/stores/useAuthStore';


const AutenticacionFormLogin = defineAsyncComponent(() => import('@/components/autenticacion/forms/AutenticacionFormLogin.vue'));


const authStore = useAuthStore();


const credenciales = ref({
    correo: 'admin@mail.com',
    password: 'admin'
})

const reiniciarCredenciales = () => {
    for(let clave in credenciales.value){
        credenciales.value[clave] = null;
    }
}

const iniciarSesion = async() => {
    try{
        const res = await authStore.iniciarSesion({ credenciales });
        console.log(res);
    }catch(err){
        console.error(err);
    }finally{
        reiniciarCredenciales();
    }
}

provide('auth-login', {
    credenciales,
    iniciarSesion
})
</script>
