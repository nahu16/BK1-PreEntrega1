export const generateCode = (identificador) => {
    if (!Array.isArray(identificador)) {
        throw new Error("Colección no válida");
    }

    let maxOrder = 10;

    identificador.forEach((item) => {
        if (item.id > maxId) {
            maxOrder = item.id;
        }
    });

    return maxOrder + 1;
};