import {createUserData, deleteUser,  getUsers,  getUsersById,  updateUser}   from "../controllers/userController.js";
import express from 'express';

const route = express.Router();

// Get all Users
route.get("/", getUsers);

// // Get PaginatedData
// route.get("/filter",pagination_fetch_Data)

// Get Users by id
route.get('/:id',getUsersById)

// TO ADD USER
route.post("/",createUserData)

// UPDATE USER
route.put('/:id',updateUser)

// DELETE USER
route.delete('/:id',deleteUser)

export default route;
