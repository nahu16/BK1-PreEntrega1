import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "productos",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            _id: false,
        },
    ],
}, {
    timestamps:true,
    versionKey:false,
});

const Carro = model( "carritoDeCompras", cartSchema );

export default Carro;