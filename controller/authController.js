const jwt = require("jsonwebtoken");
const {
  matchPassword,
  hashPassword,
  userModel,
} = require("../model/authModel.js");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json("Butunlicha toldirish shart");
    }

    const user = await userModel.findOne({ email });
    if (user) return res.status(409).json("Already Register please login");

    const hashedPassword = await hashPassword(password);

    const new_user = new userModel({ name, email, password: hashedPassword });
    await new_user.save();

    const token = jwt.sign({ id: new_user._id }, "group33", {
      expiresIn: "3d",
    });
    res.status(201).json({ user: new_user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Serverda xato bor" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(404).send({ message: "Invalid email or login" });

    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(404).send({ message: "Email is not Register" });

    const match = await matchPassword(password, user.password);
    if (!match) return res.status(200).send({ message: "Invalid Password" });

    const token = await jwt.sign({ _id: user._id }, "group33", {
      expiresIn: "1d",
    });
    res.status(200).send({message: "login successfully",user,token});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in login", error });
  }
};

module.exports = { registerController, loginController };
