<template>
<VBuscadorBase :="confFormulario">
        <template #contenido>
            <section>
                <article class="mb-4">
            <p class="mb-1 uppercase">sensor</p>
            <NSelect 
                :options="sensoresOpciones"
                v-model:value="filtros.sensor"
                />
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">fecha</p>
            <NDatePicker
                v-model:value="filtros.fecha"
                clearable/>
        </article>
            </section>
        </template>
    </VBuscadorBase>
</template>


<script setup>
import { ref, defineAsyncComponent } from 'vue';
import useData from '../../composables/useData';
import { NDatePicker, NSelect } from 'naive-ui'
import useModuloDataSensores from '@/modules/modulos/composables/useModulosDataSensores';


// dependencias
const { obtenerDataModulo, filtros } = useData();
const {sensoresOpciones} = useModuloDataSensores();

// componentes
const VBuscadorBase = defineAsyncComponent(() => import('@/components/forms/VBuscadorBase.vue'));

// configuracion formulario
const confFormulario = ref({
    tituloBoton: 'buscar',
    accionFormulario: obtenerDataModulo,
})
</script>