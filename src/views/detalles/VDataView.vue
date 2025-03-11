<template>
    <section>
        <header>
            <section v-if="!editar" class="flex items-center justify-end">
                <NButton @click="props.habilitarEdicion" type="warning">
                    <span class="uppercase font-bold">editar</span>
                </NButton>
            </section>
            <section v-else class="flex items-center justify-between">
                <NButton @click="eliminarRegistro" type="error">
                    <span class="uppercase font-bold">eliminar</span>
                </NButton>
                <article>
                    <NButton @click="props.habilitarEdicion" type="warning">
                        <span class="uppercase font-bold">cancelar</span>
                    </NButton>
                    <NButton @click="editarRegistro" class="ml-2" type="success">
                        <span class="uppercase font-bold">guardar</span>
                    </NButton>
                </article>
            </section>
        </header>
        <section class="pt-5">
            <slot name="formulario"></slot>
        </section>
    </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { NButton } from 'naive-ui'
import { onMounted, onUnmounted } from 'vue'
import useEdicionStore from '@/stores/useEdicionStore';
import { toRefs } from 'vue';
import { useDialog } from 'naive-ui';

// dependencias
const dialog = useDialog();
const edicionStore = useEdicionStore();
const { editar } = storeToRefs(edicionStore);

// propiedades
const props = defineProps({
    peticiones: { type: Array, required: true },
    reiniciarData: { type: Function, required: true },
    habilitarEdicion: { type: Function, required: true },
    editarElemento: { type: Function, required: true },
    // eliminarElemento: { type: Function, required: true },
})
const { peticiones } = toRefs(props);

const editarRegistro = () => {
    dialog.warning({
        title: 'Edicion de registro en curso',
        content: '¿Estas seguro de querer actualizar el registro?',
        positiveText: 'Aceptar',
        negativeText: 'Cancelar',
        onPositiveClick: () => {
            props.editarElemento();
        }
    })
}

const eliminarRegistro = () => {
    dialog.warning({
        title: 'Eliminacion de registro en curso',
        content: '¿Estas seguro de querer eliminar el registro?',
        positiveText: 'Aceptar',
        negativeText: 'Cancelar',
        onPositiveClick: () => {
            console.log('REGISTRO ELIMINADO')
            // props.eliminarElemento();
        }
    })
}

// ciclo de vida
onMounted(() => {
    Promise.allSettled(peticiones.value)
        .then(res => {
            console.log(res);

            const [ objetivo ] = res;
            const { data } = objetivo.value;
            edicionStore.guardarData(data);
        })
        .catch(console.log);
});

onUnmounted(() => {
    props.reiniciarData();
});
</script>