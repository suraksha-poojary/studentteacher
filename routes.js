import express from "express";
import registerApiHandler from "./src/controlllers/auth/apiHandler.js"
import studentApiHandler from "./src/controlllers/student/apiHandler.js"

const routes=(app)=>{
    app.use(express.json());
    app.use("/api/auth",registerApiHandler);
    app.use("/api/student",studentApiHandler);
};
export default routes;