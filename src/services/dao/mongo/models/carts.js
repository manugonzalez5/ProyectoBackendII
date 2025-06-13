import mongoose from 'mongoose';

const collectionName = 'carts';

const objConfig_01 = {
    type: String,
    unique: true,
    required: true
};

const objConfig_02 = {
    type: String,
    required: true
};

const cartsSchema = new mongoose.Schema({
    code: objConfig_01,
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