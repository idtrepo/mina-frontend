<template>
    <article 
        @click="irAVista"
        class="p-2 px-3 flex items-center bg-slate-900 rounded-md transition-all duration-200 hover:cursor-pointer hover:bg-slate-800">
        <header class="w-9 h-9 flex justify-center items-center bg-teal-700 rounded-xl">
            <i :class="elementoIcono"></i>
        </header>
        <section class="flex-grow pl-3">
            <h3 class="uppercase font-bold text-xs text-slate-200">{{ elementoTitulo }}</h3>
            <p class="uppercase text-xs text-slate-400">{{ elementoSubtitulo }}</p>
        </section>
        <footer v-if="elementoSecundario" class="px-2 self-start bg-sky-950 rounded-sm">
            <p class="text-slate-400 text-xs uppercase">{{ elementoSecundario }}</p>
        </footer>
    </article>
</template>

<script setup>
import { toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ICONOS } from '@/modules/global/utils/iconos';

// props
const props = defineProps({
    elemento: {
        type: Object,
        default: null
    }
});

const { elemento } = toRefs(props);

//dependencias
const router = useRouter();

// data elemento
const elementoId = computed(() => elemento.value?.id);
const elementoVista = computed(() => elemento.value?.vista);
const elementoTitulo = computed(() => elemento.value?.titulo ?? '');
const elementoSecundario = computed(() => elemento.value?.secundario);
const elementoSubtitulo = computed(() => elemento.value?.subTitulo ?? '');
const elementoIcono = computed(() => elemento.value?.icono ?? ICONOS.EQUIS);

// cambiar vista
const irAVista = () => {    
    if(!elementoId.value) return;

    router.push({ name: elementoVista.value, params: {
        id: elementoId.value
    } });
}
</script>