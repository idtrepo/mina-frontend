import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { formatearFecha } from "@/utils/fechas";

export default defineStore("filtros-store", () => {
  const filtros = ref({
    estatus: true,
    fecha: null,
    nombre: null,
    apellido: null,
    correo: null,
    mac: null,

    modulo: null,
    perfil: null,
    accion: null,
    sucursal: null,
    cliente: null,
    area: null,
  });

  const filtrosActivos = computed(
    () =>
      !filtros.value.estatus ||
      !!filtros.value.fecha ||
      !!filtros.value.nombre ||
      !!filtros.value.apellido ||
      !!filtros.value.correo ||
      !!filtros.value.mac ||
      !!filtros.value.operacion ||
      !!filtros.value.modulo ||
      !!filtros.value.perfil ||
      !!filtros.value.accion ||
      !!filtros.value.sucursal ||
      !!filtros.value.cliente ||
      !!filtros.value.area
  );

  const filtrosMapeados = computed(() => ({
    ...filtros.value,
    fecha: filtros.value.fecha && formatearFecha(new Date(filtros.value.fecha)),
  }));

  const reiniciarFiltros = () => {
    for (let clave in filtros.value) {
      filtros.value[clave] = null;
    }

    filtros.value.estatus = true;
  };

  return {
    filtros,
    filtrosActivos,
    filtrosMapeados,
    reiniciarFiltros,
  };
});
