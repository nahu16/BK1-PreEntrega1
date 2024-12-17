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
            if (params?.title) $and.push({ title: { $regex: params.title, $options: "i" } });
            const filters = $and.length>0 ? { $and } : {};

            const sort = {
                asc: { title: 1 },
                desc: { title: -1 },
            };

            const paginationOptions={
                limit: params?.limit || 10,
                page: params?.page || 1,
                sort: sort[params?.sort] || {},
                lean: true,
            };
            return await this.#products.paginate(filters, paginationOptions);
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