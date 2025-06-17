import { cartsModel } from "./models/carts.js";

export default class CartsServiceMongo {
    constructor() {
        console.log("Working carts with Database persistence in mongodb");
    }

    getAll = async () => {
        let carts = await cartsModel.find();
        return carts.map(cart => cart.toObject());
    }

    save = async (cart) => {
        let result = await cartsModel.create(cart);
        return result.toObject();
    }

    update = async (filter, value) => {
        console.log("Update cart with filter and value:");
        console.log(filter);
        console.log(value);
        let result = await cartsModel.updateOne(filter, value);
        return result.modifiedCount > 0;
    }

    getById = async (id) => {
        let cart = await cartsModel.findById(id);
        return cart ? cart.toObject() : null;
    }

    delete = async (id) => {
        let result = await cartsModel.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }

    createCartForUser = async (userId) => {
        const newCart = new cartsModel({
            user: userId,
            products: [],
            status: 'active',
            code: new mongoose.Types.ObjectId().toString()
        });

        await newCart.save();
        return newCart.toObject();
    }

    getCartByUserId = async (userId) => {
        const cart = await cartsModel.findOne({ user: userId });
        return cart ? cart.toObject() : null;
    }

    addProduct = async (cartId, productId) => {
        const cart = await cartsModel.findById(cartId);
        if (!cart) return null;

        cart.products.push(productId);
        await cart.save();
        return cart.toObject();
    }

    removeProduct = async (cartId, productId) => {
        const cart = await cartsModel.findById(cartId);
        if (!cart) return null;

        cart.products = cart.products.filter(p => p.toString() !== productId);
        await cart.save();
        return cart.toObject();
    }
}
