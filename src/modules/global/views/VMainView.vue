<template>
    <div class="w-screen h-dvh text-slate-300 bg-cyan-950 lg:grid lg:grid-cols-12 lg:grid-rows-12">
        <template v-if="autenticado">
            <VMenu/>
            <header class="px-5 flex items-center justify-between bg-cyan-900/80 shadow-md lg:col-start-1 lg:col-end-13 lg:row-start-1 lg:row-end-2">
                <img :src="imgPromev" alt="promev" class="w-36 -ml-4">
                <VUsuarioAutenticado/>
            </header>
            <main class="px-5 lg:col-start-3 lg:col-end-13 lg:row-start-2 lg:row-end-13">
                <RouterView/>
            </main>
        </template>
        <template v-else>
            <main class="lg:row-span-full lg:col-span-full">
                <RouterView/>
            </main>
        </template>
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
import useAuthStore from '@/modules/auth/stores/useAuthStore';
import { storeToRefs } from 'pinia';
import imgPromev from '@/assets/img/Promev.png'

// dependencias
const authStore = useAuthStore();
const { autenticado } = storeToRefs(authStore);

// componentes
const VMenu = defineAsyncComponent(() => import('@/modules/global/components/menu/VMenu.vue'));
const VUsuarioAutenticado = defineAsyncComponent(() => import('@/modules/global/components/VUsuarioAutenticado.vue'));
const VVistaTitulo = defineAsyncComponent(() => import('@/modules/global/components/VVistaTitulo.vue'));
</script>