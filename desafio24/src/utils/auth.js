import jwt from "jsonwebtoken";
import passport from "passport";

const PRIVATE_KEY = "coderSecret";

export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
  return token;
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "Not authenticated" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) {
      return res.status(403).send({ error: "Not authorized" });
    }
    req.user = credentials.user;
    next();
  });
};

export const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["coderCookieToken"]
  }
  return token;
}

export const passportCall = (strategy) =>{
  return async (req,res,next) => {
    passport.authenticate(strategy, function(err, user, info){
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({error:info.messages?info.messages:info.toString()});
      }
      req.user = user;
      next();
    })(req,res,next);
  }
}

export const authorization = (role) =>{
  return async (req,res,next) =>{
    if(!req.user) return res.status(401).send({error:"Unauthorized"});
    if(req.user.user.role != role) return res.status(403).send({error:"No permissions"});
    next()
  }
}
