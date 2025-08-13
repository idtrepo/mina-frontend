<template>
    <article>
        <section>
            <slot name="contenido"></slot>
        </section>
        <footer class="flex">
            <NButton @click="props.accionFormulario" type="info" class="w-full flex-grow">
                <span class="uppercase font-bold">{{ tituloBoton }}</span>
            </NButton>
        </footer>
    </article>
</template>

<script setup>
import { toRefs } from 'vue'
import { NButton } from 'naive-ui'

const props = defineProps({
    tituloBoton: { type: String, default: 'titulo boton' },
    accionFormulario: { type: Function, required: true }
});
const { tituloBoton } = toRefs(props);
</script>