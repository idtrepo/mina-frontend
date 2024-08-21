<template>
    <NModal v-model:show="verFormulario">
        <NCard class="w-1/3"> 
            <header class="mb-5">
                <h3 class="uppercase font-bold text-lg">
                    {{ formTitulo }}
                </h3>
            </header>
            <section class="mb-5">
                <slot name="contenido"></slot>
            </section>
            <footer>
                <NButton
                    @click="formFuncCrear" 
                    class="w-full" 
                    type="info">
                    {{ formTituloBoton }}
                </NButton>
            </footer>
        </NCard>
    </NModal>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { inject } from 'vue'
import { NModal, NCard, NButton } from 'naive-ui'


//Props
const props = defineProps({
    config: {
        type: Object,
        default: () => {}
    }
});
const { config } = toRefs(props);

const formFuncCrear = computed(() => config.value?.formFuncCrear ?? funcionDefault);
const formTituloBoton = computed(() => config.value?.formTituloBoton ?? 'Crear');
const formTitulo = computed(() => config.value?.formTitulo ?? 'Titulo formulario');

const funcionDefault = () => {
    console.log('Funcion default')
}

//Inyeccion de dependencias
const { verFormulario } = inject('verFormulario')
</script>
