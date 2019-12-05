import Koa from "koa"
import Router from "koa-router"
import bodyparser from "koa-bodyparser"
import logger from "koa-logger"
import cors from "@koa/cors"

const app:any = new Koa()
app.use(bodyparser())
app.use(logger())
app.use(cors())

// app.set("secret","zhuzhaoxuanniubi")

import router from "./routes"
app.use(router.routes(),router.allowedMethods())


const port:number = 3000
app.listen(port,()=>{
    console.log(`server is runnig on ${port}!`)
})