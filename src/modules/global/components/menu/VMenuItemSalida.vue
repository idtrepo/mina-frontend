<template>
    <article @click="cerrarSesion" class="inline py-6 lg:py-0 flex-grow text-center transition-all duration-200 hover:bg-cyan-700/50 rounded-tr-3xl lg:rounded-tr-none hover:cursor-pointer ">
        <i class="" :class="ICONOS.SALIDA"></i>
        <span class="hidden lg:inline">salir</span>
    </article>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { VISTAS } from '../../utils/vistas';
import { ICONOS } from '../../utils/iconos';
import useAuthStore from '@/modules/auth/stores/useAuthStore';

// dependencias
const router = useRouter();
const authStore = useAuthStore();

// cerrar sesion
const cerrarSesion = () => {
    authStore.cerrarSesion();
    router.push({ name: VISTAS.LOGIN });
}
</script>