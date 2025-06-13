import mongoose from 'mongoose';

const collectionName = 'tickets';

const objConfig_01 = {
    type: String,
    unique: true,
    required: true
};

const objConfig_02 = {
    type: String,
    required: true
};

const ticketSchema = new mongoose.Schema({
    code: objConfig_01,
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: objConfig_02,
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'completed', 'cancelled']
    }
});

export const ticketModel = mongoose.model(collectionName, ticketSchema);