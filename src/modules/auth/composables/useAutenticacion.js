import { ref, toValue } from "vue";
import { storeToRefs } from "pinia";
import useUsuarioStore from "@/stores/useUsuarioStore";
import useSesionStore from "@/stores/useSesionStore";
import { AuthService } from "../services/authService";
import { validarCredenciales } from "../schemas/credenciales";
import { decodificarTokenJWT } from "@/utils/jwt";
import { LS } from "@/utils/localStorage";
import { VISTAS } from "@/modules/global/utils/vistas";
import { PERFILES } from "@/utils/perfiles";
import router from "@/router";

export default () => {
  // dependencias
  const sesionStore = useSesionStore();
  const usuarioStore = useUsuarioStore();
  const {
    access: accessStore,
    refresh: refreshStore,
    autenticado,
    tiempoExpiracion,
  } = storeToRefs(sesionStore);
  const {
    usuarioNombre,
    usuarioApellido,
    usuarioCorreo,
    usuarioNombreCompleto,
    usuarioPerfil,
    usuarioCliente,
    usuarioSucursal,
    usuarioPermisos,
    usuarioPerfilId,
    usuarioArea,
  } = storeToRefs(usuarioStore);

  // inicio de sesion
  const credenciales = ref({ correo: "", password: "" });

  const reiniciarCredenciales = () => {
    credenciales.value.correo = "";
    credenciales.value.password = "";
  };

  const guardarSesion = ({ access, refresh = null } = {}) => {
    const res = decodificarTokenJWT(access);
    const { usuario, exp: tiempoExpiracion } = res;

    usuarioStore.asignarDataUsuario(usuario);
    sesionStore.asignarDataTokens({ access, refresh, tiempoExpiracion });
  };

  const iniciarSesion = async () => {
    let dataToken;
    const { error, data } = validarCredenciales(toValue(credenciales));

    if (error) {
      return;
    }

    try {
      const res = await AuthService.iniciarSesion({
        data,
      });
      dataToken = res.data;
    } catch (err) {
      console.log(err);
    }

    LS.guardar("access", dataToken.access);
    LS.guardar("refresh", dataToken.refresh);

    guardarSesion(dataToken);
    reiniciarCredenciales();
    llevarAVista();
  };

  // verificar sesion
  const verificarSesion = async () => {
    const access = LS.obtener("access");
    const refresh = LS.obtener("refresh");

    if (!access || !refresh) return cerrarSesion();

    // verificar si las credenciales esta vigentes
    let nuevoTokenAccess;

    try {
      const { data: resData } = await AuthService.actualizarSesion({
        data: { refresh },
      });
      nuevoTokenAccess = resData.access;
    } catch (err) {
      cerrarSesion();
      return;
    }

    LS.guardar("access", nuevoTokenAccess);

    guardarSesion({
      access: nuevoTokenAccess,
      refresh: refresh,
    });
  };

  function cerrarSesion() {
    LS.limpiarLS();
    sesionStore.borrarDataTokens();
    usuarioStore.borrarDataUsuario();
  }

  //logica para llevar a vista
  function llevarAVista() {
    if (usuarioPerfil.value === PERFILES.SUPERUSUARIO)
      return router.push({ name: VISTAS.USUARIOS });

    if (usuarioPerfil.value === PERFILES.ADMINISTRADOR)
      return router.push({ name: VISTAS.SUCURSALES });

    if (usuarioPerfil.value === PERFILES.SUPERVISOR)
      return router.push({
        name: VISTAS.AREAS,
      });
    if (usuarioPerfil.value === PERFILES.OPERADOR)
      return router.push({
        name: "modulos-listado",
      });
  }

  return {
    credenciales,
    cerrarSesion,
    iniciarSesion,
    guardarSesion,
    verificarSesion,
    access: accessStore,
    refresh: refreshStore,
    autenticado: autenticado,
    tiempoExpiracion: tiempoExpiracion,
    usuarioNombre: usuarioNombre,
    usuarioApellido: usuarioApellido,
    usuarioNombreCompleto: usuarioNombreCompleto,
    usuarioCorreo: usuarioCorreo,
    usuarioPerfil: usuarioPerfil,
    usuarioCliente: usuarioCliente,
    usuarioPermisos: usuarioPermisos,
    usuarioSucursal: usuarioSucursal,
    usuarioPerfilId,
    usuarioArea,
  };
};
