<template>
  <NConfigProvider :locale="esAR" :date-locale="dateEsAR">
    <NNotificationProvider>
      <NDialogProvider>
        <VMainView/>
      </NDialogProvider>
    </NNotificationProvider>
  </NConfigProvider>
</template>

<script setup>
import { onMounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import { NNotificationProvider, NConfigProvider, NDialogProvider, esAR, dateEsAR } from 'naive-ui'
import useAuthStore from './modules/auth/stores/useAuthStore';
import { useRouter } from 'vue-router'
import { VISTAS } from './modules/global/utils/vistas';

//dependencias
const router = useRouter();
const authStore = useAuthStore();

//Componentes
const VMainView = defineAsyncComponent(() => import('@/modules/global/views/VMainView.vue'));

//lifecycle
onMounted(() => {
  authStore.verificarSesion()
    .then(console.log)
    .catch(err => {
      router.push({ name: VISTAS.LOGIN });
    })
})
</script>