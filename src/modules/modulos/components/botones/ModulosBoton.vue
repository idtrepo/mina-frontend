<template>
    <button @click="props.accion"
        class="p-3 flex-grow transition-all duration-200 bg-orange-800/85 hover:cursor-pointer hover:bg-orange-600">
        <span class="text-slate-100 uppercase font-bold">{{ titulo }}</span>
    </button>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
    titulo: { type: String, required: true },
    accion: { type: Function, required: true }
});

const { titulo } = toRefs(props);
</script>