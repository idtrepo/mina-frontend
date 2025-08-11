<template>
  <section class="space-y-3">
    <NInput v-model:value="correo" placeholder="Ingrese el correo" type="email" />
    <div class="flex items-center gap-3">
      <NButton @click="$emit('agregar', correo)" type="primary" :disabled="!correo">Agregar a lista</NButton>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import { NInput, NButton } from 'naive-ui';

const props = defineProps({
  modelValue: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue', 'agregar']);

const correo = ref(props.modelValue);

watch(() => props.modelValue, (v) => { correo.value = v; });
watch(correo, (v) => emit('update:modelValue', v));
</script>

<style scoped>
</style>
