<template>
  <aside class="space-y-3">
    <h3 class="text-lg font-medium text-slate-700 dark:text-slate-600">
      Correos en BD ({{ correosLength }})
    </h3>
    <div class="space-y-2 max-h-96 overflow-y-auto border rounded p-3">
      <div v-if="!correos || correosLength === 0" class="text-sm text-slate-500">
        No hay correos registrados.
      </div>
      <div
        v-for="c in correos"
        :key="c.id || c.correo"
        class="flex items-center justify-between text-sm bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded"
      >
        <div class="truncate">
          <span class="text-slate-700 dark:text-slate-200">{{ c.correo || '—' }}</span>
        </div>
        <NButton
          type="error"
          :disabled="eliminandoId === c.id"
          @click="$emit('eliminar', c.id)"
        >
          {{ eliminandoId === c.id ? 'Eliminando...' : `Eliminar` }}
        </NButton>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { NButton } from 'naive-ui';
import { computed } from 'vue';

const props = defineProps({
  correos: { type: Array, default: () => [] },
  eliminandoId: { type: [Number, String, null], default: null }
});

defineEmits(['eliminar']);

const correosLength = computed(() => props.correos?.length || 0);
</script>
