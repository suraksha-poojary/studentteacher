import express from "express";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import initStudentModel from "../../model/studentModel.js";


router.put("/:id?", authenticate, async (req, res) => { //get method is used to listing   //? will consider id field as optional
    try{
        const studentModel=await initStudentModel();
        const teacher_id=req.user.id;
        let response;
        const student_id =req.params.id;
        const{student_name,rollno}=req.body;

        let updates={};

        const isValidId=await studentModel.findOne({
            _id:student_id,
            is_active:constants.STATE.ACTIVE,
            teacher_id:teacher_id,
        })

        if(!isValidId){
            response=RESPONSE.INVALID_DATA
            return res.json({
                code:response.code,
                message:"ID"+response.message,
            })
        }

        if(student_name && student_name !=""){
            updates.student_name=student_name;
        }

        if(rollno && rollno !=""){
            updates.rollno=rollno;
        }
        console.log(updates);

        await studentModel.findOneAndUpdate(
            {
                _id:student_id,
            },updates
        )

        return res.json(RESPONSE.SUCCESS)

    }catch(err){
            console.log("listStudent",err);
            return res.json(RESPONSE.UNKNOWN_ERROR);
    
            }
    });

export default router;