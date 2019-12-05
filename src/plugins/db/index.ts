import mongoose from "mongoose"

mongoose.connect("mongodb://127.0.0.1/server",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export default mongoose