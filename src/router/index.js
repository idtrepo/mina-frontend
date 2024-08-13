import { createRouter, createWebHistory } from 'vue-router'
import authRouter from './authRouter'
import modulosRouter from './modulosRouter';

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
  console.log(to);
  console.log(from);
  next();
});

export default router
