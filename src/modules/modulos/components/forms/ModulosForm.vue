<template>
    <BaseForm :config="config">
        <template #contenido>
            <article class="mb-3">
                <p class="mb-1 uppercase">mac</p>
                <NInput
                    v-model:value="modulo.mac"
                    :placeholder="MODULOS_PLACEHOLDER.MAC"/>
            </article>
            <article class="mb-3">
                <p class="mb-1 uppercase">cliente</p>
                <NSelect
                    v-model:value="modulo.idCliente"
                    :options="opcionesClientes"
                    :placeholder="MODULOS_PLACEHOLDER.CLIENTE"/>
            </article>
            <article v-if="hayNombre" class="mb-3">
                <p class="mb-3 uppercase">sensores</p>
                <section class="flex justify-between items-center">
                    <NButton @click="eliminarSensores" type="info" strong>-</NButton>
                    <p>{{ numSensores }}</p>
                    <NButton @click="agregarSensores" type="info" strong>+</NButton>
                </section>
            </article>
            <article class="mb-3">
                <p class="mb-1 uppercase">sucursal</p>
                <NSelect
                    v-model:value="modulo.idSucursal"
                    :options="opcionesSucursales"
                    :placeholder="MODULOS_PLACEHOLDER.SUCURSAL"/>
            </article>
            <article class="mb-3">
                <p class="mb-1 uppercase">area</p>
                <NSelect
                    v-model:value="modulo.idArea"
                    :options="opcionesAreas"
                    :placeholder="MODULOS_PLACEHOLDER.AREA"/>
            </article>
        </template>
    </BaseForm>
</template>

<script setup>
import { ref, computed, toRefs, watch } from 'vue'
import { onMounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { NSelect, NInput, NButton } from 'naive-ui'
import useAreasStore from '@/modules/areas/stores/useAreasStore';
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';
import useClientesStore from '@/modules/clientes/stores/useClientesStore'
import useModulosStore from '../../stores/useModulosStore'
import { MODULOS_PLACEHOLDER } from '@/modules/global/utils/placeholder'
import useNotificacion from '@/modules/global/composables/useNotificacion'
import { MENSAJE_EXITO, MENSAJE_ERROR } from '@/modules/global/utils/mensajes'

//Dependencias
const notificacion = useNotificacion();
const areasStore = useAreasStore();
const sucursalesStore = useSucursalesStore();
const clientesStore = useClientesStore();
const modulosStore = useModulosStore();
const { opcionesAreas } = storeToRefs(areasStore);
const { opcionesSucursales } = storeToRefs(sucursalesStore);
const { opcionesClientes } = storeToRefs(clientesStore);

//Componentes
const BaseForm = defineAsyncComponent(() => import('@/modules/global/components/forms/BaseForm.vue'))

//Crear modulo
const numSensores = ref(0);
const modulo = ref({
    mac: null,
    idCliente: null,
    sensores: null,
    idSucursal: null,
    idArea: null
});
const { mac } = toRefs(modulo.value);
const hayNombre = computed(() => !!modulo.value.mac);

const reiniciarDataModulo = () => {
    for(let clave in modulo.value){
        modulo.value[clave] = null;
    }
}

const eliminarSensores = () => {
    if(!numSensores.value > 0) return;
    numSensores.value--;
    modulo.value.sensores.splice(numSensores.value, 1);
}

const agregarSensores = () => {
    if(numSensores.value === 0) modulo.value.sensores = [];

    numSensores.value++;
    modulo.value.sensores.push({
        clave: `${modulo.value.mac}-${numSensores.value}`
    })
}

const reemplazarMac = ({ nuevaMac, viejaMac, listado }) => {
    return listado.map(({ clave }) => ({
        clave: clave.replace(viejaMac, nuevaMac)
    }))
}

const crearModulo = async() => {
    try{
        const { mensaje } = await modulosStore.crearModulo({ data: modulo });

        notificacion.nExito({ mensaje });
        reiniciarDataModulo();
        await modulosStore.obtenerModulos();
    }catch({ response: { data: { error:mensaje } } }){
        console.log(mensaje);
        notificacion.nError({ mensaje });
    }
}

watch(mac, (newValue, oldValue) => {
    if(newValue && modulo.value.sensores){
        const { sensores } = modulo.value;
        modulo.value.sensores = reemplazarMac({ 
            listado: sensores,
            nuevaMac: newValue,
            viejaMac: oldValue
        });
    }else{
        numSensores.value = 0;
        modulo.value.sensores = null;
    }
});

//Hooks
onMounted(() => {
    areasStore.obtenerAreas()
        .then(console.log)
        .catch(console.log)

    sucursalesStore.obtenerSucursales()
        .then(console.log)
        .catch(console.log)

    clientesStore.obtenerClientes()
        .then(console.log)
        .catch(console.log)
})

//Config form
const config = ref({
    formTitulo: 'Nuevo modulo',
    formFuncCrear: crearModulo
});
</script>