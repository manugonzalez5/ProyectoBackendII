import mongoose from "mongoose";
import CartsServiceMongo from "../services/dao/mongo/carts.service.js";
import CartsDto from "../services/dto/carts.dto.js";

const cartsService = new CartsServiceMongo();

export async function getAllCarts(req, res) {
    try {
        let carts = await cartsService.getAll();
        res.send(carts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los carritos." });
    }
}

export async function saveCart(req, res) {
    try {
        const cartDto = new CartsDto(req.body);
        let result = await cartsService.save(cartDto);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo guardar el carrito." });
    }
}

export async function getCartById(req, res) {
    try {
        const cartId = req.params.id;
        let cart = await cartsService.getById(cartId);
        if (!cart) {
            return res.status(404).send({ message: "Carrito no encontrado." });
        }
        res.send(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener el carrito." });
    }
}

export async function updateCart(req, res) {
    try {
        const cartId = req.params.id;
        const cartDto = new CartsDto(req.body);
        let result = await cartsService.update(cartId, cartDto);
        if (!result) {
            return res.status(404).send({ message: "Carrito no encontrado." });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo actualizar el carrito." });
    }
}

export async function deleteCart(req, res) {
    try {
        const cartId = req.params.id;
        let result = await cartsService.delete(cartId);
        if (!result) {
            return res.status(404).send({ message: "Carrito no encontrado." });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo eliminar el carrito." });
    }
}

export async function addProductToCart(req, res) {
    try {
        const userId = req.user._id; // viene de Passport
        const courseId = req.body.courseId;

        // Buscar o crear carrito del usuario
        let cart = await cartsService.getCartByUserId(userId);
        if (!cart) {
            cart = await cartsService.createCartForUser(userId);
        }

        // Agregar producto
        const result = await cartsService.addProductToCart(cart._id, courseId);

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

export async function removeProductFromCart(req, res) {
    try {
        const cartId = req.params.id;
        const productId = req.body.productId;
        let result = await cartsService.removeProduct(cartId, productId);
        if (!result) {
            return res.status(404).send({ message: "Carrito o producto no encontrado." });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo eliminar el producto del carrito." });
    }
}

export async function createCartForUser(req, res) {
    try {
        const userId = req.user._id; // viene de Passport
        let cart = await cartsService.createCartForUser(userId);
        res.status(201).send(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo crear el carrito para el usuario." });
    }
}


