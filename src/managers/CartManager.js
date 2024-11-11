import { generateId } from "../utils/collectionHandler.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import paths from "../utils/paths.js";
import ErrorManager from "./ErrorManager.js";

export default class CartManager {
    #jsonFilename;
    #carts;

    constructor() {
        this.#jsonFilename = "carts.json";
    }

    async #findOneById (id){
        this.#carts=await this.getAll();
        const cartsFound = this.#carts.find((item)=>item.id===Number(id));

        if (!cartsFound){
            throw new ErrorManager("Id no encontrado", 404);
        }
        return cartsFound;
    }

    async getAll (){
        try {
            this.#carts=await readJsonFile(paths.files, this.#jsonFilename);
            return this.#carts;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
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
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

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
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);
            return (cartsFound);
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    };
}