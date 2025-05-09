import User from "../Model/userModel.js";

export const create = async (req, res) => {
  // Create a new user//post method
  try {
    const userData = new User(req.body);
    const { email } = userData;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const savedUser = await userData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fetch = async (req, res) => {
  // Fetch all users//get method
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const update = async (req, res) => {
  // Update user by ID//put method
  try {
    const id = req.params.id;
    const userExist = await User.findById({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  // Delete user by ID//delete method
  try {
    const id = req.params.id;
    const userExist = await User.findById({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
