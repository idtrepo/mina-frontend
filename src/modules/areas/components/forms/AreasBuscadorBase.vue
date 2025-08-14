<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput v-model:value="filtros.nombre"/>
        </article>
        <article class="mb-4" v-if="usuarioPerfilId.value < 3">
            <p class="mb-1 uppercase">sucursal</p>
            <NSelect
                :options="sucursalesOpciones"
                v-model:value="filtros.sucursal"/>
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
import { NDatePicker, NSwitch, NSelect, NInput } from 'naive-ui'
import useAreas from '../../composables/useAreas';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useUsuarioStore from '@/stores/useUsuarioStore';
import { storeToRefs } from 'pinia';

//dependencias
const { filtros } = useAreas();
const { sucursalesOpciones } = useSucursales();
const { usuarioPerfilId } = storeToRefs(useUsuarioStore());
console.log("looool",usuarioPerfilId.value);
</script>