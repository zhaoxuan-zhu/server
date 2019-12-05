import path from "path"
import inflection from "inflection"

const setModelMiddleWare = async function (ctx: any, next: any): Promise<void> {
    const resourceClassify:string = inflection.classify(ctx.params.resource)
    if(resourceClassify === "User"){
        ctx.status = 404
        ctx.body = {
            msg:"Not Found"
        }
        return
    }
    try {
        ctx.Model = require(path.resolve(`${__dirname}/../schema/${resourceClassify}`))
        await next()
    } catch (err) {
        ctx.status = 404
        ctx.body = {
            msg:"Not Found"
        }
    }
}

export default setModelMiddleWare