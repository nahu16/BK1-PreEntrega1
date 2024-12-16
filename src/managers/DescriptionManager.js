import ErrorManager from "./ErrorManager.js";
import ProductoModel from "../models/product.model.js";

export default class DescriptionManager {
    #descriptions;

    constructor() {
        this.#descriptions = ProductoModel;
    }

    async #findOneById (id){
        const descriptionsFound = await this.#descriptions.findById(id);

        if (!descriptionsFound){
            throw new ErrorManager("Id no encontrado", 404);
        }
        return descriptionsFound;
    }

    async getAll (params){
        try {
            const $and = [];
            if (params?.title) $and.push({ title:params.title.toString().toUpperCase().trim() });
            if (params?.code) $and.push({ code: Number(params.code).trim() });
            if (params?.category) $and.push({ category:params.category.toString().toUpperCase().trim() });
            if (params?.priceGte) $and.push({ price: { $gte: Number(params.priceGte) } });

            const filters = $and.length > 0 ? { $and } : {};

            return await this.#descriptions.find(filters);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async getOneById (id){
        try {
            const descriptionsFound = await this.#findOneById(id);
            return descriptionsFound;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async insertOne (data){
        try {
            const description = await this.#descriptions.create(data);
            return description;

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async updateOneById (id, data){
        try {
            const descriptionsFound = await this.#findOneById(id);
            const newValues = { ...descriptionsFound, ...data };
            descriptionsFound.set(newValues);
            descriptionsFound.save();

            return descriptionsFound;

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async deleteOneById (id){
        try {
            const descriptionsFound = await this.#findOneById(id);
            await descriptionsFound.deleteOne();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}