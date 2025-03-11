export const reiniciarData = (data) => {
    for (let clave in data) {
      data[clave] = null;
    }
  
    return data;
  };
  