import mongoose from "mongoose";

export const connectDb = async()=>{
        await mongoose.connect('mongodb+srv://reader7932:Imranalam123@cluster0.ozx6exi.mongodb.net/food-del').then(()=> console.log('DB connected'))
}
