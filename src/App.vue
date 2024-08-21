<template>
  <NNotificationProvider>
    <main class="grid grid-cols-12 grid-rows-12 w-full min-h-screen bg-gray-900">
      <template v-if="autenticado">
        <section class="py-5 pr-5 col-start-2 col-end-13 row-start-1 row-end-13 w-full h-full">
          <div class="grid grid-cols-12 grid-rows-12 w-full h-full">
            <header class="px-5 flex items-center col-start-1 col-end-13 row-start-1 row-end-2 w-full h-full bg-slate-400">
              <h2 class="text-gray-900 uppercase font-bold text-2xl">{{ titulo }}</h2>
            </header>
            <section class="p-5 col-start-1 col-end-13 row-start-2 row-end-13 w-full h-full bg-slate-100">
              <RouterView/>
            </section>
          </div>
        </section>
        <aside class="col-start-1 col-end-2 row-start-1 row-end-13 w-full h-full">
          <BaseMenu
            :rutas="rutas"
            :ruta-salida="rutaSalida"/>
        </aside>
      </template>
      <template v-else>
        <section class="col-start-1 col-end-13 row-start-1 row-end-13 w-full h-full">
          <RouterView/>
        </section>
      </template>
    </main>
  </NNotificationProvider>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { onMounted, defineAsyncComponent } from 'vue'
import { NNotificationProvider } from 'naive-ui'
import useAuthStore from '@/modules/auth/stores/useAuthStore';
import useTituloStore from '@/modules/global/stores/useTituloStore';
import { VISTA } from '@/modules/global/utils/vistas';
import { rutas, rutaSalida } from '@/router/routes/rutas';

//Componentes
const BaseMenu = defineAsyncComponent(() => import('@/modules/global/components/menu/BaseMenu.vue'))

//Dependencias
const router = useRouter();
const authStore = useAuthStore();
const tituloStore = useTituloStore()
const { titulo } = storeToRefs(tituloStore);
const { autenticado } = storeToRefs(authStore);

//Hooks

onMounted(() => {
  authStore.verificarSesion();
});
</script>