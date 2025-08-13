<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">mac</p>
            <NInput v-model:value="filtros.mac"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">area</p>
            <NSelect 
                v-model:value="filtros.area"
                :options="areasOpciones"
                />
        </article>
        <article class="mb-4" v-if="usuarioPerfilId.value < 2">
            <p class="mb-1 uppercase">cliente</p>
            <NSelect 
                v-model:value="filtros.cliente"
                :options="clientesOpciones"
                />
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">sucursal</p>
            <NSelect 
                v-model:value="filtros.sucursal"
                :options="sucursalesOpciones"
                />
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
import useModulos from '../../composables/useModulos';
import useAreas from '@/modules/areas/composables/useAreas';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useClientes from '@/modules/clientes/composables/useClientes';
import useUsuarioStore from '@/stores/useUsuarioStore';
import { storeToRefs } from 'pinia';

//dependencias
const { filtros } = useModulos();
const { areasOpciones } = useAreas();
const { sucursalesOpciones } = useSucursales();
const { clientesOpciones } = useClientes();
const { usuarioPerfilId } = storeToRefs(useUsuarioStore());
</script>