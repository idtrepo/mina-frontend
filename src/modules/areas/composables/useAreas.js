import { computed, toValue } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { AreasService } from "@/modules/areas/services/areasService";
import { ICONOS } from "@/modules/global/utils/iconos";
import useAreasStore from "../stores/useAreasStore";
import useFiltrosStore from "@/stores/useFiltrosStore";
import useEdicionStore from "@/stores/useEdicionStore";
import { evaluarArea, evaluarAreaParcial } from "../schemas/areas";
import { reiniciarData } from "@/utils/reinicio";
import useRequest from "@/composables/request/useRequest";
import { VISTAS } from "@/modules/global/utils/vistas";

export default () => {
  const router = useRouter();
  const filtrosStore = useFiltrosStore();
  const edicionStore = useEdicionStore();
  const areasStore = useAreasStore();
  const { editar, edicionHabilitada } = storeToRefs(edicionStore);
  const { filtros, filtrosMapeados } = storeToRefs(filtrosStore);
  const { area, areas, numeroElementos, areasOpciones } =
    storeToRefs(areasStore);

  const { obtenerElemento, obtenerElementos, crearElemento, editarElemento } =
    useRequest({
      servicio: AreasService,
      filtros: filtrosMapeados,
      evaluacion: evaluarArea,
      evaluacionParcial: evaluarAreaParcial,
    });

  //listado de areas
  const areasListado = computed(() =>
    areas.value.map(({ id, nombre }) => ({
      id,
      titulo: nombre,
      icono: ICONOS.AREAS,
      accion: () => router.push({ name: VISTAS.AREAS_DATA, params: { id } }),
    }))
  );

  const obtenerAreas = async ({ params = null } = {}) => {
    const res = await obtenerElementos({ params });

    if (res) {
      areasStore.asignarDataAreas(res);

    return res;
  };

  const obtenerArea = async ({ id }) => {
    const res = await obtenerElemento({ id });

    if (res) {
      areasStore.asignarDataArea(res);
    }

    return res;
  };

  const crearArea = async () => {
    const res = await crearElemento({ dataElemento: area });

    if (res) {
      reiniciarDataCreacion();
      await obtenerAreas();
    }

    return res;
  };

  const editarArea = async () => {
    const res = await editarElemento({ dataElemento: area });

    if (res) {
      editar.value = false;
      const { data: area } = res;
      await obtenerArea(area);
    }

    return res;
  };

  const habilitarEdicion = () => {
    edicionStore.habilitarEdicion();

    if (editar.value) {
      edicionStore.guardarData(area);
    } else {
      area.value = edicionStore.borrarData();
    }
  };

  //reiniciar datos
  function reiniciarDataCreacion() {
    area.value = reiniciarData(toValue(area));
  }

  function reiniciarDataAreas() {
    reiniciarDataCreacion();
    filtrosStore.reiniciarFiltros();
    edicionStore.reiniciarEdicion();
    areas.value = [];
  }

  return {
    editar,
    edicionHabilitada,
    filtros,
    area,
    numeroElementos,
    areasOpciones,
    areasListado,
    obtenerAreas,
    obtenerArea,
    crearArea,
    editarArea,
    habilitarEdicion,
    reiniciarDataAreas,
    reiniciarDataCreacion,
  };
};
