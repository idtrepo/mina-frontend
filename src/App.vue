<template>
  <main class="grid grid-cols-12 grid-rows-12 w-full min-h-screen bg-gray-950">
    <template v-if="autenticado">
      <section class="p-5 col-start-2 col-end-13 row-start-1 row-end-13 w-full h-full">
        <div class="grid grid-cols-12 grid-rows-12 w-full h-full">
          <header class="col-start-1 col-end-13 row-start-1 row-end-3 w-full h-full bg-slate-400">
            <h2>titulo</h2>
          </header>
          <section class="col-start-1 col-end-13 row-start-3 row-end-13 w-full h-full bg-slate-100">
            <RouterView/>
          </section>
        </div>
      </section>
      <aside class="col-start-1 col-end-2 row-start-1 row-end-13 w-full h-full bg-slate-50">
        <p>que tranza</p>
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
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import useAuthStore from './stores/useAuthStore';
import { VISTA_LOGIN } from './utils/vistas';

const router = useRouter();
const authStore = useAuthStore();
const { autenticado } = storeToRefs(authStore);

const verificarSesion = async() => {
  try{
    const res = await authStore.verificarSesion();
    console.log(res);
  }catch(err){
    console.error(err);
    console.log('No hay credenciales');
    router.push({ name: VISTA_LOGIN });
  }
}

onMounted(() => {
  verificarSesion();
})
</script>