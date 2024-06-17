import express from "express";
const router = express.Router();
import initTeacherModel from "../../model/teacherModel.js";
import routes from "../../../routes.js";
import { RESPONSE } from "../../config/global.js";
import validator from "validator";
import bcrypt from "bcrypt";
import constants from "../../config/constants.js";

router.post("/", async (req, res) => {
  try {
    const teacherModel = await initTeacherModel();
    const { teacher_name, email, phone, password } = req.body;
    let response;

    if (!teacher_name || teacher_name == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      console.log("response");
      return res.json({
        code: response.code,
        message: "teacher name" + response.message,
      });
    }
    if (!email || email == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      console.log("response");
      return res.json({
        code: response.code,
        message: "email" + response.message,
      });
    }
    if (!phone || phone == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      console.log("response");
      return res.json({
        code: response.code,
        message: "phone" + response.message,
      });
    }

    if (!password || password == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      console.log("response");
      return res.json({
        code: response.code,
        message: "password" + response.message,
      });
    }
    const isValidEmail = validator.isEmail(email);
    if (isValidEmail == false) {
      response = RESPONSE.INVALID_DATA;
      return res.json({
        code: response.code,
        message: "email" + response.message,
      });
    }
    const isValidPhone =
      validator.isMobilePhone(phone) && phone.toString().length === 10;
    if (isValidPhone == false) {
      response = RESPONSE.INVALID_DATA;
      return res.json({
        code: response.code,
        message: "phone" + response.message,
      });
    }
    const isexistingPhone = await teacherModel.find({
      is_active: constants.STATE.ACTIVE,
      phone: phone,
    });

    // console.log(isexistingPhone);

    if (isexistingPhone.length > 0) {
      response = RESPONSE.ALREADY_EXISTS;
      return res.json({
        code: response.code,
        message: "phone" + response.message,
      });
    }
    const isexistingemail = await teacherModel.find({
      is_active: constants.STATE.ACTIVE,
      email: email,
    });

    if (isexistingemail.length > 0) {
      response = RESPONSE.ALREADY_EXISTS;
      return res.json({
        code: response.code,
        message: "email" + response.message,
      });
    }
    const encryptedPassword = await bcrypt.hash(password, constants.HASH_ROUND);
    //    console.log(encryptedPassword);
    await teacherModel.create({
      teacher_name: teacher_name,
      phone: phone,
      email: email,
      password: encryptedPassword,
    });

    return res.json(RESPONSE.SUCCESS);
  } catch (err) {
    console.log(err);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});
export default router;
