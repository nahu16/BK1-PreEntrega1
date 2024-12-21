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
            const cart = await this.#carts.create(data);
            return cart;

        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
    async addOneProduct(cartId, productData){
        const cart = await this.#findOneById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        productData.forEach((item) => {
            const existingProductIndex = cart.products.findIndex((p) => p.product.toString() === item.product);
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += item.quantity;
            } else {
                cart.products.push({ product: item.product, quantity: item.quantity });
            }
        });
        await cart.save();
        return cart;
    }

    async updateOneById (id, data){
        try {
            const cartsFound = await this.#findOneById(id);
            const newValues = { ...cartsFound, ...data };
            cartsFound.set(newValues);
            cartsFound.save();

            return cartsFound;

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async deleteOneProduct(id, productId) {
        try {
            const cart = await this.#findOneById(id);
            const productIndex = cart.products.findIndex((item) => item.product._id.toString() === productId);

            if (productIndex < 0) {
                throw new ErrorManager("El producto no existe en el carrito", 404);
            }

            const product= cart.products[productIndex];
            if (product.quantity > 1) {
                cart.products[productIndex].quantity--;
            } else {
                cart.products.splice(productIndex, 1);
            }

            await cart.save();

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async deleteOneById(id) {
        try {
            const cart = await this.#findOneById(id);

            if (!cart) {
                throw ErrorManager.handleError(error);
            }

            await this.#carts.findByIdAndDelete(id);

            return cart;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }

    }

    async removeAllProductsById(id) {
        try {
            const cart = await this.#findOneById(id);

            if (!cart) {
                throw ErrorManager.handleError(error);
            }

            cart.products = [];
            await cart.save();

            return cart;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}