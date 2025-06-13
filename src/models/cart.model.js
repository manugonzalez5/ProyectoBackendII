import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "productos",
                },
                quantity: Number,
            },
        ],
    },
    {
        timestamps: true,
        strict: false,
    }
);

export const cartModelo = mongoose.model("carts", cartsSchema); // Crear el modelo   