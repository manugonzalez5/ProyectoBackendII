import express from 'express';
import { addProductToCart } from '../controllers/carts.controller.js';
import { passportCall, authorization } from '../utils.js'; 


const router = express.Router();

router.post('/add', passportCall('jwt'), authorization('user'), addProductToCart);

export default router;
