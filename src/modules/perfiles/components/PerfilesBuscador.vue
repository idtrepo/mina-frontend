<template>
    <VModalBuscador>
        <article>
            <header>
                <h2 class="uppercase font-bold">buscar perfiles</h2>
            </header>
            <section class="pt-3">
                <article class="mb-4">
                    <p class="uppercase mb-1">nombre</p>
                    <NInput clearable v-model:value="filtros.nombre"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">fecha</p>
                    <NDatePicker clearable v-model:value="filtros.fecha"/>
                </article>
                <article>
                    <p class="uppercase mb-1">estatus</p>
                    <NSwitch v-model:value="filtros.estatus"/>
                </article>
            </section>
            <footer class="pt-5 flex justify-between items-center gap-5">
                <NButton v-if="filtroActivo" :disabled="cargando" @click="reiniciar" type="warning" class="flex-grow">
                    <span class="uppercase font-bold">reiniciar</span>
                </NButton>
                <NButton :disabled="cargando" @click="obtenerElementos" type="warning" class="flex-grow">
                    <span class="uppercase font-bold">buscar</span>
                </NButton>
            </footer>
        </article>
    </VModalBuscador>
</template>

<script setup>
import { inject } from 'vue'
import { defineAsyncComponent } from 'vue'
import { NButton, NInput, NSwitch, NDatePicker } from 'naive-ui'
import useRequest from '@/modules/global/composables/request/useRequest';

// componentes
const { cargando } = useRequest();
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