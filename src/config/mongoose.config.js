import { connect } from "mongoose";

export const connectDB = async () => {
    const URL = "mongodb+srv://nahuelanadon6:1234@cluster0.wqivu.mongodb.net/EntregaFinal";
    try {
        await connect(URL);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.log("Error al conectar con MongoDB", errpr.message );
    }
};