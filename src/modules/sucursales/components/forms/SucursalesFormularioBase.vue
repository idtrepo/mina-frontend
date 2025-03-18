<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput 
                v-model:value="sucursal.nombre"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4 uppercase">
            <p>cliente</p>
            <NSelect 
                v-model:value="sucursal.idCliente"
                clearable
                :options="clientesOpciones"
                :disabled="edicionHabilitada"/>
        </article>
    </section>
</template>

<script setup>
import { NInput, NSelect } from 'naive-ui'
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useClientes from '@/modules/clientes/composables/useClientes';

//dependencias
const { clientesOpciones } = useClientes();
const { sucursal, edicionHabilitada } = useSucursales();
</script>