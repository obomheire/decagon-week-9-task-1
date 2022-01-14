"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectTestDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const connectTestDB = () => {
    try {
        mongodb_memory_server_1.MongoMemoryServer.create().then((mongo) => {
            const uri = mongo.getUri();
            mongoose_1.default.connect(uri).then(() => {
                //console.log("connected to testDB");
            });
        });
    }
    catch (error) {
        //console.log(error);
    }
};
exports.connectTestDB = connectTestDB;
