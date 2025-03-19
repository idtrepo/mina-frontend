<template>
    <main class="grid grid-cols-12 grid-rows-12 w-full h-dvh text-slate-300 bg-slate-950">
        <template v-if="autenticado">
            <header
                class="px-5 flex justify-between items-center col-span-full lg:col-start-2 lg:col-end-13 row-span-1 bg-slate-900/50">
                <img :src="imgPromev" alt="promev" class="w-36 -ml-4">
                <VUsuarioAutenticado />
            </header>
            <section class="px-5 pt-8 col-span-full lg:col-start-2 lg:col-end-13 row-span-10 lg:row-span-11">
                <div class="w-full h-full overflow-y-auto">
                    <RouterView />
                </div>
            </section>
            <aside class="col-span-full lg:col-start-1 lg:col-end-2 row-span-1 lg:row-span-full">
                <VMenuList />
            </aside>
        </template>
        <template v-else>
            <section class="col-span-full row-span-full">
                <RouterView />
            </section>
        </template>
    </main>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia';
import useAutenticacion from '@/modules/auth/composables/useAutenticacion';
import imgPromev from '@/assets/img/Promev.png'


//dependencias
const { autenticado } = useAutenticacion();

//componentes
const VMenuList = defineAsyncComponent(() => import('@/components/menu/VMenuList.vue'));
const VUsuarioAutenticado = defineAsyncComponent(() => import('@/modules/global/components/VUsuarioAutenticado.vue'));
</script>