<template>
        <NModal v-model:show="verModalAgregar">
                <NCard :style="cardStyle">
            <slot name="formulario-agregar"></slot>
        </NCard>
    </NModal>
    <NModal v-model:show="verModalBuscar">
                <NCard :style="cardStyle">
            <slot name="formulario-buscar"></slot>
        </NCard>
    </NModal>
</template>
<script setup>
import { NModal, NCard } from 'naive-ui'
import { inject, ref, onMounted, onBeforeUnmount } from 'vue'

const verModalAgregar = inject('verModalAgregar')
const verModalBuscar = inject('verModalBuscar')

const calcularAncho = () => (window.innerWidth >= 768 ? '50%' : '75%');
const cardStyle = ref({ width: calcularAncho(), margin: '0 auto' });

const handleResize = () => {
    cardStyle.value = { ...cardStyle.value, width: calcularAncho() };
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});
</script>