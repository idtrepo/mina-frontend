<template>
    <template v-if="hayElementos">
        <section class="w-full h-full grid grid-cols-1 lg:grid-cols-4 gap-4">
            <slot :listado="elementos"></slot>
        </section>
    </template>
    <template v-else>
        <section class="p-10 w-full flex justify-center">
            <article class="flex items-center text-2xl">
                <i :class="ICONOS.EQUIS" class="text-xl mr-1"></i>
                <p class="uppercase font-bold">no hay elementos</p>
            </article>
        </section>
    </template>
</template>

<script setup>
import { ICONOS } from '@/modules/global/utils/iconos';
import { toRefs, computed } from 'vue'

// props
const props = defineProps({
    elementos: {
        type: Array,
        default: [],
    }
});

const { elementos } = toRefs(props);

const hayElementos = computed(() => elementos.value.length > 0);
</script>