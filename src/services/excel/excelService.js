import ExcelJS from "exceljs";
import FileSaver from "file-saver";

export class ExcelService {
  constructor() {
    this.workbook = new ExcelJS.Workbook();
    this.worksheet = null;
    this.columnasDatos = [];
  }

  establecerHojaTrabajo = (tituloHoja) => {
    this.worksheet = this.workbook.addWorksheet(tituloHoja);

    return this;
  };


  establecerColumnasDatos = (columnaInicial, columnaFinal) => {
    const asciiColumnaInicial = columnaInicial.charCodeAt(0);
    const asciiColumnaFinal = columnaFinal.charCodeAt(0);

    for (let i = asciiColumnaInicial; i <= asciiColumnaFinal; i++) {
      const columna = String.fromCharCode(i);
      this.columnasDatos.push(columna);
    }

    return this;
  };

  establecerTituloHoja = (tituloHoja, filaInicial, filaFinal, columnaInicioOverride, opciones = {}) => {
    const { noMerge = false, alineacion = 'center', backgroundColor = 'FF1F2937', fontColor = 'FFFFFFFF' } = opciones;
    const inicioCol = columnaInicioOverride || this.columnasDatos[0];
    const startRef = `${inicioCol}${filaInicial}`;
    if (!noMerge) {
      const rangoFinal = `${this.columnasDatos.at(-1)}${filaFinal}`;
      this.worksheet.mergeCells(`${startRef}:${rangoFinal}`);
    }
    const celdaTitulo = this.worksheet.getCell(startRef);
    celdaTitulo.value = tituloHoja;
    celdaTitulo.font = { size: 16, bold: true, color: { argb: fontColor } };
    celdaTitulo.alignment = { horizontal: alineacion, vertical: 'middle' };
    celdaTitulo.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: backgroundColor } };
    return this;
  };

  establecerDatos = (datos, filaInicial) => {
    const cantidadDatos = datos.length;
    const listadoFilas = this.worksheet.getRows(filaInicial, cantidadDatos);

    listadoFilas.forEach((fila, indexFila) => {
      const datosFila = Object.values(datos[indexFila]);

      this.columnasDatos.forEach((columnaData, indexColumna) => {
        const celda = fila.getCell(columnaData);
        celda.value = datosFila[indexColumna];
      });
    });

    return this;
  };

  establecerTitulosColumnas = (titulosColumnas, fila) => {
    const filaTitulos = this.worksheet.getRow(fila);

    this.columnasDatos.forEach((columnaData, index) => {
      const columna = this.worksheet.getColumn(columnaData);
      columna.width =
        titulosColumnas[index].length > 10
          ? titulosColumnas[index].length * 1.1
          : titulosColumnas[index].length * 2;
      columna.alignment = {
        horizontal: "center",
        vertical: "middle",
      };
      // Forzar mayor ancho para columna de fecha estimada (I)
      if (columnaData === 'I' && columna.width < 22) {
        columna.width = 22;
      }
      const celda = filaTitulos.getCell(columnaData);
      celda.value = titulosColumnas[index];
      celda.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '#ffe96b25' } };
      celda.font = {
        bold: true,
        size: 12
      };
    });

    return this;
  };

  // Permite ajustar el ancho de una columna específica después de definir títulos.
  ajustarAnchoColumna = (columnaLetra, ancho) => {
    if (!this.worksheet) return this;
    const col = this.worksheet.getColumn(columnaLetra.toUpperCase());
    if (ancho && ancho > 0) col.width = ancho;
    return this;
  };

  colorearFilasVidaUtil = (filaInicialDatos, vidaUtilCol) => {
    if (!this.worksheet) return this;
    const totalFilas = this.worksheet.rowCount;
    // Resolver índice si viene letra
    let vidaIndex;
    if (typeof vidaUtilCol === 'string') {
      vidaIndex = vidaUtilCol.toUpperCase().charCodeAt(0) - 64; // A->1
    } else {
      vidaIndex = vidaUtilCol;
    }
    for (let f = filaInicialDatos; f <= totalFilas; f++) {
      const row = this.worksheet.getRow(f);
      const cell = row.getCell(vidaIndex);
      const val = parseFloat(cell.value);
      if (isNaN(val)) continue;
      let color = 'FFFFFFFF'; // default blanco
      if (val >= 80) color = 'FF3B82F6'; // azul
      else if (val >= 60) color = 'FF10B981'; // verde
      else if (val >= 40) color = 'FFFBBF24'; // amarillo
      else if (val >= 20) color = 'FFF97316'; // naranja
      else color = 'FFEF4444'; // rojo

      row.eachCell((c) => {
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };
        const useDark = color === 'FFFBBF24';
        c.font = { ...(c.font || {}), color: { argb: useDark ? 'FF111827' : 'FFFFFFFF' } };
      });
    }
    return this;
  };

  // Agrega una leyenda de colores para vidaUtil en una columna (por letra) y fila inicial dadas.
  agregarLeyendaVidaUtil = (columna = 'L', filaInicio = 4) => {
    if (!this.worksheet) return this;
    // Título de la leyenda
    const titulo = this.worksheet.getRow(filaInicio - 1).getCell(columna);
    titulo.value = 'Codigo de colores';
    titulo.font = { bold: true };
    titulo.alignment = { horizontal: 'center' };
    this.worksheet.mergeCells(`${columna}${filaInicio - 1}:${String.fromCharCode(columna.charCodeAt(0) + 1)}${filaInicio - 1}`);

    const items = [
      { texto: '> 80  Excelente', color: 'FF3B82F6', darkText: false },
      { texto: '60 - 79  Bueno', color: 'FF10B981', darkText: false },
      { texto: '40 - 59  Atención', color: 'FFFBBF24', darkText: true },
      { texto: '20 - 39  Riesgo', color: 'FFF97316', darkText: false },
      { texto: '< 20  Crítico', color: 'FFEF4444', darkText: false }
    ];
    const colColor = columna.toUpperCase();
    const colTexto = String.fromCharCode(columna.charCodeAt(0) + 1);
    // Configurar anchos compactos
    const colColorObj = this.worksheet.getColumn(colColor);
    const colTextoObj = this.worksheet.getColumn(colTexto);
    colColorObj.width = 4; // bloque de color pequeño
    if (!colTextoObj.width || colTextoObj.width < 22) colTextoObj.width = 22;

    items.forEach((item, i) => {
      const filaNum = filaInicio + i;
      const row = this.worksheet.getRow(filaNum);
      const cellColor = row.getCell(colColor);
      const cellText = row.getCell(colTexto);
      // Bloque de color
      cellColor.value = '';
      cellColor.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: item.color } };

      cellText.value = item.texto;
      cellText.font = { size: 11, bold: true, color: { argb: item.darkText ? 'FF111827' : 'FF1F2937' } };
      cellText.alignment = { vertical: 'middle', horizontal: 'left' };
    });
    
    return this;
  };

  // Tabla informativa (Cliente/Sucursal, Usuario, Fecha)
  establecerTablaInfo = ({ sucursal = '', usuario = '', fecha = '' } = {}, filaInicio = 1, columnaInicio = 'A') => {
    if (!this.worksheet) return this;
    const col1 = columnaInicio.toUpperCase();
    const col2 = String.fromCharCode(col1.charCodeAt(0) + 1);
    const datos = [
      ['Sucursal', sucursal],
      ['Usuario', usuario],
      ['Fecha', fecha]
    ];
    const col1Obj = this.worksheet.getColumn(col1);
    const col2Obj = this.worksheet.getColumn(col2);
    col1Obj.width = Math.max(col1Obj.width || 0, 12);
    col2Obj.width = Math.max(col2Obj.width || 0, 28);
    datos.forEach((par, i) => {
      const filaNum = filaInicio + i;
      const row = this.worksheet.getRow(filaNum);
      const c1 = row.getCell(col1);
      const c2 = row.getCell(col2);
      c1.value = par[0];
      c2.value = par[1];
      c1.font = { bold: true, color: { argb: 'FF1F2937' } };
      c2.font = { color: { argb: 'FF111827' } };
      c1.alignment = c2.alignment = { vertical: 'middle', horizontal: 'left' };
      c1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE5E7EB' } };
      // Merge de la celda 2 con la de su derecha
      this.worksheet.mergeCells(`B${filaNum}:C${filaNum}`);

    });
    return this;
  };

  crearReporte = async (nombreArchivo = "reporte") => {
    const buffer = await this.workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer]);
    FileSaver.saveAs(blob, `${nombreArchivo}.xlsx`);
  };
}