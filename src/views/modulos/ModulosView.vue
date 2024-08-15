<template>
    <section>
        <header class="mb-5 flex justify-end items-center">
            <section>
                <NButton @click="mostrarModulosForm" type="info">
                    Nuevo
                </NButton>
            </section>
        </header>
        <section class="grid grid-cols-4 gap-5">
            <template v-if="hayModulos">
                <ModulosCarta 
                    v-for="modulo in modulos"
                    :modulo="modulo"/>
            </template>
            <template v-else>   
                <h2>SIN MODULOS</h2>
            </template>
        </section>
    </section>

    <ModulosForm/>
</template>

<script setup>
import { ref, provide } from 'vue'
import { defineAsyncComponent } from 'vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useModulosStore from '@/stores/useModulosStore';
import { NButton } from 'naive-ui'

//Componentes
const ModulosCarta = defineAsyncComponent(() => import('@/components/modulos/cartas/ModulosCarta.vue'));
const ModulosForm = defineAsyncComponent(() => import('@/components/modulos/forms/ModulosForm.vue'))

//Dependencias
const modulosStore = useModulosStore();
const { modulos, hayModulos } = storeToRefs(modulosStore);

const ver = ref(true);

//Listado de modulos
const obtenerModulos = async() => {
    try{
        await modulosStore.obtenerModulos();
    }catch(err){
        console.error(err);
    }
}

//Ver form modulo
const verModulosForm = ref(false);

const mostrarModulosForm = () => {
    verModulosForm.value = true;
}

provide('verModulosForm', { verModulosForm });

//Hooks
onMounted(() => {
    obtenerModulos();
})
</script>