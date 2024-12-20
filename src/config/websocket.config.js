import { Server } from "socket.io";
import ProductManager from "../managers/ProductManager.js";
import CartManager from "../managers/CartManager.js";
import { mongoose } from "mongoose";

const productManager = new ProductManager();
const cartManager = new CartManager();

export const config = (httpServer) => {
    const socketServer = new Server(httpServer);

    socketServer.on("connection", async (socket) => {
        const products = await productManager.getAll();
        socketServer.emit("products-list", { products: products.docs });

        socket.on("insert-product", async (data)=>{
            try {
                await productManager.insertOne(data);
                const products = await productManager.getAll();
                socketServer.emit("products-list", { products: products.docs });
            } catch (error) {
                socketServer.emit("error-message", { message: error.message });
            }
        });
        socket.on("delete-product", async (data)=>{
            try {
                await productManager.deleteOneById(data.id);

                const products = await productManager.getAll();
                socketServer.emit("products-list", { products: products.docs });
            } catch (error) {
                socketServer.emit("error-message", { message: error.message });
            }
        });
        socket.on("delete-cart", async (data)=>{
            try {
                await cartManager.deleteOneById(data.id);
                socketServer.emit("products-cart", { carts: await cartManager.getAll() });
            } catch (error) {
                socketServer.emit("error-message", { message: error.message });
            }
        });
        socket.on("add-cart", async (data)=>{
            try {
                await cartManager.insertOne(data);
                socketServer.emit("products-cart", { carts: await cartManager.getAll() });
            } catch (error) {
                socketServer.emit("error-message", { message: error.message });
            }
        });
        socket.on("cart", async (data)=>{
            try {
                const { cartId, products }= data;
                const idCarro = mongoose.Types.ObjectId(cartId);

                await cartManager.addOneProduct(idCarro, products);
                socketServer.emit("products-cart", { carts: await cartManager.getAll() });
            } catch (error) {
                socketServer.emit("error-message", { message: error.message });
            }
        });
    });
};