<template>
    <VModalFormulario>
        <article>
            <header>
                <h2 class="uppercase font-bold">crear perfil</h2>
            </header>
            <section class="pt-3">
                <article class="mb-4">
                    <p class="uppercase mb-1">nombre</p>
                    <NInput clearable v-model:value="perfiles.nombre"/>
                </article>
            </section>
            <footer class="pt-5">
                <NButton :disabled="cargando" @click="crearPerfil" type="warning" class="w-full">
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
import usePerfilesStore from '../stores/usePerfilesStore';
import useRequest from '@/modules/global/composables/request/useRequest';
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { MENSAJE_EXITO, MENSAJE_ERROR } from '@/modules/global/utils/mensajes';

// dependencias
const notificacion = useNotificacion();
const perfilesStore = usePerfilesStore();
const { cargando } = useRequest();

// componentes
const VModalFormulario = defineAsyncComponent(() => import('@/modules/global/components/VModalFormulario.vue'));

// crear perfil
const perfiles = ref({
    nombre: null
});

provide('data', { dataElemento: perfiles });

const reiniciarData = () => {
    for(let clave in perfiles.value){
        perfiles.value[clave] = null;
    }
}

const crearPerfil = async() => {
    try{
        const res = await perfilesStore.crearPerfil({ data: perfiles });
        await perfilesStore.obtenerPerfiles();
        reiniciarData();
        notificacion.nExito({ mensaje: MENSAJE_EXITO.CREACION });
    }catch(err){
        notificacion.nError({ mensaje: MENSAJE_ERROR.CREACION });
        console.log(err);
    }
}
</script>