<template>
    <VDataView
        :elemento="perfil"
        :editar-elemento="perfilesStore.editarPerfil"
        :obtener-elemento="perfilesStore.obtenerPerfil"
        @reiniciar-elemento="reiniciarDataPerfil">
        <template #contenido="{ editar }">
            <div>
                <section class="grid grid-cols-1">
                    <article class="mb-4">
                        <p class="uppercase mb-1">nombre</p>
                        <NInput
                            v-model:value="perfil.nombre"
                            :disabled="!editar"/>
                    </article>
                </section>
                <section>
                    <PerfilesPermiso/>
                    <PerfilesPermiso/>
                    <PerfilesPermiso/>
                </section>
            </div>
        </template>    
    </VDataView>
</template>

<script setup>
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { NInput } from 'naive-ui'
import usePerfilesStore from '../stores/usePerfilesStore'

// dependencias
const route = useRoute();
const perfilesStore = usePerfilesStore();

// componentes
const VDataView = defineAsyncComponent(() => import('@/modules/global/views/VDataView.vue')); 
const PerfilesPermiso = defineAsyncComponent(() => import('../components/PerfilesPermiso.vue'))

//perfil
const perfil = ref({
    id: null,
    nombre: null,
});

const reiniciarDataPerfil = (data) => {
    perfil.value = { ...data };
}

const asignarDataPerfil = ({ data }) => {
    const { id, nombre } = data;
    perfil.value.id = id;
    perfil.value.nombre = nombre;

    console.log(perfil.value);
}

// lifcycle
onMounted(() => {
    const { id } = route.params;

    Promise.allSettled([
        perfilesStore.obtenerPerfil({ id }),
    ])
        .then((res) => {
            const [dataPerfil] = res;

            asignarDataPerfil(dataPerfil.value);
        })
        .catch(console.log);
});
</script>