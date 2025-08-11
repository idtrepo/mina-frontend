<template>
  <section class="space-y-3">
    <NSelect
      v-model:value="seleccion"
      :options="options || []"
      :key="(options && options.length) || 0"
      multiple
      filterable
      :virtual-scroll="false"
      :to="false"
      placeholder="Seleccione los usuarios para guardar los correos"
    />
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import { NSelect } from 'naive-ui';

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  options: { type: Array, default: () => [] },
});

const emit = defineEmits(['update:modelValue']);

const seleccion = ref(props.modelValue);

watch(() => props.modelValue, (v) => { seleccion.value = v; });
watch(seleccion, (v) => emit('update:modelValue', v));
</script>

<style scoped>
</style>
