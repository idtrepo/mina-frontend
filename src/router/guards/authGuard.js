import { storeToRefs } from 'pinia'
import { VISTAS } from "@/modules/global/utils/vistas"
import useAuthStore from '@/modules/auth/stores/useAuthStore';
import useTituloStore from "@/stores/useTituloStore";
import {PERFILES} from "@/modules/global/utils/perfiles";
import useUsuarioStore from "@/modules/auth/stores/useUsuarioStore"

export const autenticacionGuard = async (to, from, next) => {
  const authStore = useAuthStore();
  const usuarioStore = useUsuarioStore();
  const { autenticado } = storeToRefs(authStore);
  const tituloStore = useTituloStore();
  const { usuarioPerfil, usuarioSucursal } = storeToRefs(usuarioStore);
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
      if(usuarioPerfil.value === PERFILES.OPERADOR)
        return next({
        name: "modulos-listado",
    });
      }

      tituloStore.asignarDataTitulo({ nuevoIcono: icono, nuevoTitulo: titulo });
      next();
  }
}