<template>
    <BaseForm :config="config">
        <template #contenido>
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
        </template>
    </BaseForm>
</template>

<script setup>
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import { NSelect, NInput } from 'naive-ui'


//Componentes
const BaseForm = defineAsyncComponent(() => import('@/modules/global/components/forms/BaseForm.vue'))

//Config form
const config = ref({
    formTitulo: 'Nuevo modulo'
});
</script>