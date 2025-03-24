<template>
    <section>
        <header class="md:mb-5 flex justify-end">
           <VBotonesData
                :idElemento="id"
                :editarElemento="editarElemento"
                :habilitarEdicion="habilitarEdicion"
            />
        </header>
        <section class="p-5 bg-gray-800/50 rounded-lg">
            <section>
                <slot name="formulario"></slot>
            </section>
            <footer>
                <slot name="extra"></slot>
            </footer>
        </section>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted, defineAsyncComponent, toRefs} from 'vue'
import useEdicionStore from '@/stores/useEdicionStore';
import { useRoute } from 'vue-router';
import { useDialog } from 'naive-ui';

// dependencias
const route = useRoute();
const dialog = useDialog();
const edicionStore = useEdicionStore();
const id = route.params.id

// propiedades
const props = defineProps({
    peticiones: { type: Array, required: true },
    reiniciarData: { type: Function, required: true },
    habilitarEdicion: { type: Function, required: true },
    editarElemento: { type: Function, required: true },
    // eliminarElemento: { type: Function, required: true },
})
const { peticiones } = toRefs(props);

//componentes
const VBotonesData = defineAsyncComponent(() => import('@/components/botones/VBotonesData.vue'));

// ciclo de vida
onMounted(() => {
    Promise.allSettled(peticiones.value)
        .then(res => {

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