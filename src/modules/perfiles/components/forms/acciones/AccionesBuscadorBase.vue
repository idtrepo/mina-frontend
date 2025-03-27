<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput v-model:value="filtros.nombre"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">categoria</p>
            <NSelect 
                v-model:value="filtros.categoria"
                :options="categoriasOpciones"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">operacion</p>
            <NSelect 
                v-model:value="filtros.operacion"
                :options="operacionesOpciones"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">fecha</p>
            <NDatePicker
                v-model:value="filtros.fecha"
                clearable/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">estatus</p>
            <NSwitch
                v-model:value="filtros.estatus"/>
        </article>
    </section>
</template>

<script setup>
import { NDatePicker, NSwitch, NSelect, NInput } from 'naive-ui';
import {onMounted} from 'vue';
import useAcciones from '../../../composables/useAcciones';
import useCategorias from '@/modules/perfiles/composables/useCategorias';
import useOperaciones from '@/modules/perfiles/composables/useOperaciones';

// dependencias
const { filtros } = useAcciones();
const { categoriasOpciones, obtenerCategorias } = useCategorias();
const { operacionesOpciones, obtenerOperaciones } = useOperaciones();

// ciclo de vida
onMounted(() => {
    obtenerCategorias({params:{listado:true}});
    obtenerOperaciones({params:{listado:true}});
})
</script>