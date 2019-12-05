import Router from "koa-router"
import RESTful_route from './restful_api'
import userRoute from './user'

const restful_route:any = RESTful_route()
const user_route:any = userRoute()

import setModelMiddleWare from "../middleWare/setModelMiddleWare"
import jwtMiddleWare from '../middleWare/jwtMiddleWare';

const router:any = new Router()

router.use("/api/curd/:resource",jwtMiddleWare,setModelMiddleWare,restful_route.routes(),restful_route.allowedMethods())
router.use("/user",user_route.routes(),user_route.allowedMethods())

export default router