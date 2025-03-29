import { ref, computed, toValue } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { AccionesService } from "../services/accionesService";
import { ICONOS } from "@/modules/global/utils/iconos";
import useAccionesStore from "../stores/useAccionesStore";
import useFiltrosStore from "@/stores/useFiltrosStore";
import useEdicionStore from "@/stores/useEdicionStore";
import { evaluarAccion, evaluarAccionParcial } from "../schemas/accionesSchema";
import { reiniciarData } from "@/utils/reinicio";
import { VISTAS } from "@/modules/global/utils/vistas";
import useRequest from "@/composables/request/useRequest";

export default () => {
  const router = useRouter();
  const filtrosStore = useFiltrosStore();
  const edicionStore = useEdicionStore();
  const accionesStore = useAccionesStore();
  const { editar, edicionHabilitada } = storeToRefs(edicionStore);
  const { filtros, filtrosMapeados } = storeToRefs(filtrosStore);
  const { accion, acciones, numeroElementos, accionesOpciones } =
    storeToRefs(accionesStore);
  const { obtenerElemento, obtenerElementos, crearElemento, editarElemento } =
    useRequest({
      servicio: AccionesService,
      filtros: filtrosMapeados,
      evaluacion: evaluarAccion,
      evaluacionParcial: evaluarAccionParcial,
    });

  // Listado de acciones
  const accionesListado = computed(() =>
    acciones.value.map(({ id, nombre, descripcion, tipoAccion }) => ({
      id,
      titulo: nombre,
      subtitulo: descripcion,
      extra: tipoAccion?.nombre ?? "",
      icono: ICONOS.ACCIONES,
      accion: () => router.push({ name: VISTAS.ACCIONES_DATA, params: { id } }),
    }))
  );

  const obtenerAcciones = async ({ params = null } = {}, permisos = null) => {
    const res = await obtenerElementos({ params });

    if (res) {
      accionesStore.asignarDataAcciones(res, toValue(permisos));
    }

    return res;
  };

  const obtenerAccion = async ({ id }) => {
    const res = await obtenerElemento({ id });

    if (res) {
      accionesStore.asignarDataAccion(res);
    }

    return res;
  };

  // Crear acción
  const crearAccion = async () => {
    const res = await crearElemento({ dataElemento: accion });

    if (res) {
      reiniciarDataCreacion();
      await obtenerAcciones();
    }

    return res;
  };

  // Editar acción
  const habilitarEdicion = () => {
    edicionStore.habilitarEdicion();

    if (editar.value) {
      edicionStore.guardarData(accion);
    } else {
      accion.value = edicionStore.borrarData();
    }
  };

  const editarAccion = async () => {
    const res = await editarElemento({ dataElemento: accion });

    if (res) {
      editar.value = false;
      const { data: accion } = res;
      await obtenerAccion(accion);
    }

    return res;
  };

  // Reiniciar datos
  function reiniciarDataCreacion() {
    accion.value = reiniciarData(toValue(accion));
  }

  function reiniciarDataAcciones() {
    reiniciarDataCreacion();
    filtrosStore.reiniciarFiltros();
    edicionStore.reiniciarEdicion();
    acciones.value = [];
  }

  return {
    editar,
    edicionHabilitada,
    filtros,
    accion,
    acciones,
    numeroElementos,
    accionesListado,
    accionesOpciones,
    obtenerAccion,
    obtenerAcciones,
    crearAccion,
    editarAccion,
    habilitarEdicion,
    reiniciarDataAcciones,
    reiniciarDataCreacion,
  };
};
