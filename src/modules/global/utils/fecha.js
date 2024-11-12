export const formatearFecha = (fechaIngresada) => {
    const fecha = new Date(fechaIngresada);
    const anio = fecha.getFullYear(); 
    let mes = (fecha.getMonth() + 1).toString();
    let dia = fecha.getDate().toString();

    if(dia.length === 1){
        dia = dia.split('')
        dia.unshift('0')
        dia = dia.join('');
    }

    if(mes.length === 1){
        mes = mes.split('')
        mes.unshift('0')
        mes = mes.join('');
    }

    return `${anio}-${mes}-${dia}`;
}