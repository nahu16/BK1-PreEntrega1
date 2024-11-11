import { generateId } from "../utils/collectionHandler.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import paths from "../utils/paths.js";
import { convertToBool } from "../utils/converter.js";
import ErrorManager from "./ErrorManager.js";

export default class ProductManager {
    #jsonFilename;
    #products;

    constructor() {
        this.#jsonFilename = "productos.json";
    }

    async #findOneById (id){
        this.#products=await this.getAll();
        const productsFound = this.#products.find((item)=>item.id===Number(id));

        if (!productsFound){
            throw new ErrorManager("Id no encontrado", 404);
        }
        return productsFound;
    }

    async getAll (){
        try {
            this.#products=await readJsonFile(paths.files, this.#jsonFilename);
            return this.#products;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async getOneById (id){
        try {
            const productsFound = await this.#findOneById(id);
            return productsFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async insertOne (data){
        try {
            const { title, description, code, price, status, stock, category } = data;

            if (!title || !description || !code || !price || !status || !stock || !category){
                throw new ErrorManager("Faltan datos obligatorios", 400);
            }

            const product = {
                id : generateId(await this.getAll()),
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
            };
            this.#products.push(product);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);
            return product;

        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async updateOneById (id, data){
        try {
            const { title, description, code, price, status, stock, category } = data;
            const productsFound = await this.#findOneById(id);

            const product = {
                id : productsFound.id,
                title: title || productsFound.title,
                description: description || productsFound.description,
                code: code ? Number(code) : productsFound.code,
                price: price ? Number(price): productsFound.price,
                status: status ? convertToBool(status) : productsFound.status,
                stock: stock ? Number(stock) : productsFound.stock,
                category: category || productsFound.category,
            };

            const index = this.#products.findIndex((item)=>item.id===Number(id));
            this.#products[index]=product;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);
            return product;

        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async deleteOneById (id){
        try {
            await this.#findOneById(id);

            const index = this.#products.findIndex((item)=>item.id===Number(id));
            this.#products.splice(index, 1);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
}