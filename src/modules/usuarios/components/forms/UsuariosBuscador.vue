<template>
    <VModalBuscador>
        <article>
            <header>
                <h2 class="uppercase font-bold">buscar perfiles</h2>
            </header>
            <section class="pt-3 grid grid-cols-2 gap-x-5">
                <article class="mb-4 col-span-2">
                    <p class="uppercase mb-1">nombre</p>
                    <NInput clearable v-model:value="filtros.nombre"/>
                </article>
                <article class="mb-4 col-span-2">
                    <p class="uppercase mb-1">apellido</p>
                    <NInput clearable v-model:value="filtros.apellido"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">correo</p>
                    <NInput clearable v-model:value="filtros.correo"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">fecha</p>
                    <NDatePicker clearable v-model:value="filtros.fecha"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">perfil</p>
                    <NSelect clearable v-model:value="filtros.perfil" :options="perfilesOpciones"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">cliente</p>
                    <NSelect clearable v-model:value="filtros.cliente" :options="clientesOpciones"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">sucursal</p>
                    <NSelect clearable v-model:value="filtros.sucursal" :options="sucursalesOpciones"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">area</p>
                    <NSelect clearable v-model:value="filtros.area" :options="areasOpciones"/>
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
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue'
import { NButton, NInput, NSwitch, NDatePicker, NSelect } from 'naive-ui'
import usePerfilesStore from '@/modules/perfiles/stores/usePerfilesStore';
import useClientesStore from '@/modules/clientes/stores/useClientesStore';
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';
import useAreasStore from '@/modules/areas/stores/useAreasStore';

// dependencias 
const perfilesStore = usePerfilesStore();
const clientesStore = useClientesStore();
const sucursalesStore = useSucursalesStore();
const areasStore = useAreasStore();
const { perfilesOpciones } = storeToRefs(perfilesStore);
const { clientesOpciones } = storeToRefs(clientesStore);
const { sucursalesOpciones } = storeToRefs(sucursalesStore);
const { areasOpciones } = storeToRefs(areasStore);

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

        console.log(res);
    }catch(err){
        console.log(err);
    }
}
</script>