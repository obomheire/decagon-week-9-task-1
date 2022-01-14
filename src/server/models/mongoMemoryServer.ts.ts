import mongoose from "mongoose";
import { MongoMemoryServer }from "mongodb-memory-server";

export const connectTestDB = () => {
    try{
      MongoMemoryServer.create().then((mongo) => {
        const uri = mongo.getUri();
        mongoose.connect(uri).then(() => {
          //console.log("connected to testDB");
        });
      });
    }
    catch (error) {
      //console.log(error);
    }
  };