import { computed, toValue } from "vue";
import { storeToRefs } from "pinia";
import useUsuariosStore from "../stores/useUsuariosStore";
import { useRouter } from "vue-router";
import { UsuariosService } from "@/modules/usuarios/services/usuariosService";
import { ICONOS } from "@/modules/global/utils/iconos";
import {
  evaluarUsuario,
  evaluarUsuarioParcial,
} from "../schemas/usuariosSchema";
import useRequest from "@/composables/request/useRequest";
import useFiltrosStore from "@/stores/useFiltrosStore";
import useEdicionStore from "@/stores/useEdicionStore";
import { VISTAS } from "@/modules/global/utils/vistas";
import { reiniciarData } from "@/utils/reinicio";

export default () => {
  const router = useRouter();
  const filtrosStore = useFiltrosStore();
  const edicionStore = useEdicionStore();
  const usuarioStore = useUsuariosStore();
  const { editar, edicionHabilitada } = storeToRefs(edicionStore);
  const { filtros, filtrosMapeados } = storeToRefs(filtrosStore);
  const { usuario, usuarios, numeroElementos } = storeToRefs(usuarioStore);

  const { obtenerElemento, obtenerElementos, crearElemento, editarElemento } =
    useRequest({
      servicio: UsuariosService,
      filtros: filtrosMapeados,
      evaluacion: evaluarUsuario,
      evaluacionParcial: evaluarUsuarioParcial,
    });

  //listado de usuarios
  const usuariosListado = computed(() =>
    usuarios.value.map(({ id, nombre, apellido, perfil }) => ({
      id,
      titulo: `${nombre} ${apellido}`,
      subtitulo: perfil.nombre,
      icono: ICONOS.USUARIOS,
      accion: () => router.push({ name: VISTAS.USUARIOS_DATA, params: { id } }),
    }))
  );

  const obtenerUsuarios = async ({ params = null } = {}) => {
    const res = await obtenerElementos({ params });

    if (res) {
      usuarioStore.asignarDataUsuarios(res);
    }

    return res;
  };

  const obtenerUsuario = async ({ id }) => {
    const res = await obtenerElemento({ id });

    if (res) {
      usuarioStore.asignarDataUsuario(res);
    }

    return res;
  };

  const crearUsuario = async ({ data }) => {
    const res = await crearElemento({ dataElemento: usuario });

    if (res) {
      reiniciarDataCreacion();
      await obtenerUsuarios();
    }

    return res;
  };

  const editarUsuario = async () => {
    const res = await editarElemento({ dataElemento: usuario });

    if (res) {
      editar.value = false;
      const { data: usuario } = res;
      await obtenerUsuario(usuario);
    }

    return res;
  };

  const habilitarEdicion = () => {
    edicionStore.habilitarEdicion();

    if (editar.value) {
      edicionStore.guardarData(usuario);
    } else {
      usuario.value = edicionStore.borrarData();
    }
  };

  function reiniciarDataCreacion() {
    usuario.value = reiniciarData(toValue(usuario));
  }

  //reiniciar datos
  function reiniciarDataUsuarios() {
    reiniciarDataCreacion();
    filtrosStore.reiniciarFiltros();
    edicionStore.reiniciarEdicion();
    usuarios.value = [];
  }

  return {
    usuario,
    usuarios,
    numeroElementos,
    filtros,
    editar,
    edicionHabilitada,
    usuariosListado,
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    editarUsuario,
    habilitarEdicion,
    reiniciarDataUsuarios,
    reiniciarDataCreacion,
  };
};
