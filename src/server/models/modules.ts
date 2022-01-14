import Joi from 'joi'
import express, {Request, Response, NextFunction} from 'express';
interface AuthRequest extends Request {
  user?: string;
}
const jwt = require('jsonwebtoken')

export let joiShemaReg = () =>{
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(45).required(),
        email: Joi.string().min(5).max(45).email().required(),
        password: Joi.string().min(5).max(45).required(),
      })
      return schema

}

export let joiShemaLog = () =>{
    const schema = Joi.object({
        email: Joi.string().min(5).max(45).email().required(),
        password: Joi.string().min(5).max(45).required(),
      })
      return schema
}

// export let authenticateToken = (req: AuthRequest, res:Response, next:NextFunction) => {

// const authHeader: any = req.headers.authorization || req.headers.Authorization;
// if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
// const token = authHeader.split(' ')[1];
// jwt.verify(
//     token,
//     process.env.ACCESS_TOKEN_SECRET,
//     (err: any, user: any) => {
//         if (err) return res.sendStatus(403); //invalid token
//         req.user = user;
//         next();
//     }
// );

// }

export let authenticateToken = (req: any, res: any, next: any) => {

  const authHeader: any = req.headers.authorization || req.headers.Authorization;

  if(authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any,user: any) => {
          if(err) res.status(403).json('Token is not valid!');
          req.user = user;
          next();
      });
  } else {
      return res.status(401).json('Not Authenticated!')
  }
}

export let createToken = async (email: string, loginUser: any, res: Response) => {

  const user = {email: email}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '1800s'})
 
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '1d' });

   // Saving refreshToken with current user
  //  loginUser.refreshToken = refreshToken;
  // const result = await loginUser.save();

  res.cookie('jwtToken', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000}) //1day

  res.json({ accessToken })
}


