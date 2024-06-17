import mongoose from "mongoose"

const connectDB=async()=>{
    try{
        const url="mongodb://127.0.0.1:27017/internship_db"
        await mongoose.connect(url);
        // atlas
        // const url ="mongodb+srv://Suraksha:Suraksha123@atlascluster.lgtuogr.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
        //await mongoose.connect(url,{dbname:"internship_db"});
        console.log("connected to DB");
        
    }catch(err){
        console.log(err);
        console.log("error while connecting DB");
    }
}
export default connectDB;