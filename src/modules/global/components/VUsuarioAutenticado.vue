<template>
    <NPopover trigger="click">
        <template #trigger>
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
        <NButton type="error" class="w-full" @click="cerrarSesion">cerrar sesion</NButton>
    </NPopover>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useUsuarioStore from '@/modules/auth/stores/useUsuarioStore';
import { ICONOS } from '../utils/iconos';
import { NPopover, NButton } from 'naive-ui';
import { useRouter } from 'vue-router';
import useAuthStore from '@/modules/auth/stores/useAuthStore';
import {VISTAS} from '@/modules/global/utils/vistas';

// dependencias
const usuarioStore = useUsuarioStore();
const { usuarioNombreCompleto, usuarioPerfil } = storeToRefs(usuarioStore);
const router = useRouter();
const authStore = useAuthStore();

// cerrar sesion
const cerrarSesion = () => {
    authStore.cerrarSesion();
    router.push({ name: VISTAS.LOGIN });
}
</script>