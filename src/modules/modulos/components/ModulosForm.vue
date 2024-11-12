<template>
    <VModalFormulario>
        <article>
            <header>
                <h2 class="uppercase font-bold">crear modulo</h2>
            </header>
            <section class="pt-3">
                <article class="mb-4">
                    <p class="uppercase mb-1">mac</p>
                    <NInput 
                        v-model:value="modulo.mac"
                        clearable/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">cliente</p>
                    <NSelect 
                        v-model:value="modulo.idCliente"
                        clearable
                        :options="clientesOpciones"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">sucursal</p>
                    <NSelect 
                        v-model:value="modulo.idSucursal"
                        clearable
                        :options="sucursalesOpciones"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">area</p>
                    <NSelect 
                        v-model:value="modulo.idArea"
                        clearable
                        :options="areasOpciones"/>
                </article>
                <article v-if="moduloMac" class="mb-4">
                    <p class="uppercase mb-1">sensores</p>
                    <article class="flex items-center justify-between pt-5">
                        <NButton strong type="info" @click="eliminarSensor">-</NButton>
                        <p>{{ numSensores }}</p>
                        <NButton strong type="info" @click="agregarSensor">+</NButton>
                    </article>
                </article>
            </section>
            <footer class="pt-5">
                <NButton :disabled="cargando" @click="crearModulo" type="warning" class="w-full">
                    <span class="uppercase font-bold">crear</span>
                </NButton>
            </footer>
        </article>
    </VModalFormulario>
</template>

<script setup>
import { ref, provide, computed, watch } from 'vue'
import { defineAsyncComponent } from 'vue'
import { NButton, NInput, NSelect } from 'naive-ui'
import useRequest from '@/modules/global/composables/request/useRequest';
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { MENSAJE_EXITO, MENSAJE_ERROR } from '@/modules/global/utils/mensajes';
import useModulosStore from '../stores/useModulosStore';
import useClientesStore from '@/modules/clientes/stores/useClientesStore';
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';
import useAreasStore from '@/modules/areas/stores/useAreasStore';
import { storeToRefs } from 'pinia';

// dependencias
const modulosStore = useModulosStore();
const clientesStore = useClientesStore();
const { clientesOpciones } = storeToRefs(clientesStore);
const sucursalesStore = useSucursalesStore();
const { sucursalesOpciones } = storeToRefs(sucursalesStore);
const areasStore = useAreasStore();
const { areasOpciones } = storeToRefs(areasStore);

const notificacion = useNotificacion();
const { cargando } = useRequest();

// componentes
const VModalFormulario = defineAsyncComponent(() => import('@/modules/global/components/VModalFormulario.vue'));

// crear perfil
const numSensores = ref(0);
const modulo = ref({
    mac: null,
    idCliente: null,
    idSucursal: null,
    idArea: null,
    sensores: []
});
const moduloMac = computed(() => modulo.value.mac);
const refReiniciarSensores = ref(null);

provide('data', { dataElemento: modulo });

const agregarSensor = () => {
    if(!moduloMac.value) return;
    numSensores.value++;
    modulo.value.sensores.push({ clave: `${moduloMac.value}-${numSensores.value}` });
}

const eliminarSensor = () => {
    if(numSensores.value === 0) return; 
    numSensores.value--; // 1 -> 0
    modulo.value.sensores.splice(numSensores.value, 1); // 1
}

watch(moduloMac, newValue => {
    if(newValue){
        if(refReiniciarSensores.value){
            clearTimeout(refReiniciarSensores.value);
            refReiniciarSensores.value = null;
        }

        modulo.value.sensores = modulo.value.sensores.map(({ clave }) => {
            const [_, idSensor] = clave.split('-');
            return { clave: `${newValue}-${idSensor}` };
        })
    }

    if(!newValue){
        refReiniciarSensores.value = setTimeout(() => {
            numSensores.value = 0;
            modulo.value = { ...modulo.value, sensores: [] };
        }, 5_000);
    }
});

const reiniciarData = () => {
    for(let clave in modulo.value){
        modulo.value[clave] = null;
    }

    modulo.value.sensores = [];
}

const crearModulo = async() => {
    try{
        const res = await modulosStore.crearModulo({ data: modulo });
        await modulosStore.obtenerModulos();
        reiniciarData();
        notificacion.nExito({ mensaje: MENSAJE_EXITO.CREACION });
    }catch(err){
        notificacion.nError({ mensaje: MENSAJE_ERROR.CREACION });
        console.log(err);
    }
}
</script>