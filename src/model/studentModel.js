import mongoose from "mongoose";
import { Schema } from "mongoose";

const studentModel = {

  student_name: {
    type: String,
    required: true,
  },
  
  rollno: {
    type: String,
    required: true,
  },

  image: {
    type: [String],
    // data: Buffer,
    required: true,
  },
  teacher_id: {
    type: Schema.Types.ObjectId,
    ref: "teacherdata",
  },

  is_active: {
    type: String,
    default: 1,
  },
};

let student = null;

const initstudentModel = async () => {
  try {
    if (student) return student;
    student = mongoose.model("studentmodel", studentModel);
    return student;
  } catch (err) {
    console.log("student-model", err);
  }
};
export default initstudentModel;
