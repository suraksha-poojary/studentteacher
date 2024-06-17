import express from "express";
const router=express.Router();
import initTeacherModel from "../../model/teacherModel.js";

import { RESPONSE } from "../../config/global.js";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import constants from "../../config/constants.js";

router.post("/",async(req,res)=>{
    try{

    const teacherModel = await initTeacherModel()
    const{email,password}=req.body;
    let response;

    
    if(!email || email ==""){
        response = RESPONSE.MANDATORY_PARAMS;
        console.log("response");
       return res.json({
            code:response.code,
            message:"email"+response.message,

        })
    }
    
    if(! password||  password==""){
        response = RESPONSE.MANDATORY_PARAMS;
        console.log("response");
       return res.json({
            code:response.code,
            message:"password"+response.message,

        })
    }
    
    
   
// console.log(isexistingPhone);


const data= await teacherModel.findOne({
    is_active:constants.STATE.ACTIVE,
    email:email,
}
)
if(data && (await bcrypt.compare(password,data.password))){
    const token=jwt.sign({
        id:data._id,
        name:data.teacher_name,
    },
process.env.TOKENKEY
)

    response=RESPONSE.SUCCESS;
    return res.json({
        code:response.code,
        message:response.message,
        data:token,

    })


}else{
    response=RESPONSE.INVALID_DATA;
    return res.json({
        code:response.code,
        message:"login credential"+response.message,

    })
}



    } catch(err){
        console.log(err);
        return res.json(RESPONSE.UNKNOWN_ERROR);
    }
});
export default router;