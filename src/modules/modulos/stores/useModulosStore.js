import { ref, computed } from "vue";
import { defineStore } from "pinia";

export default defineStore("modulos-store", () => {
  const modulo = ref({
    mac: null,
    idArea: null,
    idSucursal: null,
    idCliente: null,
  });

  const modulos = ref([]);
  const numeroElementos = ref(1);

  const asignarDataModulos = ({ data, resultados }) => {
    modulos.value = data;
    numeroElementos.value = resultados;
  };

  const asignarDataModulo = ({ data }) => {
    const { id, mac, area, sucursal, cliente } = data;
    modulo.value["id"] = id;
    modulo.value.mac = mac;
    modulo.value.idArea = area.id;
    modulo.value.idSucursal = sucursal.id;
    modulo.value.idCliente = cliente.id;
  };

  const modulosOpciones = computed(() =>
    modulos.value.map(({ id, mac }) => ({
      label: mac,
      value: id,
    }))
  );

  return {
    modulo,
    modulos,
    numeroElementos,
    asignarDataModulos,
    asignarDataModulo,
    modulosOpciones,
  };
});
