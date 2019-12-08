import Router from "koa-router"
import User from "../../schema/User"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { secret,securityCode } from '../../secret';

interface Res {
    msg: string,
}
const userRoute = function (): any {
    const route = new Router()

    route.get("/", async function (ctx): Promise<void> {
        ctx.body = await User.find()
    })

    //注册
    route.post("/register", async function (ctx): Promise<void> {
        const { name, phone, password } = ctx.request.body
        const hasSameName = await User.findOne({ name })
        if (hasSameName !== null) {
            ctx.status = 400
            ctx.body = {
                msg: "该账号已注册"
            }
            return
        }
        const hasSamePhone = await User.findOne({ phone })
        if (hasSamePhone !== null) {
            ctx.status = 400
            ctx.body = {
                msg: "该手机号已被绑定"
            }
            return
        }
        const result = await User.create({ name, phone, password })
        ctx.status = 201
        ctx.body = result
    })

    //登录
    route.post("/passwordLogin", async function (ctx: any): Promise<void> {
        const { name, password } = ctx.request.body
        const hasUser: any = await User.findOne({ name }).select("+password")
        if (hasUser === null) {
            ctx.body = {
                msg: "该用户不存在"
            }
            ctx.status = 404
            return
        }
        const loginResult = bcrypt.compareSync(password, hasUser.password)
        if (!loginResult) {
            ctx.status = 401
            ctx.body = {
                msg: "密码错误"
            }
            return
        }
        const token: string = jwt.sign({ _id: hasUser._id }, secret)
        ctx.body = {
            msg: "登录成功",
            token,
            _id: hasUser._id
        }
    })

    //根据用户返回用户菜单
    route.get("/menuList", async function (ctx: any): Promise<void> {
        const _id: string = ctx.query.id
        const getUser: any = await User.findById({ _id })
        if (getUser !== null || getUser) {
            const userPruview: string = getUser.pruview
            const visitorsMenu = [
                {
                    name: "Home",
                    path: "/home",
                }
            ]
            const adminMenu = [
                {
                    name: "Home",
                    path: "/home",
                },
                {
                    name: "Admin",
                    path: "/admin",
                },
                {
                    name:"MyFollowing",
                    path: "/followingda"
                }
            ]
            if (userPruview === "visitors") {
                ctx.body = visitorsMenu
                return
            } else if (userPruview === "admin") {
                ctx.body = adminMenu
                return
            }
        }
        ctx.status = 404
        ctx.body = "未找到该用户请重新登录"

    })

    route.put("/changeUserPruview", async function (ctx: any): Promise<void> {
        const { operatorId, changeUserId, pruview } = ctx.request.body
        const canChange:any = await User.findById({ _id: operatorId })
        if (canChange.pruview !== "admin") {
            ctx.status = 401
            ctx.body = {
                msg: "你没有权限更改"
            }
            return
        }
        const needChangeUser:any = await User.findById({ _id: changeUserId })
        if (needChangeUser !== null || needChangeUser) {
            if (needChangeUser.pruview === pruview) {
                ctx.status = 201
                ctx.body = {
                    msg: `已经是${pruview},不能再次修改`
                }
                return
            }
            const changeRes:any = await User.findByIdAndUpdate({_id:changeUserId},{pruview})
            ctx.body = changeRes
        }
    })

    route.post("/addAdmin",async function(ctx:any):Promise<void>{
        const {name,password,phone,code} = ctx.request.body
        if(code !== securityCode){
            ctx.status = 401
            ctx.body = {
                msg:"验证失败"
            }
            return
        }
        const addRes = await User.create({name,password,phone,pruview:"admin"})
        ctx.body = `新增管理员${name}成功`
    })

    route.put("/:id", async function (ctx): Promise<void> {
        ctx.body = "hello"
    })

    route.delete("/:id", async function (ctx): Promise<void> {
        ctx.body = "hello"
    })

    return route
}

export default userRoute