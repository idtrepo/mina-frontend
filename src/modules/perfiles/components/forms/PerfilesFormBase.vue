<template>
    <section class="grid grid-cols-1">
                    <article class="mb-4">
                        <p class="uppercase mb-1">nombre</p>
                        <NInput
                            v-model:value="perfil.nombre"
                            :disabled="edicionHabilitada"/>
                    </article>
                </section>
                <section>
                    <PerfilesPermiso/>
                    <PerfilesPermiso/>
                    <PerfilesPermiso/>
                </section>
</template>

<script setup>
import { NInput } from 'naive-ui';
import usePerfiles from '@/modules/perfiles/composables/usePerfiles';
import { defineAsyncComponent } from 'vue'

const { perfil, edicionHabilitada } = usePerfiles();

const PerfilesPermiso = defineAsyncComponent(() => import('../PerfilesPermiso.vue'))

</script>