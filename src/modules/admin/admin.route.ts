import express  from 'express';
import { AdminController } from './admin.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { OrderController } from '../order/order.controller';

const router = express.Router()

// get all the order info 
router.get('/all-order',
    auth(USER_ROLE.admin),
    OrderController.getAllOrder)


router.get('/',AdminController.getAllStores)

router.patch('/:id',auth(USER_ROLE.admin),AdminController.approveStore)

router.get(
  '/',
  auth(USER_ROLE.admin),
  AdminController.getAllUsers,
);


router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  AdminController.deleteUser,
);

export const AdminRoutes = router