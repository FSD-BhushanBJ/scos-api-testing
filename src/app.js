import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import { initRoutes } from "./route_manager/routeManager.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

app.get("/", (req,res)=>{
  console.log("ROOT HIT");
  res.send("Backend is running");
});

app.get("/test",(req,res)=>{
  console.log("TEST HIT");
  res.send("working");
});

initRoutes(app);

export default app;