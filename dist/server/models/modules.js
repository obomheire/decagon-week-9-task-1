"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.authenticateToken = exports.joiShemaLog = exports.joiShemaReg = void 0;
const joi_1 = __importDefault(require("joi"));
const jwt = require('jsonwebtoken');
let joiShemaReg = () => {
    const schema = joi_1.default.object({
        fullName: joi_1.default.string().min(3).max(45).required(),
        email: joi_1.default.string().min(5).max(45).email().required(),
        password: joi_1.default.string().min(5).max(45).required(),
    });
    return schema;
};
exports.joiShemaReg = joiShemaReg;
let joiShemaLog = () => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(5).max(45).email().required(),
        password: joi_1.default.string().min(5).max(45).required(),
    });
    return schema;
};
exports.joiShemaLog = joiShemaLog;
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
let authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err)
                res.status(403).json('Token is not valid!');
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json('Not Authenticated!');
    }
};
exports.authenticateToken = authenticateToken;
let createToken = (email, loginUser, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = { email: email };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '1d' });
    // Saving refreshToken with current user
    //  loginUser.refreshToken = refreshToken;
    // const result = await loginUser.save();
    res.cookie('jwtToken', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //1day
    res.json({ accessToken });
});
exports.createToken = createToken;
