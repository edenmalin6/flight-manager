import { getCollection, toObjectId } from "./dbModule.js";
const collectionName = "students";

export const getAllStudents = async () => {
  const collection = await getCollection(collectionName);
  return await collection.find().toArray();
};
export const getStudentsByGpaGreaterThan = async (gpa) => {
  if (typeof gpa !== "number" || gpa > 100 || gpa < 0) {
    throw new InvalidGpaNumber("Invalid GPA number.");
  }
  const collection = await getCollection(collectionName);
  return await collection.find({ gpa: { $gte: gpa } }).toArray();
};
export const createStudent = async ({ fullName, gpa, course }) => {
  const collection = await getCollection(collectionName);
  await collection.insertOne({ fullName, gpa, course });
  return { success: true, message: "Student created successfully!" };
};
export const updateGpa = async (studentId, gpa) => {
  if (typeof gpa !== "number" || (gpa >= 100 || gpa < 0)){
      throw new InvalidGpaNumber("Invalid GPA number.")
  }
  const collection = await getCollection(collectionName);
  const verifiedUserId = await collection.findOne({ _id: toObjectId(studentId) });
  if (!verifiedUserId) throw new InvalidStudentId("User doesn't exists.");

  await collection.updateOne(
    { _id: toObjectId(studentId) },
    { $set: { gpa } }
  );
  return { success: true, message: "Student updated successfully!" };
};

export class InvalidGpaNumber extends Error {}
export class InvalidStudentId extends Error {}
