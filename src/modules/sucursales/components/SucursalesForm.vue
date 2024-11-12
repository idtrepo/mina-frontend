<template>
    <VModalFormulario>
        <article>
            <header>
                <h2 class="uppercase font-bold">crear sucursal</h2>
            </header>
            <section class="pt-3">
                <article class="mb-4">
                    <p class="uppercase mb-1">nombre</p>
                    <NInput v-model:value="sucursal.nombre" clearable />
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">cliente</p>
                    <NSelect v-model:value="sucursal.idCliente" clearable :options="clientesOpciones"/>
                </article>
            </section>
            <footer class="pt-5">
                <NButton :disabled="cargando" @click="crearSucursal" type="warning" class="w-full">
                    <span class="uppercase font-bold">crear</span>
                </NButton>
            </footer>
        </article>
    </VModalFormulario>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue'
import { NButton, NInput, NSelect } from 'naive-ui'
import useSucursalesStore from '../stores/useSucursalesStore';
import useRequest from '@/modules/global/composables/request/useRequest';
import useClientesStore from '@/modules/clientes/stores/useClientesStore';
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { MENSAJE_EXITO, MENSAJE_ERROR } from '@/modules/global/utils/mensajes';

// dependencias
const sucursalesStore = useSucursalesStore();
const clientesStore = useClientesStore();
const { clientesOpciones } = storeToRefs(clientesStore);
const notificacion = useNotificacion();
const { cargando } = useRequest();

// componentes
const VModalFormulario = defineAsyncComponent(() => import('@/modules/global/components/VModalFormulario.vue'));

// crear sucursal
const sucursal = ref({
    nombre: null,
    idCliente: null
});

provide('data', { dataElemento: sucursal });

const reiniciarData = () => {
    for(let clave in sucursal.value){
        sucursal.value[clave] = null;
    }
}

const crearSucursal = async() => {
    try{
        const res = await sucursalesStore.crearSucursal({ data: sucursal });
        await sucursalesStore.obtenerSucursales();
        reiniciarData();
        notificacion.nExito({ mensaje: MENSAJE_EXITO.CREACION });
    }catch(err){
        notificacion.nError({ mensaje: MENSAJE_ERROR.CREACION });
    }
}

// lifecycle
onMounted(() => {
    clientesStore.obtenerClientes()
        .then(console.log)
        .catch(console.log);
});
</script>