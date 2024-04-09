import express from "express";
import dotenv from "dotenv";
dotenv.config();
import {
  getAllStudents,
  getStudentsByGpaGreaterThan,
  createStudent,
  updateGpa,
  InvalidGpaNumber,
  InvalidStudentId,
} from "./modules/studentsModule.js";
const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());

//get students and also sort student by specific gpa
app.get("/api/student", async (req, res) => {
  let students;
  try {
    if (req.query.gpa) {
      students = await getStudentsByGpaGreaterThan(+req.query.gpa);
    } else {
      students = await getAllStudents();
    }
  } catch (error) {
    if (error instanceof InvalidGpaNumber) {
      return res.status(400).send(error.message);
    }
    console.error(error.message);
    return res.status(500).send(error.message);
  }
  return res.send(students);
});
//create new student
app.post("/api/student", async (req, res) => {
  const { fullName, gpa, course } = req.body;
  let newStudent;
  try {
    newStudent = await createStudent({fullName, gpa, course});
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(error.message);
  }
  return res.send(newStudent);
});
//update student's gpa by id
app.put("/api/student/:studentId", async (req, res) => {
  const { gpa } = req.body;
  let updatedStudent;
  try {
    updatedStudent = await updateGpa(req.params.studentId, gpa);
  } catch (error) {
    if (error instanceof InvalidStudentId) {
      return res.status(400).send(error.message);
    }
    if (error instanceof InvalidGpaNumber) {
        return res.status(400).send(error.message);
      }
    console.error(error.message);
    return res.status(500).send(error.message);
  }
  return res.send(updatedStudent);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
