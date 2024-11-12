<template>
    <article class="flex items-center transition-all duration-200 text-xs border-l-4 border-l-amber-600/0 hover:cursor-pointer">
        <header class="bg-slate-900 mr-2 w-7 h-7 flex justify-center items-center rounded-full">
            <i :class="ICONOS.USUARIOS" class=""></i>
        </header>
        <section>
            <h3 class="uppercase font-bold">{{ usuarioNombreCompleto }}</h3>
            <p class="uppercase">{{ usuarioPerfil }}</p>
        </section>
    </article>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useAuthStore from '@/modules/auth/stores/useAuthStore';
import { ICONOS } from '../utils/iconos';

// dependencias
const authStore = useAuthStore();
const { usuarioNombreCompleto, usuarioPerfil } = storeToRefs(authStore);
</script>