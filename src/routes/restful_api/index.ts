import Router from "koa-router"
const RESTful_route = function():any{
    const route = new Router()

    route.get("/",async function(ctx):Promise<void>{
        ctx.body = "hello"
    })

    route.post("/",async function(ctx):Promise<void>{
        ctx.body = "hello"
    })

    route.put("/:id",async function(ctx):Promise<void>{
        ctx.body = "hello"
    })

    route.delete("/:id",async function(ctx):Promise<void>{
        ctx.body = "hello"
    })

    return route
}

export default RESTful_route