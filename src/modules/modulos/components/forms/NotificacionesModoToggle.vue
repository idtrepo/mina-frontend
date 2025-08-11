<template>
  <div class="flex items-center justify-between">
    <div class="text-sm font-medium">Modo de ingreso</div>
    <NRadioGroup :value="modelValue" @update:value="$emit('update:modelValue', $event)" size="small">
      <NRadioButton value="manual">Manual</NRadioButton>
      <NRadioButton value="usuarios">Usuarios</NRadioButton>
    </NRadioGroup>
  </div>
</template>

<script setup>
import { NRadioGroup, NRadioButton } from 'naive-ui';

defineProps({
  modelValue: { type: String, required: true },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
</style>
