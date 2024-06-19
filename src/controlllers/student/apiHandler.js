import express from "express";
const router=express.Router();


import addStudent from "./addStudent.js";
import editStudent from "./editStudent.js";
import deleteStudent from "./deleteStudent.js";
import list from "./list.js";
import listStudent from "./listStudent.js";
import listStudentById from "./listStudentById.js";

router.use("/add_student",addStudent);
router.use("/edit_student",editStudent);
router.use("/delete_student",deleteStudent);
router.use("/list",list);
router.use("/list_student",listStudent);
router.use("/list_studentById",listStudentById);


export default router;