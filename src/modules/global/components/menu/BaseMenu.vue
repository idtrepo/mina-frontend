<template>
    <article class="py-6 flex flex-col w-full h-full justify-between">
        <section class="flex flex-col justify-center items-center">
            <BaseMenuRuta
                v-for="ruta in rutas"
                :ruta="ruta"/>
        </section>
        <footer class="flex justify-center items-center">
            <BaseMenuRuta :ruta="rutaSalida"/>
        </footer>
    </article>
</template>

<script setup>
import { toRefs } from 'vue'
import { defineAsyncComponent } from 'vue' 

//Propiedades
const props = defineProps({
    rutas: {
        type: Array,
        required: true
    },
    rutaSalida: {
        type: Object,
        required: true
    }
})
const { rutas, rutaSalida } = toRefs(props);

//Componentes
const BaseMenuRuta = defineAsyncComponent(() => import('@/modules/global/components/menu/BaseMenuRuta.vue'))
</script>