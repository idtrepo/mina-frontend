<template>
    <RouterLink :to="{ name: ruta }" class="py-6 flex-grow text-center transition-all duration-200 hover:bg-cyan-700/50 first-of-type:rounded-tl-3xl lg:first-of-type:rounded-tl-none lg:flex-grow-0 lg:block lg:w-full lg:text-left lg:border-r-4 lg:hover:border-orange-400 lg:border-orange-400/0 lg:pl-3">
        <i class="lg:w-5 lg:mr-2" :class="icono"></i>
        <span class="hidden lg:inline lg:uppercase">{{ titulo }}</span>
    </RouterLink>
</template>

<script setup>
import { computed } from 'vue'


const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

// data
const titulo = computed(() => props.item?.titulo ?? '');
const icono = computed(() => props.item?.icono ?? []);
const ruta = computed(() => props.item?.ruta ?? '');
</script>