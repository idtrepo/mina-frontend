import ExcelJS from 'exceljs'

export function useExcelReporte() {
  const generarExcelReporte = async ({ rows, headers, usuario, area, modulo, fecha, nombreSucursal }) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte');

    // Título grande fusionado y con fondo
    worksheet.mergeCells(3, 1, 3, headers.length);
    worksheet.getCell('A3').value = 'Reporte de condición predictiva de sensor de desgaste';
    worksheet.getCell('A3').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getCell('A3').font = { bold: true, size: 14 };
    worksheet.getCell('A3').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '228B22' }
    };

    // Usuario y fecha
    worksheet.getCell('A1').value = 'Usuario:';
    worksheet.getCell('A1').font = { bold: true };
    worksheet.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D3D3D3' }
    };
    worksheet.getCell('B1').value = usuario;
    worksheet.getCell('B1').font = { bold: true };
    worksheet.getCell('B1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D3D3D3' }
    };
    worksheet.getCell('A2').value = 'Fecha:';
    worksheet.getCell('A2').font = { bold: true };
    worksheet.getCell('A2').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D3D3D3' }
    };
    worksheet.getCell('B2').value = fecha;
    worksheet.getCell('B2').font = { bold: true };
    worksheet.getCell('B2').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D3D3D3' }
    };

    // Encabezados de columnas
    worksheet.addRow(headers);

    // Datos
    rows.forEach(row => {
      const newRow = worksheet.addRow(headers.map(h => row[h]));
      const fechaColIndex = headers.indexOf('fechaEstimada');
      if (fechaColIndex !== -1 && row.fechaEstimada) {
        const cell = newRow.getCell(fechaColIndex + 1);
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF0000' }
        };
        cell.font = { color: { argb: 'FFFFFFFF' } };
      }
    });

    // Ajustar ancho de columnas
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = Math.max(header.length + 2, 15);
    });
    worksheet.getRow(4).font = { bold: true };
    worksheet.getRow(4).alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getRow(4).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D3D3D3' }
    };

    // Guardar archivo
    const fileName = `reporte_${nombreSucursal}_${area}_${modulo}_${fecha}.xlsx`;
    const buffer = await workbook.xlsx.writeBuffer();

    // Descargar en el navegador
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return { generarExcelReporte };
}