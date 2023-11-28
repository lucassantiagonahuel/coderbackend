import userService from "../service/userService.js";
import { generateToken, verifyToken } from "../utils/auth.js";
import MailingService from "../service/mailingService.js";

const emailService = new MailingService();

const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await userService.getUserByEmail(email);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const sendEmailResetPassword = async (req, res) => {
  try {
    const user = req.body;

    const token = generateToken(user);

    const response = await emailService.sendSimpleMail(user.email, token);

    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { newPassword, token } = req.body;
    const user = await verifyToken(token);
    const response = await userService.updatePassword(user, newPassword);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateRole = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await userService.getUserById(userId);
    const userRol = user.role;
    const response = await userService.updateRole(user, userRol);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default {
  getUserByEmail,
  sendEmailResetPassword,
  updatePassword,
  updateRole,
};
