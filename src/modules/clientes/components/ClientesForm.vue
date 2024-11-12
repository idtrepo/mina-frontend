<template>
    <VModalFormulario>
        <article>
            <header>
                <h2 class="uppercase font-bold">crear cliente</h2>
            </header>
            <section class="pt-3">
                <article class="mb-4">
                    <p class="uppercase mb-1">nombre</p>
                    <NInput clearable v-model:value="cliente.nombre"/>
                </article>
            </section>
            <footer class="pt-5">
                <NButton :disabled="cargando" @click="crearCliente" type="warning" class="w-full">
                    <span class="uppercase font-bold">crear</span>
                </NButton>
            </footer>
        </article>
    </VModalFormulario>
</template>

<script setup>
import { ref, provide } from 'vue'
import { defineAsyncComponent } from 'vue'
import { NButton, NInput } from 'naive-ui'
import useRequest from '@/modules/global/composables/request/useRequest';
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { MENSAJE_EXITO, MENSAJE_ERROR } from '@/modules/global/utils/mensajes';
import useClientesStore from '../stores/useClientesStore';

// dependencias
const clientesStore = useClientesStore();

const notificacion = useNotificacion();
const { cargando } = useRequest();

// componentes
const VModalFormulario = defineAsyncComponent(() => import('@/modules/global/components/VModalFormulario.vue'));

// crear perfil
const cliente = ref({
    nombre: null
});

provide('data', { dataElemento: cliente });

const reiniciarData = () => {
    for(let clave in cliente.value){
        cliente.value[clave] = null;
    }
}

const crearCliente = async() => {
    try{
        const res = await clientesStore.crearCliente({ data: cliente });
        await clientesStore.obtenerClientes();
        reiniciarData();
        notificacion.nExito({ mensaje: MENSAJE_EXITO.CREACION });
    }catch(err){
        notificacion.nError({ mensaje: MENSAJE_ERROR.CREACION });
        console.log(err);
    }
}
</script>