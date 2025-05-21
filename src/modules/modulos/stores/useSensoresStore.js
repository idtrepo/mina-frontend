import { ref, computed } from "vue";
import { defineStore } from "pinia";

export default defineStore("sensores-store", () => {
  const sensor = ref({
    clave: null,
    idModulo: null,
    umbral: null,
    identificador: null,
  });

  const sensores = ref([]);
  const numeroElementos = ref(1);

  const asignarDataSensores = ({ data, resultados }) => {
    sensores.value = data;
    numeroElementos.value = resultados;
  };

  const asignarDataSensor = ({ data }) => {
    const { id, clave, modulo, umbral, identificador } = data;

    sensor.value["id"] = id;
    sensor.value["modulo"] = modulo;
    sensor.value.clave = clave;
    sensor.value.idModulo = modulo?.id;
    sensor.value.umbral = umbral;
    sensor.value.identificador = identificador;
  };

  const sensoresOpciones = computed(() =>
    sensores.value.map(({ id, clave }) => ({
      label: clave,
      value: id,
    }))
  );

  return {
    sensor,
    sensores,
    numeroElementos,
    asignarDataSensores,
    asignarDataSensor,
    sensoresOpciones,
  };
});
