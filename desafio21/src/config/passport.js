import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import { userModel } from "../dao/models/user.js";
import { createHash, isValidPassword } from "../utils/utils.js";

const LocalStrategy = local.Strategy;
const initializatePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          let user = await userModel.findOne({ email: username });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };

          let result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al obtener el usuario" + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            console.log("User doesn't exist");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            return done(null, false);
          }
          if (
            username == "adminCoder@coder.com" &&
            password == "adminCod3r123"
          ) {
            user.rol = "admin";
          } else {
            user.rol = "usuario";
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.8b48a2451448d87d",
        clientSecret: "22733963042ac60a7520dec6a3633b3e7e06f71d",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken,refreshToken,profile,done) => {
        try {
          console.log(profile);
          let user = await userModel.findOne({email:profile._json.email});
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name:'',
              age:29,
              email:profile._json.email,
              password:''
            }
            let result=await userModel.create(newUser);
            done(null,result);
          } else {
            done(null,user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializatePassport;
