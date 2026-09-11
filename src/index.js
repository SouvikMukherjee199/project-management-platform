console.log("Backend is running");
import app from "./app.js";
import connectDB from "./db/db.js"; 


import dotenv from "dotenv";
dotenv.config(
    {override: true,
        path: "./.env",
    },
    
);

const port = process.env.PORT || 3000


connectDB().then(
    app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
).catch((err)=>{
    console.log("MongoDB connection error", err);
    process.exit(1);    
})
// let name = process.env.PORT;
// console.log(name);

console.log(`Hi, our about page is running at http://localhost:${process.env.PORT}/about`);
console.log(`Hi, our home page is running at http://localhost:${process.env.PORT}`);