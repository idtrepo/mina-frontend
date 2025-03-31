import { VISTAS } from "@/modules/global/utils/vistas"
import useAutenticacion from '@/modules/auth/composables/useAutenticacion'
import useTituloStore from "@/stores/useTituloStore";
import {PERFILES} from "@/modules/global/utils/perfiles";

export const autenticacionGuard = async (to, from, next) => {
  const { autenticado, verificarSesion, usuarioPerfil,usuarioSucursal } = useAutenticacion();
  const tituloStore = useTituloStore();
  const { name: nombreVista, meta: dataVista = null } = to;
  await verificarSesion();

  const redirigirPorPerfil = () => {
    switch (usuarioPerfil.value) {
      case PERFILES.SUPER_USUARIO:
        return next({ name: VISTAS.USUARIOS });
      case PERFILES.ADMINISTRADOR:
        return next({ name: VISTAS.SUCURSALES });
      case PERFILES.SUPERVISOR:
        return next({
          name: VISTAS.SUCURSALES_INFO,
          params: { id: usuarioSucursal.value },
        });
      case PERFILES.OPERADOR:
        return next({ name: VISTAS.MODULOS });
    }
  };

  if (!autenticado.value && nombreVista !== VISTAS.LOGIN) {
    next({ name: VISTAS.LOGIN });
  } else {
    const { perfil = null, titulo = null, icono = null } = to.meta;

    if((nombreVista == VISTAS.LOGIN && autenticado.value) || !perfil.includes(usuarioPerfil.value))
       redirigirPorPerfil();

      tituloStore.asignarDataTitulo({ nuevoIcono: icono, nuevoTitulo: titulo });
      next();
  }
}