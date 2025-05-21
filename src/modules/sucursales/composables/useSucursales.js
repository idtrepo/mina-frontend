import { computed, toValue, ref } from "vue";
import { storeToRefs } from "pinia";
import useSucursalesStore from "../stores/useSucursalesStore";
import { useRouter } from "vue-router";
import { SucursalesService } from "@/modules/sucursales/services/sucursalesService";
import { ICONOS } from "@/modules/global/utils/iconos";
import { evaluarSucursal } from "../schemas/sucursalesSchema";
import useRequest from "@/composables/request/useRequest";
import useFiltrosStore from "@/stores/useFiltrosStore";
import useEdicionStore from "@/stores/useEdicionStore";
import { VISTAS } from "@/modules/global/utils/vistas";
import { reiniciarData } from "@/utils/reinicio";
import useUsuarioStore from "@/stores/useUsuarioStore";

export default () => {
  const router = useRouter();
  const filtrosStore = useFiltrosStore();
  const edicionStore = useEdicionStore();
  const sucursalStore = useSucursalesStore();
  const { editar, edicionHabilitada } = storeToRefs(edicionStore);
  const { filtros, filtrosMapeados } = storeToRefs(filtrosStore);
  const { sucursal, sucursales, numeroElementos, sucursalesOpciones } =
    storeToRefs(sucursalStore);
  const { usuarioPerfilId } = useUsuarioStore();
  const dataReporte = ref(null);

  const { obtenerElemento, obtenerElementos, crearElemento, editarElemento, customRequest:obtenerElementoReporte } =
    useRequest({
      servicio: SucursalesService,
      filtros: filtrosMapeados,
      evaluacion: evaluarSucursal,
    });

  //listado de sucursales
  const sucursalesListado = computed(() =>
    sucursales.value.map(({ id, nombre }) => ({
      id,
      titulo: nombre,
      icono: ICONOS.SUCURSALES,
      accion: () => router.push({ name: "sucursales-info", params: { id } }),
    }))
  );

  const obtenerSucursales = async ({ params = null } = {}) => {
    const res = await obtenerElementos({ params });

    if (res) {
      sucursalStore.asignarDataSucursales(res);
    }

    return res;
  };

  const obtenerSucursal = async ({ id }) => {
    const res = await obtenerElemento({ id });

    if (res) {
      sucursalStore.asignarDataSucursal(res);
    }

    return res;
  };

  const crearSucursal = async () => {
    const res = await crearElemento({ dataElemento: sucursal });

    if (res) {
      reiniciarDataCreacion();
      await obtenerSucursales();
    }

    return res;
  };

  const editarSucursal = async () => {
    const res = await editarElemento({ dataElemento: sucursal });

    if (res) {
      editar.value = false;
      const { data: sucursal } = res;
      await obtenerSucursal(sucursal);
    }

    return res;
  };

  const obtenerReporte = async ({ id, params }) => {
    const res = await obtenerElementoReporte({metodo:['obtenerReporte'], id, params });

    if (res) {
      dataReporte.value = res.data.elementos;
      return res;
    }

    return null;
  }

  const habilitarEdicion = () => {
    edicionStore.habilitarEdicion();

    if (editar.value) {
      edicionStore.guardarData(sucursal);
    } else {
      sucursal.value = edicionStore.borrarData();
    }
  };

  function reiniciarDataCreacion() {
    sucursal.value = reiniciarData(toValue(sucursal));
  }

  //reiniciar datos
  function reiniciarDataSucursales() {
    reiniciarDataCreacion();
    filtrosStore.reiniciarFiltros();
    edicionStore.reiniciarEdicion();
    sucursales.value = [];
  }

  return {
    sucursal,
    sucursales,
    numeroElementos,
    sucursalesOpciones,
    sucursalesListado,
    filtros,
    editar,
    edicionHabilitada,
    obtenerSucursales,
    obtenerSucursal,
    crearSucursal,
    editarSucursal,
    habilitarEdicion,
    reiniciarDataCreacion,
    reiniciarDataSucursales,
    obtenerReporte,
    dataReporte,
  };
};
