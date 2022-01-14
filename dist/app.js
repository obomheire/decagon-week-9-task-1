"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipeRoutes_1 = __importDefault(require("./server/routes/recipeRoutes"));
const database_1 = require("./server/models/database");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
const dotenv_1 = __importDefault(require("dotenv"));
const mongoMemoryServer_ts_1 = require("./server/models/mongoMemoryServer.ts");
dotenv_1.default.config();
// require('dotenv').config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: database_1.mongoose.connection }),
}));
if (process.env.NODE_ENV === 'test') {
    (0, mongoMemoryServer_ts_1.connectTestDB)();
    console.log(process.env.NODE_ENV);
}
else {
    (0, database_1.connect)();
    console.log(process.env.NODE_ENV);
}
app.use('/', recipeRoutes_1.default);
exports.default = app;
