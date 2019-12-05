import jwt from "jsonwebtoken"
import assert from "http-assert"
import secret from '../secret';
import User from "../schema/User"

// console.log(jwt.sign("5de909b5b5b48c0fc1949fad",key))

const jwtMiddleWare = async function(ctx:any,next:any):Promise<void>{
    const userToken:any = String(ctx.headers.authorization || '').split(' ').pop()
    assert(userToken,401,"请重新登录")
    const { _id }:any = jwt.verify(userToken,secret)
    assert(_id,401,"请重新登录")
    const findId:any = await User.findById({_id})
    assert(findId,401,"请重新登录")
    await next()
}

export default jwtMiddleWare