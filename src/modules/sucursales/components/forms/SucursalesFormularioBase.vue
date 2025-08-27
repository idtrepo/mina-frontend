<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput 
                v-model:value="sucursal.nombre"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4 uppercase" v-if="!usuarioCliente">
            <p>cliente</p>
            <NSelect 
                v-model:value="sucursal.idCliente"
                clearable
                :options="clientesOpciones"
                :disabled="!!usuarioCliente || edicionHabilitada"/>
        </article>
    </section>
</template>

<script setup>
import { NInput, NSelect } from 'naive-ui'
import { onMounted } from 'vue'
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useClientes from '@/modules/clientes/composables/useClientes';
import useAutenticacion from '@/modules/auth/composables/useAutenticacion';
//dependencias
const { clientesOpciones } = useClientes();
const { sucursal, edicionHabilitada } = useSucursales();
const { usuarioCliente } = useAutenticacion();


onMounted(() => {
    usuarioCliente.value ? sucursal.value.idCliente = usuarioCliente.value : sucursal.value.idCliente = null;
});
</script>