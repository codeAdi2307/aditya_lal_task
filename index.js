import express from "express";
import cors from "cors"
import router from "./router/router.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors())

app.use("/api",router)

async function connection() {
  try {

  let mongo_url =  process.env.MONGO_URL

    await mongoose.connect(`${mongo_url}`);
    
    console.log("Connected to MongoDB");

    app.listen( 8000, () => {
      console.log(`Listening to server and connected to db  at ${8000}`);
    });

  } catch (error) {
    console.error("Problem with the code running:", error);
    process.exit(1); 
  }
}

connection();

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong in some controller");
});
