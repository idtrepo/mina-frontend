<template>
    <article class="flex items-center">
        <div class="mr-1 flex justify-center items-center w-7 h-7 rounded-lg bg-amber-600">
            <i :class="icono" class="text-slate-200 text-xs"></i>
        </div>
        <h2 class="text-xl uppercase font-bold text-gray-600">{{ titulo }}</h2>
    </article>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import useTituloStore from '../stores/useTituloStore';

// dependencias
const tituloStore = useTituloStore();
const { titulo, icono } = storeToRefs(tituloStore);
</script>