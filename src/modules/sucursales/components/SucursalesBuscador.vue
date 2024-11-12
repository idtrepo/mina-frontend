<template>
    <VModalBuscador>
        <article>
            <header>
                <h2 class="uppercase font-bold">buscar sucursales</h2>
            </header>
            <section class="pt-3">
                <article class="mb-4">
                    <p class="uppercase mb-1">nombre</p>
                    <NInput 
                        v-model:value="filtros.nombre"
                        clearable />
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">cliente</p>
                    <NSelect 
                        v-model:value="filtros.cliente"
                        clearable
                        :options="clientesOpciones"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">fecha</p>
                    <NDatePicker 
                        v-model:value="filtros.fecha"
                        clearable/>
                </article>
                <article>
                    <p class="uppercase mb-1">estatus</p>
                    <NSwitch v-model:value="filtros.estatus"/>
                </article>
            </section>
            <footer class="pt-5 flex justify-between items-center gap-5">
                <NButton v-if="filtroActivo" @click="reiniciar" type="warning" class="flex-grow">
                    <span class="uppercase font-bold">reiniciar</span>
                </NButton>
                <NButton @click="obtenerElementos" type="warning" class="flex-grow">
                    <span class="uppercase font-bold">buscar</span>
                </NButton>
            </footer>
        </article>
    </VModalBuscador>
</template>

<script setup>
import { inject } from 'vue'
import { defineAsyncComponent } from 'vue'
import { NButton, NInput, NSwitch, NDatePicker, NSelect } from 'naive-ui'
import useClientesStore from '@/modules/clientes/stores/useClientesStore';
import { storeToRefs } from 'pinia';

// dependencias 
const clientesStore = useClientesStore();
const { clientesOpciones } = storeToRefs(clientesStore);

// componentes
const VModalBuscador = defineAsyncComponent(() => import('@/modules/global/components/VModalBuscador.vue'));

const { 
    filtros,
    filtroActivo,
    obtenerElementos,
    reiniciarBusqueda,
} = inject('filtros');

const reiniciar = async() => {
    try{
        reiniciarBusqueda();
        const res = await obtenerElementos();
    }catch(err){
        console.log(err);
    }
}
</script>