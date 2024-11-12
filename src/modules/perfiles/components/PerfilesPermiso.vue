<template>
    <article>
        <header @click="mostrarPermisos" class="w-full relative left-0 z-10 bg-sky-900 py-3 pl-2 ">
            <h3 class="uppercase font-bold hover:cursor-pointer">areas</h3>
        </header>
        <section :class="estilosPermisos" class="w-full relative left-0 transition-all duration-150 ease-in-out pt-2 flex items-center gap-5 justify-between">
            <button class="p-2 flex-grow bg-slate-500 uppercase font-bold">ver</button>
            <button class="p-2 flex-grow bg-slate-500 uppercase font-bold">crear</button>
            <button class="p-2 flex-grow bg-slate-500 uppercase font-bold">editar</button>
            <button class="p-2 flex-grow bg-slate-500 uppercase font-bold">eliminar</button>
        </section>
    </article>
</template>

<script setup>
import { ref, computed } from 'vue'

const verPermisos = ref(false);
const estilosPermisos = computed(() => ({
    '-top-12': !verPermisos.value,
    'opacity-0': !verPermisos.value,
    '-top-1': verPermisos.value,
    'opacity-100': verPermisos.value,
}))

const mostrarPermisos = () => {
    verPermisos.value = !verPermisos.value;
}
</script>