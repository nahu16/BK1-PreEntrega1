import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {
        type: String,
        require: [ true, " El nombre es obligatorio" ],
        upperCase: true,
        trim: true,
        minLength: [ 3, "El nombre debe ser mayor a 3 caracteres" ],
        maxLength: [ 20, "El nombre no puede tener más de 20 caracteres" ],
    },
    description:{
        type: String,
        require: [ true, " La descripción es obligatoria" ],
        upperCase: true,
        trim: true,
        maxLength: [ 40, "La descripción no puede tener más de 40 caracteres" ],
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
    status:{
        type: Boolean,
        require: [ true, " El estado es obligatorio" ],
    },
    stock:{
        type: Number,
        require: [ true, " El stock es obligatorio" ],
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

productSchema.plugin(paginate);

const Producto = model( "productos", productSchema );

export default Producto;