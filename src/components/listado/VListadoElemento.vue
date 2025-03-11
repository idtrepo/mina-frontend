<template>
    <template v-if="props.accion">
        <article @click="props.accion"
            class="flex items-center justify-between p-3 bg-slate-900 rounded-md duration-200 transition-all hover:cursor-pointer hover:bg-slate-700">
            <header class="flex items-center">
                <div class="mr-3 flex items-center justify-center w-8 h-8 bg-emerald-700 rounded-lg">
                    <i :class="icono"></i>
                </div>
                <section>
                    <h3 class="uppercase font-bold">{{ titulo }}</h3>
                    <p v-if="subtitulo" class="text-slate-400 uppercase text-xs">{{ subtitulo }}</p>
                </section>
            </header>
            <footer v-if="extra" class="px-2 self-start bg-slate-600/60 rounded-sm">
                <p>{{ extra }}</p>
            </footer>
        </article>
    </template>
    <template v-else>
        <article
            class="flex items-center justify-between p-3 bg-slate-900 rounded-md duration-200 transition-all hover:cursor-pointer hover:bg-slate-700">
            <header class="flex items-center">
                <div class="mr-3 flex items-center justify-center w-8 h-8 bg-emerald-700 rounded-lg">
                    <i :class="icono"></i>
                </div>
                <section>
                    <h3 class="uppercase font-bold">{{ titulo }}</h3>
                    <p v-if="subtitulo" class="text-slate-400 uppercase text-xs">{{ subtitulo }}</p>
                </section>
            </header>
            <footer v-if="extra" class="px-2 self-start bg-slate-600/60 rounded-sm">
                <p>{{ extra }}</p>
            </footer>
        </article>
    </template>
</template>

<script setup>
import { toRefs } from 'vue'

// propiedades
const props = defineProps({
    // id: { type: [Number, String, null], default: null },
    icono: { type: Array, required: true },
    titulo: { type: String, required: true },
    subtitulo: { type: String, default: '' },
    extra: { type: String, default: '' },
    accion: { type: [Function, null], default: null }
});
const { icono, titulo, subtitulo, extra } = toRefs(props);
</script>