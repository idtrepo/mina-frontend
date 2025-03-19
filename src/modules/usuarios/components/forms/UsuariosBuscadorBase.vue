<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">correo</p>
            <NInput v-model:value="filtros.correo"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput v-model:value="filtros.nombre"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">apellido</p>
            <NInput v-model:value="filtros.apellido"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">perfil</p>
            <NSelect
                :options="perfilesOpciones"
                v-model:value="filtros.perfil"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">cliente</p>
            <NSelect
                :options="clientesOpciones"
                v-model:value="filtros.cliente"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">sucursal</p>
            <NSelect
                :options="sucursalesOpciones"
                v-model:value="filtros.sucursal"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">area</p>
            <NSelect
                :options="areasOpciones"
                v-model:value="filtros.area"/>
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
import useUsuarios from '../../composables/useUsuarios';
import useAreas from '@/modules/areas/composables/useAreas';
import useClientes from '@/modules/clientes/composables/useClientes';
import usePerfiles from '@/modules/perfiles/composables/usePerfiles';
import useSucursales from '@/modules/sucursales/composables/useSucursales';

//dependencias
const { filtros } = useUsuarios();
const { areasOpciones } = useAreas();
const { clientesOpciones } = useClientes();
const { perfilesOpciones } = usePerfiles();
const { sucursalesOpciones } = useSucursales();
</script>