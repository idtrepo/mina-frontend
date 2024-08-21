import { createRouter, createWebHistory } from 'vue-router'
import authRouter from '@/modules/auth/router';
import areasRouter from '@/modules/areas/router';
import clientesRouter from '@/modules/clientes/router';
import modulosRouter from '@/modules/modulos/router';
import perfilesRouter from '@/modules/perfiles/router';
import sucursalesRouter from '@/modules/sucursales/router';
import usuariosRouter from '@/modules/usuarios/router';
import { autenticacionGuard } from './guards/autenticacion';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'autenticacion-login' }
    },
    authRouter,
    areasRouter,
    clientesRouter,
    modulosRouter,
    perfilesRouter,
    sucursalesRouter,
    usuariosRouter
  ]
})

router.beforeEach(autenticacionGuard);

export default router
