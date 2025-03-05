<template>
    <article>
        <section>
            <slot name="contenido"></slot>
        </section>
        <footer class="flex items-center gap-3">
            <NButton @click="props.accionFormulario" type="info" class="flex-grow">
                <span class="uppercase font-bold">{{ tituloBoton }}</span>
            </NButton>
            <NButton v-if="filtrosActivos" @click="reiniciarBusqueda" type="warning" class="flex-grow">
                <span class="uppercase font-bold">reinicar</span>
            </NButton>
        </footer>
    </article>
</template>

<script setup>
import { toRefs } from 'vue'
import { NButton } from 'naive-ui'
import { storeToRefs } from 'pinia';
import useFiltrosStore from '@/stores/useFiltrosStore';

//dependencias
const filtrosStore = useFiltrosStore();
const { filtrosActivos } = storeToRefs(filtrosStore);

const props = defineProps({
    tituloBoton: { type: String, default: 'titulo boton' },
    accionFormulario: { type: Function, required: true }
});
const { tituloBoton } = toRefs(props);

const reiniciarBusqueda = async() => {
    filtrosStore.reiniciarFiltros();
    await props.accionFormulario();
}
</script>