import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
       await mongoose.connect(process.env.MONGODB_URI);
       console.log("connected successfully")
    }
    catch(err){
        console.log(err)
    }
}

export default connectDB