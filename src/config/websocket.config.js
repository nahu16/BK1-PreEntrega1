import { Server } from "socket.io";
import ProductManager from "../managers/ProductManager.js";

const productManager = new ProductManager();

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
    });
};