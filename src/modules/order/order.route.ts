import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Order place
router.post('/place-order',auth(USER_ROLE.customer),OrderController.createOrder);

// Order Revenue
router.get('/revenue',OrderController.getRevenue)



export const OrderRouter = router