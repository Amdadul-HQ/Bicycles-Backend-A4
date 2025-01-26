import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../app/middleware/validateRequest';
import { orderSchema } from './order.validation';

const router = express.Router();

// Order place
router.post('/place-order',
    auth(USER_ROLE.customer),
    validateRequest(orderSchema),
    OrderController.createOrder);

// get all the order info 
router.get('/',
    // auth(USER_ROLE.admin),
    OrderController.getAllOrder)

//get single order
router.get('/:orderId',OrderController.getSingleOrder);

// get user orders
router.get('/user/order',auth(USER_ROLE.customer,USER_ROLE.admin),OrderController.getUserOrder);

// Order Update
// router.patch('/user/:orderId',auth(USER_ROLE.customer),OrderController.)

// delete order
router.delete('/user/:orderId',
    auth(USER_ROLE.customer),
    OrderController.deleteOrder)

// Order Revenue
router.get('/revenue',OrderController.getRevenue)



export const OrderRouter = router