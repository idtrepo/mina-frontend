<template>
    <article class="h-full flex items-center">
        <div class="w-7 h-7 md:w-8 md:h-8 mr-2 flex justify-center items-center bg-amber-700 rounded-xl">
            <i :class="icono" class=" text-xs text-slate-200"></i>
        </div>
        <h2 class="text-sm lg:text-xl font-bold uppercase">{{ titulo }}</h2>
    </article>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useTituloStore from '@/stores/useTituloStore';

const tituloStore = useTituloStore();
const { titulo, icono } = storeToRefs(tituloStore);
</script>
