import expres from "express"
import { authUser } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import { createCourse, createLecture, enrolledCourse, getCourseById, getCourses, getLecture, getUserCourses, removeCourse, removeLecture, searchWithAi, updateCourse } from "../controllers/courseContr.js";
const courseRouter=expres.Router()

courseRouter.post("/create",authUser,upload.single("thumbnail"),createCourse)
courseRouter.get("/getcourses",getCourses)
courseRouter.get("/usercourses",authUser,getUserCourses)
courseRouter.get("/getcourse/:courseId",getCourseById)
courseRouter.post("/updatecourse/:courseId",authUser,upload.single("thumbnail"),updateCourse)
courseRouter.delete("/removecourse/:courseId",authUser,removeCourse)

courseRouter.post("/createlecture/:courseId",upload.single("lectureUrl"),createLecture)
courseRouter.get("/getlecture/:courseId",getLecture)
courseRouter.delete("/removelecture/:courseId/:lectureId",removeLecture)

courseRouter.post("/enroll/:courseId",authUser,enrolledCourse)
courseRouter.post("/searchai",searchWithAi)


export default courseRouter;