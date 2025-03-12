<template>
    <main class="w-screen h-dvh grid grid-cols-12 grid-rows-12 text-slate-300 bg-slate-950">
        <template v-if="autenticado">
            <header class="col-span-full lg:col-start-2 lg:col-end-13 row-span-1">
            </header>
            <section class="col-span-full lg:col-start-2 lg:col-end-13 row-span-10 lg:row-span-11">
                <RouterView/>
            </section>
            <aside class="col-span-full lg:col-start-1 lg:col-end-2 row-span-1 lg:row-span-full">
                <VMenu/>
            </aside>
        </template>
        <template v-else>
            <section class="col-span-full row-span-full">
                <RouterView/>
            </section>
        </template>
    </main>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia';
import useAuthStore from '@/modules/auth/stores/useAuthStore';

//dependencias
const authStore = useAuthStore();
const { autenticado } = storeToRefs(authStore);

//componentes
const VMenu = defineAsyncComponent(() => import('@/modules/global/components/menu/VMenu.vue'));
</script>