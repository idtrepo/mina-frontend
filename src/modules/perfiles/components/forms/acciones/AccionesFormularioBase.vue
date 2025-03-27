<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput 
                v-model:value="accion.nombre"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
        <article>
            <p class="mb-1 uppercase">categoria</p>
            <NSelect
                v-model:value="accion.idCategoria"
                :options="categoriasOpciones"
                :disabled="edicionHabilitada"/>
        </article>
        <article>
            <p class="mb-1 uppercase">operacion</p>
            <NSelect 
                v-model:value="accion.idOperacion"
                :options="operacionesOpciones"
                :disabled="edicionHabilitada"/>
        </article>
    </section>
</template>

<script setup>
import { NInput, NSelect } from 'naive-ui'
import { onMounted, computed, ref, watch } from 'vue'
import useAcciones from '../../../composables/useAcciones';
import useCategorias from '@/modules/perfiles/composables/useCategorias';
import useOperaciones from '@/modules/perfiles/composables/useOperaciones';

//dependencias
const { accion, edicionHabilitada } = useAcciones();
const { categoriasOpciones, obtenerCategorias } = useCategorias();
const { operacionesOpciones, obtenerOperaciones } = useOperaciones();

//ciclo de vida
onMounted(() => {
    obtenerCategorias({ params: { listado: true } });
    obtenerOperaciones({ params: { listado: true } });
});
</script>