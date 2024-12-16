import ErrorManager from "./ErrorManager.js";
import ProductoModel from "../models/product.model.js";

export default class ProductManager {
    #products;

    constructor() {
        this.#products = ProductoModel;
    }

    async #findOneById (id){
        const productsFound = await this.#products.findById(id);

        if (!productsFound){
            throw new ErrorManager("Id no encontrado", 404);
        }
        return productsFound;
    }

    async getAll (params){
        try {
            const $and = [];
            if (params?.title) $and.push({ title:params.title.toString().toUpperCase().trim() });
            if (params?.code) $and.push({ code: Number(params.code).trim() });
            if (params?.category) $and.push({ category:params.category.toString().toUpperCase().trim() });
            if (params?.priceGte) $and.push({ price: { $gte: Number(params.priceGte) } });

            const filters = $and.length > 0 ? { $and } : {};

            return await this.#products.find(filters);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async getOneById (id){
        try {
            const productsFound = await this.#findOneById(id);
            return productsFound;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async insertOne (data){
        try {
            const product = await this.#products.create(data);
            return product;

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async updateOneById (id, data){
        try {
            const productsFound = await this.#findOneById(id);
            const newValues = { ...productsFound, ...data };
            productsFound.set(newValues);
            productsFound.save();

            return productsFound;

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async deleteOneById (id){
        try {
            const productsFound = await this.#findOneById(id);
            await productsFound.deleteOne();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}