import { ref, toValue } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import authService from "../services/authService";
import useAuthStore from "../stores/useAuthStore";
import { VISTAS } from "@/modules/global/utils/vistas";
import { PERFILES } from "@/modules/global/utils/perfiles";
import useUsuarioStore from "@/stores/useUsuarioStore";

export default () => {
  // dependencias
  const router = useRouter();
  const authStore = useAuthStore();
  const usuarioStore = useUsuarioStore();
  const { usuarioPerfil, usuarioSucursalId } = storeToRefs(usuarioStore);

  //   cambio de vista segun el perfil
  const irAVista = () => {
    if (usuarioPerfil.value === PERFILES.SUPER_USUARIO)
      return router.push({ name: VISTAS.USUARIOS });

    if (usuarioPerfil.value === PERFILES.ADMINISTRADOR)
      return router.push({ name: VISTAS.SUCURSALES });

    if (usuarioPerfil.value === PERFILES.SUPERVISOR)
      return router.push({
        name: "sucursales-info",
        params: { id: usuarioSucursalId.value }
      });
    if(usuarioPerfil.value === PERFILES.OPERADOR)
      return router.push({
        name: "modulos-listado"
      })
  };

  //   inicio de sesion
  const credenciales = ref({
    correo: "",
    password: "",
  });

  const reiniciarCredenciales = () => {
    for (let clave in credenciales.value) {
      credenciales.value[clave] = null;
    }
  };

  const iniciarSesion = async () => {
    try {
      const res = await authService.iniciarSesion({
        data: toValue(credenciales),
      });
      const { data: tokenData } = res.data;

      authStore.asignarTokenData(tokenData);

      reiniciarCredenciales();
      console.log("llendo avista")
      irAVista();
    } catch (err) {
      console.log(err);
    }
  };

  const actualizarSesion = async (data) => {
    try {
      const res = await authService.actualizarSesion({ data });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    credenciales,
    iniciarSesion,
    actualizarSesion,
  };
};
