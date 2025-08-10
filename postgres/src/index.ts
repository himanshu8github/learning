import {Client} from "pg";
import express from "express";
import type { Request, Response } from "express";


const app = express();
app.use(express.json());


// const pgClient3 = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }
// });


const pgClient2 = new Client({
    user: "neondb_owner",
    password: "npg_dDJMk9cVo1Qv",
    port : 5432,
    host: "ep-fragrant-violet-a14m5k04-pooler.ap-southeast-1.aws.neon.tech",
    database : "neondb",
     ssl: {
    rejectUnauthorized: false, 
  },

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

