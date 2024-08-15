<template>
    <article @click="verDatosModulo" class="flex items-center bg-gray-300/50 p-3 rounded-md shadow-md transition-all duration-100 hover:cursor-pointer hover:bg-gray-300">
        <div class="mr-3 flex justify-center items-center bg-gray-800 rounded-md w-10 h-10">
            <i class="fa-solid fa-box text-2xl text-slate-100"></i>
        </div>
        <section>
            <header>
                <h3 class="uppercase font-bold text-gray-900">{{ moduloMac }}</h3>
            </header>
            <footer class="flex items-center">
                <p class="mr-2 text-gray-600">{{ moduloMina }}</p>
                <p class="text-gray-600">{{ moduloArea }}</p>
            </footer>
        </section>
    </article>
</template>

<script setup>
import { toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'
import { VISTA_DATA } from '@/utils/vistas';

//dependencias
const router = useRouter();

//propiedades
const props = defineProps({
    modulo: {
        type: Object,
        default: () => ({})
    }
});
const { modulo } = toRefs(props);
const moduloMac = computed(() => modulo.value?.mac ?? 'mac');
const moduloMina = computed(() => modulo.value?.mina ?? 'mina');
const moduloArea = computed(() => modulo.value?.area ?? 'area');
const moduloId = computed(() => modulo.value?.id ?? null);

const verDatosModulo = () => {
    if(!moduloId.value) return;

    return router.push({ 
        name: VISTA_DATA,
        params: { id: moduloId.value } 
    })
}
</script>