import ErrorManager from "./ErrorManager.js";
import CartModel from "../models/cart.model.js";

export default class CartManager {
    #carts;

    constructor() {
        this.#carts = CartModel;
    }

    async #findOneById (id){
        const cartsFound = await this.#carts.findById(id);

        if (!cartsFound){
            throw new ErrorManager("Id no encontrado", 404);
        }
        return cartsFound;
    }

    async getAll (params){
        try {
            const $and = [];
            if (params?.title) $and.push({ title:params.title.toString().toUpperCase().trim() });
            if (params?.code) $and.push({ code: Number(params.code).trim() });
            if (params?.category) $and.push({ category:params.category.toString().toUpperCase().trim() });

            const filters = $and.length > 0 ? { $and } : {};

            return await this.#carts.find(filters);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async getOneById (id){
        try {
            const cartsFound = await this.#findOneById(id);
            return cartsFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async insertOne (data){
        try {

            const products = data?.products?.map(((item)=>{
                return { product: Number(item.product), quantity: 1 };
            }));

            const cart = {
                id : generateId(await this.getAll()),
                products: products || [],
            };
            console.log(products);

            this.#carts.push(cart);
            return cart;

        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    addOneProduct = async (id, productId) =>{
        try {
            const cartsFound = await this.#findOneById(id);
            const productIndex = cartsFound.products.findIndex((item)=> item.product === Number(productId));

            if(productIndex >= 0){
                cartsFound.products[productIndex].quantity++;
            }else{
                cartsFound.products.push({ product: Number(productId), quantity:1 });
            }

            const index = this.#carts.findIndex((item)=> item.id === Number(id));
            this.#carts[index]= cartsFound;
            return (cartsFound);
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    };
}