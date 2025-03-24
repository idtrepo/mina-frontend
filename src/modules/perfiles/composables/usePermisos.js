import { ref, computed, toValue } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { PermisosService } from "../services/permisosService";
import { ICONOS } from "@/modules/global/utils/iconos";
import usePermisosStore from "../stores/usePermisosStore";
import useFiltrosStore from "@/stores/useFiltrosStore";
import useEdicionStore from "@/stores/useEdicionStore";
import {
  evaluarPermiso,
  evaluarPermisoParcial,
} from "../schemas/permisosSchema";
import { reiniciarData } from "@/utils/reinicio";
import { VISTAS } from "@/modules/global/utils/vistas";
import useRequest from "@/composables/request/useRequest";

export default () => {
  const router = useRouter();
  const filtrosStore = useFiltrosStore();
  const edicionStore = useEdicionStore();
  const permisosStore = usePermisosStore();
  const { editar, edicionHabilitada } = storeToRefs(edicionStore);
  const { filtros, filtrosMapeados } = storeToRefs(filtrosStore);
  const { permiso, permisos, numeroElementos, permisosOpciones } =
    storeToRefs(permisosStore);
  const { obtenerElemento, obtenerElementos, crearElemento, editarElemento } =
    useRequest({
      servicio: PermisosService,
      filtros: filtrosMapeados,
      evaluacion: evaluarPermiso,
      evaluacionParcial: evaluarPermisoParcial,
    });

  // Listado de permisos
  const permisosListado = computed(() =>
    permisos.value.map(({ id, accion, perfil }) => ({
      id,
      titulo: `${accion.nombre} - [${perfil.nombre}]`,
      icono: ICONOS.PERMISOS,
      accion: () => router.push({ name: VISTAS.PERMISOS_DATA, params: { id } }),
    }))
  );

  const obtenerPermisos = async ({ params = null } = {}) => {
    const res = await obtenerElementos({ params });

    if (res) {
      permisosStore.asignarDataPermisos(res);
    }

    return res;
  };

  const obtenerPermiso = async ({ id }) => {
    const res = await obtenerElemento({ id });

    if (res) {
      permisosStore.asignarDataPermiso(res);
    }

    return res;
  };

  // Crear permiso
  const crearPermiso = async () => {
    const res = await crearElemento({ dataElemento: permiso });

    if (res) {
      reiniciarDataCreacion();
      await obtenerPermisos();
    }

    return res;
  };

  const crearPermisos = async () => {
    try {
      const res = await PermisosService.crearElementos({});
      reiniciarDataCreacion();
      await obtenerPermisos();

      console.log(res);
    } catch (err) {
      console.error(err);
    }

    // const res = await crearElemento({ dataElemento: permiso });

    // if (res) {
    //   reiniciarDataCreacion();
    //   await obtenerPermisos();
    // }

    // return res;
  };

  // Editar permiso
  const habilitarEdicion = () => {
    edicionStore.habilitarEdicion();

    if (editar.value) {
      edicionStore.guardarData(permiso);
    } else {
      permiso.value = edicionStore.borrarData();
    }
  };

  const editarPermiso = async () => {
    const res = await editarElemento({ dataElemento: permiso });

    if (res) {
      editar.value = false;
      const { data: permiso } = res;
      await obtenerPermiso(permiso);
    }

    return res;
  };

  // Reiniciar datos
  function reiniciarDataCreacion() {
    permiso.value = reiniciarData(toValue(permiso));
  }

  function reiniciarDataPermisos() {
    reiniciarDataCreacion();
    filtrosStore.reiniciarFiltros();
    edicionStore.reiniciarEdicion();
    permisos.value = [];
  }

  return {
    editar,
    edicionHabilitada,
    filtros,
    permiso,
    permisos,
    numeroElementos,
    permisosListado,
    permisosOpciones,
    obtenerPermiso,
    obtenerPermisos,
    crearPermiso,
    editarPermiso,
    habilitarEdicion,
    reiniciarDataPermisos,
    reiniciarDataCreacion,
  };
};
