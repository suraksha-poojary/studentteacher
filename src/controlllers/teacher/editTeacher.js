import express from "express";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import initTeacherModel from "../../model/teacherModel.js";


router.put("/:id?", async (req, res) => { //get method is used to listing   //? will consider id field as optional
    try{
        const teacherModel=await initTeacherModel();
        let response;
        const teacher_id =req.params.id;
        const{teacher_name,email,phone}=req.body;

        let updates={};

        const isValidId=await teacherModel.findOne({
            _id:teacher_id,
            is_active:constants.STATE.ACTIVE,
        })

        if(!isValidId){
            response=RESPONSE.INVALID_DATA
            return res.json({
                code:response.code,
                message:"ID"+response.message,
            })
        }

        if(teacher_name && teacher_name !=""){
            updates.teacher_name=teacher_name;
        }

        if(email && email !=""){
            updates.email=email;
        }
        if(phone && phone !=""){
            updates.phone=phone;
        }

        console.log(updates);

        await teacherModel.findOneAndUpdate(
            {
                _id:teacher_id,
            },updates
        )

        return res.json(RESPONSE.SUCCESS)

    }catch(err){
            console.log("listTeacher",err);
            return res.json(RESPONSE.UNKNOWN_ERROR);
    
            }
    });

export default router;