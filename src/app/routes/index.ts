import { Router } from "express";
import { AuthRoutes } from "../../modules/auth/auth.route";
import { ProductRoutes } from "../../modules/product/product.route";
import { OrderRouter } from "../../modules/order/order.route";

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
    route:OrderRouter
  }
];

moduleRoutes.forEach(route => router.use(route.path,route.route))


export default router