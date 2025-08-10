import {Client} from "pg";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import type { Request, Response } from "express";


const app = express();
app.use(express.json());


// const pgClient3 = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }
// });

const pgClient2 = new Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: 5432,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  ssl: { rejectUnauthorized: false },
});



// async function main(){
//     await pgClient2.connect();

//     // const res = await pgClient2.query("SELECT * FROM users");
//     //  const res = await pgClient2.query("UPDATE users SET username='himanshu' ,email='himanshu76@gmail.com' WHERE id='2' ");
//       const res = await pgClient2.query("INSERT INTO users (username , email, password) VALUES");
//     console.log(res)
// }


app.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

   if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

  const response = await pgClient2.query(
  "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
  [username, email, password]
);


  res.json({
    message : "You have signed up !"
  })

})

async function main() {
  try {
    await pgClient2.connect();
    console.log("Connected to PostgreSQL");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
}

main();

