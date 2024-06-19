import express from "express";
const router=express.Router();


import editTeacher from "./editTeacher.js";
import list from "./list.js";
import listTeacher from "./listTeacher.js";
import listTeacherById from "./listTeacherById.js";

router.use("/edit_teacher",editTeacher);
router.use("/list",list);
router.use("/list_teacher",listTeacher);
router.use("/list_teacherById",listTeacherById);


export default router;