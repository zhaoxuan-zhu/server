import Router from "koa-router"
import User from "../../schema/User"
import bcrypt from 'bcrypt'

interface Res{
    msg:string,
}
const userRoute = function():any{
    const route = new Router()

    route.get("/",async function(ctx):Promise<void>{
        ctx.body = "hello"
    })

    //注册
    route.post("/register",async function(ctx):Promise<void>{
        const {name,phone,password} = ctx.request.body
        const hasSameName = await User.findOne({name})
        if(hasSameName !== null){
            ctx.status = 400
            ctx.body = {
                msg:"该账号已注册"
            }
            return
        }
        const hasSamePhone = await User.findOne({phone})
        if(hasSamePhone !== null){
            ctx.status = 400
            ctx.body={
                msg:"该手机号已被绑定"
            }
            return
        }
        const result = await User.create({name,phone,password})
        ctx.status = 201
        ctx.body = result
    })

    //登录
    route.post("/passwordLogin",async function(ctx:any):Promise<void>{
        const {name,password} = ctx.request.body
        const hasUser:any = await User.findOne({name}).select("+password")
        if(hasUser === null){
            ctx.status = 404
            ctx.body = {
                msg:"该用户不存在"
            }
            return
        }
        const loginResult = bcrypt.compareSync(password,hasUser.password)
        if(!loginResult){
            ctx.status = 401
            ctx.body = {
                msg:"密码错误"
            }
            return
        }
        ctx.body = {
            msg:"登录成功",
            token:112212121,
            _id:hasUser._id
        }
    })

    route.put("/:id",async function(ctx):Promise<void>{
        ctx.body = "hello"
    })

    route.delete("/:id",async function(ctx):Promise<void>{
        ctx.body = "hello"
    })

    return route
}

export default userRoute