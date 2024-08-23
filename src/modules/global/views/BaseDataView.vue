<template>
    <section>
        <header class="mb-5 flex justify-between items-center">
            <h2 class="uppercase text-xl font-bold">{{ tituloVista }}</h2>
            <section>
                <template v-if="editar">
                    <NButton @click="cancelarEdicion" type="warning">
                        Cancelar
                    </NButton>
                    <NButton @click="editarElemento" type="info" class="ml-1">
                        Guardar
                    </NButton>
                </template>
                <template v-else>
                    <NButton @click="habilitarEdicion" type="warning">
                        Editar
                    </NButton>
                </template>
            </section>
        </header>
        <NDivider/>
        <section class="w-full h-full">
            <section class="grid grid-cols-4 gap-5">
                <slot name="contenido" :editar="editar"></slot>
            </section>
            <footer class="pt-5">
                <slot name="graficos"></slot>
            </footer>
        </section>
    </section>
</template>

<script setup>
import { ref, toRefs, computed, inject } from 'vue'
import { NButton, NDivider } from 'naive-ui'

//Props
const props = defineProps({
    config: {
        type: Object,
        default: () => ({})
    }
});
const { config } = toRefs(props);
const { elemento } = inject('elemento');

//Info elemento
const tituloVista = computed(() => config.value?.tituloVista ?? 'titulo data vista');

//Editar elemento
const copiaElemento = ref(null);
const editar = ref(false);

const habilitarEdicion = () => {
    editar.value = true;
    copiaElemento.value = { ...elemento.value };
}

const cancelarEdicion = () => {
    editar.value = false;
    elemento.value = { ...copiaElemento.value };

    if(config.value.cancelarEdicion) config.value.cancelarEdicion();
    
    copiaElemento.value = null;
}

const editarElemento = () => {
    config.value.editarElemento();
    editar.value = false;
}
</script>