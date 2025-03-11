import { ref, computed } from "vue";
import { defineStore } from "pinia";

export default defineStore("sesion-store", () => {
  const access = ref(null);
  const refresh = ref(null);
  const tiempoExpiracion = ref(null);
  const autenticado = computed(() => !!access.value && !!refresh.value);

  const asignarDataAccess = (dataAccess) => {
    access.value = dataAccess;
  };

  const asignarDataRefresh = (dataRefresh) => {
    refresh.value = dataRefresh;
  };

  const asignarDataTiempoExpiracion = (dataTiempoExpiracion) => {
    tiempoExpiracion.value = dataTiempoExpiracion * 1000;
  };

  const asignarDataTokens = ({
    access: dataAccess,
    tiempoExpiracion: dataTiempoExpiracion,
    refresh: dataRefresh,
  }) => {
    asignarDataAccess(dataAccess);
    asignarDataTiempoExpiracion(dataTiempoExpiracion);

    if (dataRefresh) asignarDataRefresh(dataRefresh);
  };

  const borrarDataTokens = () => {
    access.value = null;
    refresh.value = null;
    tiempoExpiracion.value = null;
  };

  return {
    access,
    refresh,
    autenticado,
    tiempoExpiracion,
    asignarDataTokens,
    borrarDataTokens,
  };
});
