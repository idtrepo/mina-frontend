<template>
    <article @click="verDatosModulo" class="flex items-center bg-gray-300/50 p-3 rounded-md shadow-md transition-all duration-100 hover:cursor-pointer hover:bg-gray-300">
        <div class="mr-3 flex justify-center items-center bg-gray-800 rounded-md w-10 h-10">
            <i :class="dataIcono" class="text-2xl text-slate-100"></i>
        </div>
        <section>
            <header>
                <h3 class="uppercase font-bold text-gray-900">{{ dataTitulo }}</h3>
            </header>
            <footer class="flex items-center">
                <p class="text-gray-600">
                    {{ dataSecundario }} - {{ dataTerceario }} 
                </p>
            </footer>
        </section>
    </article>
</template>

<script setup>
import { toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'

//dependencias
const router = useRouter();

//propiedades
const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});
const { data } = toRefs(props);
const dataId = computed(() => data.value?.id ?? null);
const dataIcono = computed(() => data.value?.icono ?? []);
const dataTitulo = computed(() => data.value?.titulo ?? '');
const dataSecundario = computed(() => data.value?.secundario ?? '');
const dataTerceario = computed(() => data.value?.terceario ?? '');
const dataVista = computed(() => data.value?.vista ?? '');

const verDatosModulo = () => {
    if(!dataId.value) return;

    return router.push({ 
        name: dataVista.value,
        params: { id: dataId.value } 
    })
}
</script>