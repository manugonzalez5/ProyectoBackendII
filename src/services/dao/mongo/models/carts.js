import mongoose from 'mongoose';

const collectionName = 'carts';

const cartsSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students', 
        required: true
    },
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'completed', 'cancelled']
    }
});

export const cartsModel = mongoose.model(collectionName, cartsSchema);
