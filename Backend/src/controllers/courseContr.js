import cloudinaryUpload from "../config/cloudinary.js"
import Course from "../models/courseModel.js"
import Lecture from "../models/lecture.js"
import User from "../models/userModel.js"

export const createCourse=async(req,res)=>{
    try {
        
   
    const userId=req.userId
    if(!userId){
        return res.status(401).json({message:`un autorized Register to perform this action`})
    }
  const {title,category,description,level}=req.body
  if(!title || !category ||! description || !level){
   return res.status(400).json({message:"all inputs must be filled to create course"})
  }
 let thumbnail
 if(req.file){
    thumbnail=await cloudinaryUpload(req.file.path)
 }
  
  const createCourse=await Course.create({
    title,
    category,
    creater:userId,
    description,
    level,
    thumbnail
  })
  await createCourse.save()
    res.status(201).json(createCourse)
     } catch (error) {
        res.status(500).json({message:`error in courseCreate contr${error}`})
    }
}

export const getCourses=async(req,res)=>{
    try {
        const findAllCourses=await Course.find().populate("lectures")
        res.status(200).json(findAllCourses)
    } catch (error) {
         res.status(500).json({message:`error in findAllCourses contr${error}`})
    }
}

export const getUserCourses=async(req,res)=>{
    try {
     const userId=req.userId
     if(!userId){
        return res.status(401).json({message:`un autorized Register to perform this action`})
    }

    const findUserCourses=await Course.find({creater:userId})
    res.status(200).json(findUserCourses)

     } catch (error) {
        res.status(500).json({message:`error in getUserCourses contr${error}`})
    }

}


export const getCourseById=async(req,res)=>{
   try{
   
    const {courseId}=req.params

    const findCourse=await Course.findById(courseId).populate("lectures").populate("creater","fullName");
    res.status(200).json(findCourse)
  } catch (error) {
        res.status(500).json({message:`error in findCourseById contr${error}`})
    }
}

export const updateCourse=async(req,res)=>{
    try{
      const userId=req.userId
      const {courseId}=req.params
    if(!userId){
        return res.status(401).json({message:`un autorized Register to perform this action`})
    }
     let thumbnail
 if(req.file){
    thumbnail=await cloudinaryUpload(req.file.path)
 }
  const {title,category,description,level}=req.body
  const updateCourse=await Course.findByIdAndUpdate(courseId,{
    title,
    category,
    creater:userId,
    description,
    level,
    thumbnail
  },{new:true})
    res.status(201).json(updateCourse)
     } catch (error) {
        res.status(500).json({message:`error in updateCourse contr${error}`})
    }
}

export const removeCourse=async(req,res)=>{
    try {
        
    const {courseId}=req.params
    const removeCourse=await Course.findByIdAndDelete(courseId)
    res.status(200).json(removeCourse)
 } catch (error) {
        res.status(500).json({message:`error in removeCourse contr${error}`})
    }
}

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "Please fill details" });
    }

    let lectureUrl = null;
    if (req.file) {
      lectureUrl = await cloudinaryUpload(req.file.path);
    }

    const newLecture = await Lecture.create({
      lectureTitle,
      lectureUrl,
    });

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.lectures.push(newLecture._id);
    await course.populate("lectures");
    await course.save();

    return res.status(201).json({
      message: "Lecture created successfully",
      lecture: newLecture,
      course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error in createLecture controller: ${error}` });
  }
};

export const getLecture = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Lectures fetched successfully",
      course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error in getLecture controller: ${error}` });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    if (!courseId || !lectureId) {
      return res.status(400).json({ message: "Please provide both courseId and lectureId" });
    }

    const removedLecture = await Lecture.findByIdAndDelete(lectureId);

    if (!removedLecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

  
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { lectures: lectureId } },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Lecture successfully removed",
      removedLecture,
      updatedCourse
    });
  } catch (error) {
    return res.status(500).json({ message: `Error in removeLecture controller: ${error.message}` });
  }
};


export const enrolledCourse = async (req, res) => {
  const userId = req.userId; 
  const { courseId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.enrolledCoures.includes(courseId)) {
      user.enrolledCoures.push(courseId);
      await user.save();
    }

    const course = await Course.findById(courseId).populate("lectures");
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
    }

    return res.status(201).json({ message: "Enrolled successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error in enrolledCourse controller: ${error.message}` });
  }
};

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ message: "Please provide a search input" });
    }

    // Search courses by title (case-insensitive regex)
    const findAi = await Course.find({
      $or: [
        { title: { $regex: input, $options: "i" } },
        { category: { $regex: input, $options: "i" } }, 
        { description: { $regex: input, $options: "i" }},
        { level:  {$regex: input, $options:"i"}} 
      ]
    });

    if (!findAi.length) {
      return res.status(404).json({ message: "No courses found" });
    }

    return res.status(200).json({ results: findAi });

  } catch (error) {
    console.error("Error in searchWithAi:", error);
    return res.status(500).json({ message: "Server error, please try again" });
  }
};
