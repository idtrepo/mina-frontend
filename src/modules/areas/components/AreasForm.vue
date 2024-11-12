<template>
    <VModalFormulario>
        <article>
            <header>
                <h2 class="uppercase font-bold">crear area</h2>
            </header>
            <section class="pt-3">
                <article class="mb-4">
                    <p class="uppercase mb-1">nombre</p>
                    <NInput 
                        clearable 
                        v-model:value="area.nombre"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">sucursal</p>
                    <NSelect 
                        clearable
                        :options="sucursalesOpciones" 
                        v-model:value="area.idSucursal"/>
                </article>
            </section>
            <footer class="pt-5">
                <NButton :disabled="cargando" @click="crearArea" type="warning" class="w-full">
                    <span class="uppercase font-bold">crear</span>
                </NButton>
            </footer>
        </article>
    </VModalFormulario>
</template>

<script setup>
import { ref, provide } from 'vue'
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { NButton, NInput, NSelect } from 'naive-ui'
import useRequest from '@/modules/global/composables/request/useRequest';
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { MENSAJE_EXITO, MENSAJE_ERROR } from '@/modules/global/utils/mensajes';
import useAreasStore from '../stores/useAreasStore';
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';

// dependencias
const areasStore = useAreasStore();
const sucursalesStore = useSucursalesStore();
const { sucursalesOpciones } = storeToRefs(sucursalesStore);

const notificacion = useNotificacion();
const { cargando } = useRequest();

// componentes
const VModalFormulario = defineAsyncComponent(() => import('@/modules/global/components/VModalFormulario.vue'));

// crear perfil
const area = ref({
    nombre: null,
    idSucursal: null
});

provide('data', { dataElemento: area });

const reiniciarData = () => {
    for(let clave in area.value){
        area.value[clave] = null;
    }
}

const crearArea = async() => {
    try{
        const res = await areasStore.crearArea({ data: area });
        await areasStore.obtenerAreas();
        reiniciarData();
        notificacion.nExito({ mensaje: MENSAJE_EXITO.CREACION });
    }catch(err){
        notificacion.nError({ mensaje: MENSAJE_ERROR.CREACION });
        console.log(err);
    }
}
</script>