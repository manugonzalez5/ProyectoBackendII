import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        default: () => Math.random().toString(36).substring(2, 10).toUpperCase()
    },
    amount: Number,
    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productos'
        },
        name: String,
        price: Number,
        quantity: Number
    }],
    purchase_datetime: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual para calcular subtotal
ticketSchema.virtual('products.subtotal').get(function () {
    return this.price * this.quantity;
});

export const ticketModelo = mongoose.model('tickets', ticketSchema);