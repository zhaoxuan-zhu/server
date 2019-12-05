import mongoose from "../../plugins/db"
import bcrypt from 'bcrypt'

const newSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String },
    email: { type: String , default:""},
    password: {
        type: String,
        set(val: String) {
            return bcrypt.hashSync(val, 10)
        },
        select: false
    },
    createTime: { type: Date, default: Date.now },
    icon: { type: String, default: "http://1t.click/btWU" }
})

export default mongoose.model("User",newSchema)