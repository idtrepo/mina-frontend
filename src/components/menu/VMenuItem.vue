<template>
    <article
        @click="irAVista"
        :key="titulo"
        class="h-full lg:h-auto w-full flex flex-col items-center justify-center text-xs flex-grow cursor-pointer transition-all duration-200 hover:bg-slate-800 border-2 border-gray-900/0 hover:border-gray-600 rounded-md
        ">
        <i :class="icono"></i>
        <p class="hidden lg:block">{{ titulo }}</p>
    </article>
</template>

<script setup>
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'

//propiedades
const props = defineProps({
    titulo: { type: String },
    vista: { type: String },
    icono: { type: Array },
});
const { icono, titulo, vista } = toRefs(props);

//dependencias
const router = useRouter();

//vistas
const irAVista = () => {
    router.push({ name: vista.value });
}
</script>