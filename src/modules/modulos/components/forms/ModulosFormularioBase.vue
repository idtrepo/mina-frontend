<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">mac</p>
            <NInput v-model:value="modulo.mac" clearable :disabled="edicionHabilitada" />
        </article>
        <article class="mb-4" v-if="!usuarioArea">
            <p class="mb-1 uppercase">area</p>
            <NSelect v-model:value="modulo.idArea" clearable :options="areasOpciones" :disabled="edicionHabilitada" />
        </article>
        <article class="mb-4" v-if="!usuarioCliente">
            <p class="mb-1 uppercase">cliente</p>
            <NSelect v-model:value="modulo.idCliente" clearable :options="clientesOpciones"
                :disabled="edicionHabilitada" />
        </article>
        <article class="mb-4" v-if="!usuarioSucursal">
            <p class="mb-1 uppercase">sucursal</p>
            <NSelect v-model:value="modulo.idSucursal" clearable :options="sucursalesOpciones"
                :disabled="edicionHabilitada" />
        </article>
    </section>
</template>

<script setup>
import { NInput, NSelect } from 'naive-ui'
import useModulos from '../../composables/useModulos';
import useAreas from '@/modules/areas/composables/useAreas';
import useClientes from '@/modules/clientes/composables/useClientes';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useAutenticacion from '@/modules/auth/composables/useAutenticacion';
import { onMounted } from 'vue';

//dependencias
const { modulo, edicionHabilitada } = useModulos();
const { areasOpciones } = useAreas();
const { clientesOpciones } = useClientes();
const { sucursalesOpciones } = useSucursales();
const { usuarioArea, usuarioCliente, usuarioSucursal } = useAutenticacion();

onMounted(async () => {
    const asignarValores = async () => {
        usuarioSucursal.value ? modulo.value.idSucursal = usuarioSucursal.value : modulo.value.idSucursal = null;
        usuarioCliente.value ? modulo.value.idCliente = usuarioCliente.value : modulo.value.idCliente = null;
        usuarioArea.value ? modulo.value.idArea = usuarioArea.value : modulo.value.idArea = null;
    }
    await asignarValores();
});
</script>