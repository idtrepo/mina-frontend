<template>
    <section class="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
        <article class="mb-4">
                            <p class="uppercase mb-1">MAC</p>
                            <NInput
                                v-model:value="modulo.mac"
                                :disabled="edicionHabilitada"/>
                        </article>
                        <article class="mb-4">
                            <p class="uppercase mb-1">cliente</p>
                            <NSelect
                                v-model:value="modulo.idCliente"
                                :options="clientesOpciones"
                                :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4">
            <p class="uppercase mb-1">area</p>
            <NSelect
                v-model:value="modulo.idArea"
                :options="areasOpciones"
                :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4">
            <p class="uppercase mb-1">sucursal</p>
            <NSelect
                v-model:value="modulo.idSucursal"
                :options="sucursalesOpciones"
                :disabled="edicionHabilitada"/>
        </article>
    </section>
</template>

<script setup>
import {NInput, NSelect} from 'naive-ui';
import useModulos from '@/modules/modulos/composables/useModulos';
import useAreas from '@/modules/areas/composables/useAreas';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useClientes from '@/modules/clientes/composables/useClientes';
import useEdicionStore from '@/stores/useEdicionStore';

const {modulo, edicionHabilitada} = useModulos();
const {areasOpciones} = useAreas();
const {sucursalesOpciones} = useSucursales();
const {clientesOpciones} = useClientes();

</script>