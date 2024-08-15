<template>
    <section class="flex justify-center items-center w-full h-full">
        <AutenticacionFormLogin/>
    </section>
</template>

<script setup>
import { provide } from 'vue'
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import useAuthStore from '@/stores/useAuthStore';
import { VISTA_MODULOS } from '@/utils/vistas';

//Componentes
const AutenticacionFormLogin = defineAsyncComponent(() => import('@/components/autenticacion/forms/AutenticacionFormLogin.vue'));

//Dependencias
const router = useRouter();
const authStore = useAuthStore();

//Inicio de sesion
const credenciales = ref({
    correo: 'admin@mail.com',
    password: 'admin'
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
        const res = await authStore.iniciarSesion({ credenciales });
        router.push({ name: VISTA_MODULOS });
    }catch(err){
        console.error(err);
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
