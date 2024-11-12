<template>
    <VModalBuscador>
        <article>
            <header>
                <h2 class="uppercase font-bold">buscar modulo</h2>
            </header>
            <section class="pt-3">
                <article class="mb-4">
                    <p class="uppercase mb-1">mac</p>
                    <NInput clearable v-model:value="filtros.mac"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">cliente</p>
                    <NSelect 
                        v-model:value="filtros.cliente"
                        :options="clientesOpciones"
                        clearable/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">sucursal</p>
                    <NSelect 
                        v-model:value="filtros.sucursal"
                        :options="sucursalesOpciones"
                        clearable/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">area</p>
                    <NSelect 
                        v-model:value="filtros.area"
                        :options="areasOpciones"
                        clearable/>
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
import { storeToRefs } from 'pinia'
import { NButton, NInput, NSwitch, NDatePicker, NSelect } from 'naive-ui'
import useRequest from '@/modules/global/composables/request/useRequest';
import useClientesStore from '@/modules/clientes/stores/useClientesStore';
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';
import useAreasStore from '@/modules/areas/stores/useAreasStore';

// dependencias
const areasStore = useAreasStore();
const clientesStore = useClientesStore();
const sucursalesStore = useSucursalesStore();
const { areasOpciones } = storeToRefs(areasStore);
const { clientesOpciones } = storeToRefs(clientesStore);
const { sucursalesOpciones } = storeToRefs(sucursalesStore);

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