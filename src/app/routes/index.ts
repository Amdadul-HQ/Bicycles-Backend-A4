import { Router } from "express";
import { AuthRoutes } from "../../modules/auth/auth.route";
import { ProductRoutes } from "../../modules/product/product.route";
import { OrderRouter } from "../../modules/order/order.route";
import { UserRoutes } from "../../modules/user/user.route";
import { StoreRoutes } from "../../modules/store/store.route";
import { AdminRoutes } from "../../modules/admin/admin.route";

const router = Router();


const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path:'/products',
    route:ProductRoutes
  },
  {
    path:'/orders',
    route:OrderRouter,
  },
  {
    path:'/users',
    route:UserRoutes,
  },
  {
    path:'/store',
    route:StoreRoutes
  },
  {
    path:'/admin',
    route:AdminRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path,route.route))


export default router