import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import authRouter from './authRouter'
import modulosRouter from './modulosRouter';
import { VISTA_LOGIN } from '@/utils/vistas';
import useAuthStore from '@/stores/useAuthStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'autenticacion-login' }
    },
    authRouter,
    modulosRouter,
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { autenticado } = storeToRefs(authStore);

  if (!autenticado.value && to.name !== VISTA_LOGIN) {
    console.log('NO ESTAS AUTENTICADO, NO PUEDES PASAR');
    next({ name: VISTA_LOGIN });
  } else {
    console.log('ESTAS AUTENTICADO, PUEDES PASAR');
    next();
  }
});

export default router
