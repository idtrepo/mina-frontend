<template>
    <article @click="irAVista" class="px-5 py-3 flex lg:flex-col lg:justify-center items-center lg:px-5 lg:py-6 bg-cyan-900 rounded-md shadow-sm duration-200 transition-all hover:cursor-pointer hover:bg-cyan-800">
        <div class="mr-2 flex justify-center items-center w-8 h-8 bg-gray-900 rounded-lg">
            <i :class="elementoIcono"></i>
        </div>
        <section class="lg:pt-3 flex flex-col lg:items-center text-xs">
            <h3 class="uppercase font-bold">{{ elementoPrimario }}</h3>
            <p v-if="elementoSecundario" class="text-slate-400">{{ elementoSecundario }}</p>
        </section>
    </article>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue'

const props = defineProps({
    elemento: {
        type: Object,
        default: () => ({})
    }
});

// dependencias
const router = useRouter();

// data elemento
const elementoId = computed(() => props.elemento?.id);
const elementoVista = computed(() => props.elemento?.vista);
const elementoIcono = computed(() => props.elemento?.icono ?? []);
const elementoPrimario = computed(() => props.elemento?.primario ?? '');
const elementoSecundario = computed(() => props.elemento?.secundario ?? '');

const irAVista = () => {
    if(!elementoVista.value || !elementoId.value) return;

    router.push({ name: elementoVista.value, params: { id: elementoId.value } });
}
</script>