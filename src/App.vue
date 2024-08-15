<template>
  <main class="grid grid-cols-12 grid-rows-12 w-full min-h-screen bg-gray-900">
    <template v-if="autenticado">
      <section class="py-5 pr-5 col-start-2 col-end-13 row-start-1 row-end-13 w-full h-full">
        <div class="grid grid-cols-12 grid-rows-12 w-full h-full">
          <header class="px-5 flex items-center col-start-1 col-end-13 row-start-1 row-end-2 w-full h-full bg-slate-400">
            <h2 class="text-gray-900 uppercase font-bold text-2xl">modulos</h2>
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
</template>

<script setup>
import { onMounted, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import useAuthStore from './stores/useAuthStore';
import { VISTA_LOGIN } from './utils/vistas';
import { rutas, rutaSalida } from './router/routes/rutas';

//Componentes
const BaseMenu = defineAsyncComponent(() => import('@/components/base/BaseMenu.vue'))

//Dependencias
const router = useRouter();
const authStore = useAuthStore();
const { autenticado } = storeToRefs(authStore);

const verificarSesion = async() => {
  try{
    const res = await authStore.verificarSesion();
  }catch(err){
    router.push({ name: VISTA_LOGIN });
  }
}

onMounted(() => { verificarSesion() });
</script>