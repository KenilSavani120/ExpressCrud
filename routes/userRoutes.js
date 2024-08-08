import {createUserData, deleteUserData, fetchData, getStudentsByID, pagination_fetch_Data, updateUserData}   from "../controllers/userController.js";
import express from 'express';

const route = express.Router();

// Get all Users
route.get("/", getUsers);

// // Get PaginatedData
// route.get("/filter",pagination_fetch_Data)

// Get Users by id
route.get('./:id',getStudentsByID)

// TO ADD USER
route.post("/",createUserData)

// UPDATE USER
route.put('/:id',updateUser)

// DELETE USER
route.delete('/:id',deleteUser)

export default route;
