import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { decodificarTokenJWT } from "@/utils/funciones/decodificarJWT";
import {
  obtenerLS,
  guardarLS,
  borrarTodoLS,
} from "@/utils/funciones/localStorage";
import {AuthService} from "../services/authService";
import useUsuarioStore from "@/stores/useUsuarioStore";

export default defineStore("auth-store", () => {
  // dependencias
  const usuarioStore = useUsuarioStore();

  //Tokens
  const tokenAccess = ref(null);
  const tokenRefresh = ref(null);
  const tokenCaducidad = ref(null);
  const autenticado = computed(
    () => !!tokenAccess.value && !!tokenRefresh.value
  );

  const cerrarSesion = () => {
    borrarTodoLS();
    tokenAccess.value = null;
    tokenRefresh.value = null;
    tokenCaducidad.value = null;
  };

  const asignarTokenAccess = (dataAccess) => {
    guardarLS("access", dataAccess);
    tokenAccess.value = dataAccess;
  };

  const asignarTokenRefresh = (dataRefresh) => {
    guardarLS("refresh", dataRefresh);
    tokenRefresh.value = dataRefresh;
  };

  const asignarTokenCaducidad = (dataCaducidad) => {
    tokenCaducidad.value = dataCaducidad * 1000;
  };

  const asignarTokenData = ({ access, refresh = null }) => {
    const { usuario: dataUsuario, exp: dataCaducidad } =
      decodificarTokenJWT(access);

    asignarTokenAccess(access);
    asignarTokenCaducidad(dataCaducidad);
    usuarioStore.asignarDataUsuario(dataUsuario);

    if (refresh) {
      asignarTokenRefresh(refresh);
    }
  };

  //   verificar sesion
  const verificarTokensAlmacenados = () => {
    tokenAccess.value = obtenerLS("access");
    tokenRefresh.value = obtenerLS("refresh");

    return !!tokenAccess.value && !!tokenRefresh.value;
  };

  const verificarTokensVigencia = async () => {
    try {
      const res = await AuthService.actualizarSesion({
        data: { refresh: tokenRefresh.value },
      });
      const { data: tokenData } = res;
      const { access } = tokenData;

      return access;
    } catch (err) {
        console.log(err)
      return false;
    }
  };

  const verificarSesion = async () => {
    let tokensAlamacenados, tokensVigentes;

    tokensAlamacenados = verificarTokensAlmacenados();

    if (!tokensAlamacenados) return false;

    tokensVigentes = await verificarTokensVigencia();
    
    if (!tokensVigentes) {
      borrarTodoLS();
      cerrarSesion();
      return false;
    }
    
    asignarTokenData({ access: tokensVigentes });
    return true;
  };

  return {
    tokenAccess,
    autenticado,
    tokenRefresh,
    tokenCaducidad,
    verificarSesion,
    asignarTokenData,
    cerrarSesion,
  };
});
