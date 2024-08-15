<template>
    <NModal v-model:show="verModulosForm">
        <NCard class="w-1/3">
            <article>
                <header class="mb-5">
                    <h3 class="uppercase font-bold">Nuevo modulo</h3>
                </header>
                <section class="mb-5">
                    <article class="mb-3">
                        <p class="mb-1 uppercase">mac</p>
                        <NInput/>
                    </article>
                    <article class="mb-3">
                        <p class="mb-1 uppercase">cliente</p>
                        <NSelect/>
                    </article>
                    <article class="mb-3">
                        <p class="mb-1 uppercase">sucursal</p>
                        <NSelect/>
                    </article>
                    <article class="mb-3">
                        <p class="mb-1 uppercase">area</p>
                        <NSelect/>
                    </article>
                </section>
                <footer>
                    <NButton type="info" class="w-full">
                        <span class="uppercase">crear</span>
                    </NButton>
                </footer>
            </article>
        </NCard>
    </NModal>
</template>

<script setup>
import { inject } from 'vue'
import { NModal, NCard, NButton, NSelect, NInput } from 'naive-ui'

//Ver formulario
const { verModulosForm } = inject('verModulosForm');
</script>