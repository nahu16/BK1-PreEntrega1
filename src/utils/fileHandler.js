import fs from "fs";
import path from "path";

const validateFilePathAndName = (filepath, filename) => {
    if (!filepath) throw new Error("La ruta del archivo no fue proporcionada");
    if (!filename) throw new Error("El nombre del archivo no fue proporcionado");
};

export const readJsonFile = async (filepath, filename) => {
    validateFilePathAndName(filepath, filename);
    try {
        const content = await fs.promises.readFile(path.join(filepath, filename), "utf-8");
        return JSON.parse(content|| "[]");
    } catch (error) {
        throw new Error(`Error al leer el archivo ${filename}`);
    }
};

export const writeJsonFile = async (filepath, filename, content) => {
    validateFilePathAndName(filepath, filename);

    if (!content) throw new Error("El contenido no fue proporcionado");

    try {
        await fs.promises.writeFile(path.join(filepath, filename), JSON.stringify(content, null, "\t"), "utf-8");
    } catch (error) {
        throw new Error(`Error al escribir en el archivo ${filename}`);
    }
};