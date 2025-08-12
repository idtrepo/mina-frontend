<template>
    <section class="w-1/2 h-full flex flex-col items-center gap-y-2">
        <NCard class="w-full h-full">
            <header class="flex items-center justify-between">
                <h1>Reporte</h1>
            </header>
            <div>
                <NSelect v-model:value="sucursal.id" :options="sucursalesOpciones" placeholder="Seleccione una sucursal"
                    class="w-full mb-4" @update:value="sucursalChange" />
                <NSelect  v-model:value="area.id"  placeholder="Seleccione un área"  :options="areasOpciones" :disabled="!sucursal.id"
                    class="w-full mb-4"  @update:value="areaChange" />
                <NSelect  v-model:value="modulo.id" :options="modulosOpciones"
                    :disabled="!area.id"
                    placeholder="Seleccione un módulo" class="w-full mb-4"
                    @update:value="obtenerModulos({ params: { area:area.id } })" />
                <NDatePicker v-model:formatted-value="fechaInicio" value-format="yyyy-MM-dd" type="date"
                    format="yyyy-MM-dd" placeholder="Seleccione una fecha" class="w-full mb-4" />
            </div>
            <footer class="flex justify-between items-center">
                <NButton type="primary" @click="generarReporte">Generar Reporte</NButton>
            </footer>
        </NCard>
    </section>
</template>

<script setup>
import { NCard, NSelect, NDatePicker, NButton } from 'naive-ui'
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useAreas from '@/modules/areas/composables/useAreas';
import useModulos from '@/modules/modulos/composables/useModulos';
import useUsuarioStore from '@/stores/useUsuarioStore';
import { onMounted, ref } from 'vue';
import {storeToRefs} from 'pinia';
import { ExcelService } from '@/services/excel/excelService';

const { obtenerSucursales, sucursalesOpciones, sucursal, obtenerReporte, dataReporte, sucursales } = useSucursales();
const excelService = new ExcelService();
const { obtenerAreas, areasOpciones, area } = useAreas();
const { obtenerModulos, modulosOpciones, modulo } = useModulos();
const usuarioStore = useUsuarioStore();
const { usuarioNombreCompleto } = storeToRefs(usuarioStore);
const fechaInicio = ref(null);

const sucursalChange = () => {
    obtenerAreas({ params: { sucursal: sucursal.value.id } });
    // Reiniciar el área y el módulo al cambiar la sucursal
    area.value.id = null;
    modulo.value.id = null;
};

const areaChange = () => {
    obtenerModulos({ params: { area: area.value.id } });
    // Reiniciar el módulo al cambiar el área
    modulo.value.id = null;
};


const generarReporte = async () => {
    try {
        await obtenerReporte({
            id: sucursal.value.id,
            params: {
                areas: area.value.id,
                modulos: modulo.value.id,
                fecha: fechaInicio.value
            }
        });

        const rows = dataReporte.value[0].areas.flatMap(area =>
            area.modulos.flatMap(modulo =>
                modulo.sensores.map(sensor => ({
                    sucursal: dataReporte.value[0].nombre,
                    area: area.nombre,
                    moduloMac: modulo.mac,
                    sensorClave: sensor.clave,
                    sensorIdentificador: sensor.identificador,
                    sensorCreado: sensor.creado.split('T')[0],
                    bateria: sensor.infoEstatus?.[0]?.bateria ?? null,
                    vidaUtil: sensor.data?.[0]?.valor ?? null, 
                    fechaEstimada: sensor.fechaPredictiva ?? null,
                }))
            )
        );

        const headers = Object.keys(rows[0]);

        const titulo = 'Reporte de condición predictiva de sensor de desgaste';
        const usuario = usuarioNombreCompleto.value;
        const fecha = fechaInicio.value ? fechaInicio.value.split('T')[0] : new Date().toLocaleDateString();
        const sucursalNombre = dataReporte.value[0].nombre;
        const nombreArchivo = `reporte_${sucursalNombre}_${area.value.id || 'all'}_${modulo.value.id || 'all'}`;

        const getLastColumnLetter = (count) => {
            if (!count || count < 1) return 'A';
            const max = Math.min(count, 26);
            return String.fromCharCode(64 + max);
        };
        const lastCol = getLastColumnLetter(headers.length);
        const filaTablaInfo = 1;
        const filaTitulo = 5;
        const filaHeaders = 7;
        const filaDatos = 8;

        excelService
            .establecerHojaTrabajo('Reporte')
            .establecerTablaInfo({ sucursal: sucursalNombre, usuario, fecha }, filaTablaInfo, 'A')
            .establecerColumnasDatos('A', lastCol)
            .establecerTituloHoja(titulo, filaTitulo, filaTitulo, 'A', {
                noMerge: false,
                alineacion: 'center',
                backgroundColor: '000000',
                fontColor: 'FFFFFFFF'
            })
            .establecerTitulosColumnas(headers, filaHeaders)
            .establecerDatos(rows, filaDatos);

        const vidaIdx = headers.indexOf('vidaUtil');
        if (vidaIdx !== -1) {
            excelService
                .colorearFilasVidaUtil(filaDatos, vidaIdx + 1)
                .agregarLeyendaVidaUtil('L', 2);
        }

        await excelService.crearReporte(nombreArchivo);
    } catch (error) {
        console.error('Error al generar el reporte:', error);
    }
};

onMounted(() => {
    Promise.allSettled([
        obtenerSucursales(),
        obtenerAreas(),
        obtenerModulos()
    ])
        .then(console.log)
        .catch(console.log);
});
</script>