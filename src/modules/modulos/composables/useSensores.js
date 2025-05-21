import { computed, toValue } from "vue";
import { storeToRefs } from "pinia";
import useSensoresStore from "../stores/useSensoresStore";
import { useRouter } from "vue-router";
import { SensoresService } from "@/modules/modulos/services/sensoresService";
import { ICONOS } from "@/modules/global/utils/iconos";
import { evaluarSensor, evaluarSensorParcial } from "../schemas/sensoresSchema";
import useRequest from "@/composables/request/useRequest";
import useFiltrosStore from "@/stores/useFiltrosStore";
import useEdicionStore from "@/stores/useEdicionStore";
import { reiniciarData } from "@/utils/reinicio";
import useModales from "@/composables/modales/useModales";

export default () => {
  const router = useRouter();
  const filtrosStore = useFiltrosStore();
  const edicionStore = useEdicionStore();
  const sensoresStore = useSensoresStore();
  const { editar, edicionHabilitada } = storeToRefs(edicionStore);
  const { filtros, filtrosMapeados } = storeToRefs(filtrosStore);
  const { sensor, sensores, numeroElementos, sensoresOpciones } =
    storeToRefs(sensoresStore);
  const { verModal, mostrarModal } = useModales();

  const { obtenerElemento, obtenerElementos, crearElemento, editarElemento } =
    useRequest({
      servicio: SensoresService,
      filtros: filtrosMapeados,
      evaluacion: evaluarSensor,
      evaluacionParcial: evaluarSensorParcial,
    });

  //listado de sensors
  const sensoresListado = computed(() =>
    sensores.value.map(({ id, clave, infoEstatus,umbral, identificador, modulo }) => ({
      id,
      titulo: clave,
      subtitulo: `bateria:${infoEstatus[0]?.bateria? infoEstatus[0].bateria : "no data" }%`,
      extra: `UBI:${identificador? identificador : "No definido"}`,
      icono: ICONOS.SENSORES,
      accion: () => {
        sensoresStore.asignarDataSensor({ data: { id, clave, umbral, identificador, modulo } });
        mostrarModal();
      }
    }))
  );

  const obtenerSensores = async ({ params = null } = {}) => {
    const res = await obtenerElementos({ params });

    if (res) {
      sensoresStore.asignarDataSensores(res);
    }

    return res;
  };

  const obtenerSensor = async ({ id }) => {
    const res = await obtenerElemento({ id });

    if (res) {
      sensoresStore.asignarDataSensor(res);
    }

    return res;
  };

  const crearSensor = async () => {
    const res = await crearElemento({ dataElemento: sensor });

    if (res) {
      reiniciarDataCreacion();
      await obtenerSensores();
    }

    return res;
  };

  const editarSensor = async () => {
    const res = await editarElemento({ dataElemento: sensor });

    if (res) {
      editar.value = false;
      const { data: sensor } = res;
      await obtenerSensor(sensor);
      await obtenerSensores();
    }

    return res;
  };

  const habilitarEdicion = () => {
    edicionStore.habilitarEdicion();

    if (editar.value) {
      edicionStore.guardarData(sensor);
    } else {
      sensor.value = edicionStore.borrarData();
        }
  };

  function reiniciarDataCreacion() {
    sensor.value = reiniciarData(toValue(sensor));
  }

  function reiniciarDatasensores() {
    reiniciarDataCreacion();
    filtrosStore.reiniciarFiltros();
    edicionStore.reiniciarEdicion();
    sensores.value = [];
  }

  return {
    sensor,
    sensores,
    filtros,
    numeroElementos,
    sensoresOpciones,
    sensoresListado,
    edicionHabilitada,
    obtenerSensores,
    obtenerSensor,
    crearSensor,
    editarSensor,
    habilitarEdicion,
    reiniciarDatasensores,
    reiniciarDataCreacion,
    verModal,
  };
};
