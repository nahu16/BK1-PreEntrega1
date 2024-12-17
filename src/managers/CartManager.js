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

    async getAll (){
        try {
            return await this.#carts.find();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async getOneById (id){
        try {
            return await this.#findOneById(id);
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async insertOne (data){
        try {

            const cart = await this.#carts.create(data, quantity);
            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    addOneProduct = async (id, data) =>{
        try {
            const cartsFound = await this.#findOneById(id);
            const productIndex = await this.#carts.findOne({ _id: { $ne: id } });

            if(productIndex >= 0){
                cartsFound.products[productIndex].quantity++;
            }else{
                cartsFound.products.push({ product: Number(productId), quantity:1 });
            }

            const newCart = { ...cartsFound, ...data };
            cartsFound.set(newCart);
            cartsFound.save();

            return cartsFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    };
}