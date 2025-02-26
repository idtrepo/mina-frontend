import { storeToRefs } from 'pinia'
import { VISTAS } from "@/modules/global/utils/vistas"
import useAuthStore from '@/modules/auth/stores/useAuthStore';
import useTituloStore from '@/modules/global/stores/useTituloStore';
import {PERFILES} from "@/modules/global/utils/perfiles";
import useUsuarioStore from "@/modules/auth/stores/useUsuarioStore"

export const autenticacionGuard = async (to, from, next) => {
  const authStore = useAuthStore();
  const usuarioStore = useUsuarioStore();
  const { autenticado } = storeToRefs(authStore);
  const { usuarioPerfil, usuarioSucursal } = storeToRefs(usuarioStore);
  const tituloStore = useTituloStore();
  const { name: nombreVista, meta: dataVista = null } = to;
  await authStore.verificarSesion();

  if (!autenticado.value && nombreVista !== VISTAS.LOGIN) {
    next({ name: VISTAS.LOGIN });
  } else {
    const { perfil = null, titulo = null, icono = null } = to.meta;

    if (!perfil.includes(usuarioPerfil.value)) {
      if (usuarioPerfil.value === PERFILES.ADMINISTRADOR)
        return next({ name: VISTAS.SUCURSALES });
      if (usuarioPerfil.value === PERFILES.SUPERVISOR)
        return next({
          name: "sucursales-info",
          params: { id: usuarioSucursal.value },
        });
    }

    tituloStore.establecerTitulo({ tituloRuta: titulo, iconoRuta: icono });
    next();
  }
}