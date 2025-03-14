import { computed, toValue } from "vue";
import { storeToRefs } from "pinia";
import useModulosStore from "../stores/useModulosStore";
import { useRouter } from "vue-router";
import { ModulosService } from "@/modules/modulos/services/modulosService";
import { ICONOS } from "@/modules/global/utils/iconos";
import { evaluarModulo, evaluarModuloParcial } from "../schemas/modulosSchema";
import useRequest from "@/composables/request/useRequest";
import useFiltrosStore from "@/stores/useFiltrosStore";
import useEdicionStore from "@/stores/useEdicionStore";
import { VISTAS } from "@/modules/global/utils/vistas";
import { reiniciarData } from "@/utils/reinicio";
import useDataStore from "../stores/useDataStore";

export default () => {
  const router = useRouter();
  const filtrosStore = useFiltrosStore();
  const edicionStore = useEdicionStore();
  const moduloStore = useModulosStore();
  const { editar, edicionHabilitada } = storeToRefs(edicionStore);
  const { filtros, filtrosMapeados } = storeToRefs(filtrosStore);
  const { modulo, modulos, numeroElementos, modulosOpciones } =
    storeToRefs(moduloStore);
  const { datos, asignarData } = useDataStore();

  const {
    obtenerElemento,
    obtenerElementos,
    crearElemento,
    editarElemento,
    obtenerElementoData,
  } = useRequest({
    servicio: ModulosService,
    filtros: filtrosMapeados,
    evaluacion: evaluarModulo,
    evaluacionParcial: evaluarModuloParcial,
  });

  //listado de modulos
  const modulosListado = computed(() =>
    modulos.value.map(({ id, mac, sucursal, area }) => ({
      id,
      titulo: mac,
      subtitulo: sucursal.nombre + ": " + area.nombre,
      icono: ICONOS.MODULOS,
      accion: () => router.push({ name: VISTAS.MODULOS_DATA, params: { id } }),
    }))
  );

  const obtenerModulos = async ({ params = null } = {}) => {
    const res = await obtenerElementos({ params });

    if (res) {
      moduloStore.asignarDataModulos(res);
    }

    return res;
  };

  const obtenerModulo = async ({ id }) => {
    const res = await obtenerElemento({ id });

    if (res) {
      moduloStore.asignarDataModulo(res);
    }

    return res;
  };

  const obtenerDataModulo = async ({ id }) => {
    try {
      const res = await obtenerElementoData({ id });
      if (res) {
        asignarData(res.data);
      }

      return res;
    } catch (err) {
      throw err;
    }
  };

  const crearModulo = async ({ data }) => {
    const res = await crearElemento({ dataElemento: modulo });

    if (res) {
      reiniciarDataCreacion();
      await obtenerModulos();
    }

    return res;
  };

  const editarModulo = async () => {
    const res = await editarElemento({ dataElemento: modulo });

    if (res) {
      editar.value = false;
      const { data: modulo } = res;
      await obtenerCliente(modulo);
    }

    return res;
  };

  const habilitarEdicion = () => {
    edicionStore.habilitarEdicion();

    if (editar.value) {
      edicionStore.guardarData(modulo);
    } else {
      modulo.value = edicionStore.borrarData();
    }
  };

  function reiniciarDataCreacion() {
    modulo.value = reiniciarData(toValue(modulo));
  }

  function reiniciarDataModulos() {
    reiniciarDataCreacion();
    filtrosStore.reiniciarFiltros();
    edicionStore.reiniciarEdicion();
    modulos.value = [];
  }

  return {
    modulo,
    modulos,
    filtros,
    numeroElementos,
    modulosOpciones,
    modulosListado,
    edicionHabilitada,
    obtenerModulos,
    obtenerModulo,
    crearModulo,
    editarModulo,
    habilitarEdicion,
    reiniciarDataModulos,
    reiniciarDataCreacion,
    obtenerDataModulo,
  };
};
