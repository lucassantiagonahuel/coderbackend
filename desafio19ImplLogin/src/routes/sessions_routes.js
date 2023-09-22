import { Router } from "express";
import { userModel } from "../dao/models/user.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    console.log(password);
    console.log(email);
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(400).send("Incorrect credentials");
    }
    if (email == "adminCoder@coder.com" && password == "adminCod3r123") {
      req.session.user = {
        fullName: `${user.first_name} ${user.last_name}`,
        email: user.email,
        rol: "admin",
      };
    } else {
      req.session.user = {
        fullName: `${user.first_name} ${user.last_name}`,
        email: user.email,
        rol: "usuario",
      };
    }
    res.send({ status: "Success", payload: req.session.user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .send({ status: "Error", error: "Email already exists in user" });
    }
    const user = {
      first_name,
      last_name,
      email,
      age,
      password,
    };
    const response = await userModel.create(user);
    res.send({ status: "Success", message: "User registered ok" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.send("La sesion no se pudo cerrar");
    res.redirect("/");
  });
});

export default router;
