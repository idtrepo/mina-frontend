<template>
    <section class="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
        <article class="mb-4">
                            <p class="uppercase mb-1">nombre</p>
                            <NInput
                                v-model:value="sucursal.nombre"
                                :disabled="edicionHabilitada"/>
                        </article>
                        <article class="mb-4">
                            <p class="uppercase mb-1">cliente</p>
                            <NSelect
                                v-model:value="sucursal.idCliente"
                                :options="clientesOpciones"
                                :disabled="edicionHabilitada"/>
        </article>
    </section>

</template>

<script setup>
import {NInput, NSelect} from 'naive-ui';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useClientes from '@/modules/clientes/composables/useClientes';

const {sucursal, edicionHabilitada} = useSucursales();
const {clientesOpciones} = useClientes();
</script>