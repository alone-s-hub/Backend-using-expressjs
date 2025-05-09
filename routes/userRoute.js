import express from "express";
import {
  fetch, // Fetch all users
  create, // Create a new user
  update, // Update user by ID
  deleteUser, // Delete user by ID
} from "../controller/userController.js"; // Importing the controller functions

const route = express.Router();

route.post("/create", create);
route.get("/getAllUsers", fetch);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);

export default route;
