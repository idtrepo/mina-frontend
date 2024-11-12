import { storeToRefs } from 'pinia'
import { VISTAS } from "@/modules/global/utils/vistas"
import useAuthStore from '@/modules/auth/stores/useAuthStore';
import useTituloStore from '@/modules/global/stores/useTituloStore';

export const autenticacionGuard = (to, from, next) => {
  const authStore = useAuthStore();
  const { autenticado, usuarioPerfil } = storeToRefs(authStore);
  const tituloStore = useTituloStore();

  if (!autenticado.value && to.name !== VISTAS.LOGIN) {
    next({ name: VISTAS.LOGIN });
  } else {
    const tituloRuta = to.meta?.titulo ?? '';
    const iconoRuta = to.meta?.icono ?? [];

    tituloStore.establecerTitulo({ tituloRuta, iconoRuta });
    next();
  }
}