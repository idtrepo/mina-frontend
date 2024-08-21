export const eliminarNulos = (data) => {
    for (let clave in data) {
        if (!data[clave]) delete data[clave];
    }

    return data;
}