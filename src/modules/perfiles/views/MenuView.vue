<template>
    <section>
        <header>

        </header>
        <section class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <VListadoElemento 
                v-for="elemento in listado"
                :key="elemento.titulo"
                :="elemento"/>
        </section>
    </section>
</template>

<script setup>
import { toRefs } from 'vue'
import { defineAsyncComponent } from 'vue'

// propiedades
const props = defineProps({
    listado: { type: Array, required: true }
});
const { listado } = toRefs(props);

// componentes
const VListadoElemento = defineAsyncComponent(() => import('@/components/listado/VListadoElemento.vue'));
</script>
