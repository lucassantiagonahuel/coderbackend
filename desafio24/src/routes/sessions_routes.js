import { Router } from "express";
import passport from "passport";
import { authToken,authorization,generateToken,passportCall } from "../utils/auth.js";

const router = Router();
const PRIVATE_KEY ="coderSecret"

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    if (!req.user) {
      return res.status(400).send("Invalid credentials");
    }

    // req.session.user = {
    //   fullName: `${req.user.first_name} ${req.user.last_name}`,
    //   email: req.user.email,
    //   rol: req.user.rol,
    // };
    const access_token = generateToken(req.user);
    res.cookie("coderCookieToken",access_token,{
      maxAge:60*60*1000,
      httpOnly:true
    }).send({message:"Logged in!"});
  }
);
router.get('/current',passportCall("jwt"),authorization('admin'),(req,res)=>{
  res.send({status:"success",payload:req.user});
});

router.get("/faillogin", (req, res) => {
  res.send({ error: "Failed login" });
});

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.send({ status: "Success", message: "User registered ok" });
  }
);

router.get("/failregister", async (req, res) => {
  console.log("Failed strategy");
  res.send({ error: "Failed" });
});

router.post("/logout", async (req, res) => {
  // req.session.destroy((error) => {
  //   if (error) return res.send("La sesion no se pudo cerrar");
  //   res.redirect("/");
  // });
  res.clearCookie('coderCookieToken');
  res.clearCookie('connect.sid');
  res.redirect("/login");
});

router.get('/github', passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{});

router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}),async(req,res)=>{
  req.session.user=req.user;
  res.redirect('/');
});

export default router;
