import { cartsService } from "../services/service";
import CartsDto from "../services/dto/carts.dto.js";

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
        const cartDto = new CartsDto(req.body); // Antes paso por el DTO y moldeo la info
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
        const cartDto = new CartsDto(req.body); // Antes paso por el DTO y moldeo la info
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
        const cartId = req.params.id;
        const productId = req.body.productId; // Asumiendo que el ID del producto viene en el cuerpo de la solicitud
        let result = await cartsService.addProduct(cartId, productId);
        if (!result) {
            return res.status(404).send({ message: "Carrito o producto no encontrado." });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo agregar el producto al carrito." });
    }
}

export async function removeProductFromCart(req, res) {
    try {
        const cartId = req.params.id;
        const productId = req.body.productId; // Asumiendo que el ID del producto viene en el cuerpo de la solicitud
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



