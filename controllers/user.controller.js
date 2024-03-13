import registrationSchema from "../validations/user.validate.js";
import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import loginSchema from "../validations/login.validate.js";
export const register = async (req, res) => {
  try {
    // validate the request body using zod
    const validatedData = registrationSchema.parse(req.body);

    const { name, email, role, password } = validatedData;

    // check the user already exists in the database or not
    const existingUser = await User.findOne({ email: email }).lean().exec();

    if (existingUser) {
      return res.status("400").json({
        success: false,
        message: "User Already Exists",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save the user to the database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SCRECT,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.log(`Failed while Registering the user Error :: ${error}`);
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    // zod validation
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = req.body;

    // check for the use in the database
    const user = await User.findOne({
      email,
    })
      .lean()
      .exec();

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // verify the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    // generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SCRECT,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "User Logged in Successfully",
      token,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};
