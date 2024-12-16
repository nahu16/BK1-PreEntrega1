import { Schema, model } from "mongoose";
import { generateCode } from "../utils/collectionCode.js";

const cartSchema = new Schema({
    orderNumber:{
        type: Number,
        unique: true,
    },
    title: {
        type: String,
    },
    code:{
        type: Number,
        require: [ true, " El código es obligatorio" ],
        unique: true,
        min: [ 10000, "EL código debe tener al menos 5 caracteres" ],
    },
    price:{
        type: Number,
        require: [ true, " El precio es obligatorio" ],
        min: [ 1, "El precio no puede ser negativo" ],
    },
    category:{
        type: String,
        require: [ true, " La categoria es obligatoria" ],
        upperCase: true,
        trim: true,
        maxLength: [ 20, "La categoria no puede tener más de 20 caracteres" ],
    },
}, {
    timestamps:true,
    versionKey:false,
});

cartSchema.pre("save", function (next) {
    if (this.isNew) {
        this.orderNumber = generateCode(this.constructor.collection.name);
    }
    next();
});

const Carro = model( "carritoDeCompras", cartSchema );

export default Carro;