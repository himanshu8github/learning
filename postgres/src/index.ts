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
  const { username, email, password, city, country, street, pincode } = req.body;

  if (!username || !email || !password || !city || !country || !street) {
    return res.status(400).json({ error: "All required fields must be provided" });
  }

  try {
    // Start transaction
    await pgClient2.query("BEGIN");

    // Insert into users table
    const userResult = await pgClient2.query(
      `INSERT INTO datauser1 (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id;`,
      [username, email, password]
    );

    const userId = userResult.rows[0].id;

    // Insert into addresses table with user_id
    await pgClient2.query(
      `INSERT INTO addresses (user_id, city, country, street, pincode)
       VALUES ($1, $2, $3, $4, $5);`,
      [userId, city, country, street, pincode]
    );

    // Commit transaction
    await pgClient2.query("COMMIT");

    res.json({ message: "You have signed up successfully!" });
  } catch (err) {
    await pgClient2.query("ROLLBACK");
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/metadata', async (req: Request, res:Response) => {

  const id =req.query.id;

  const query1 = `SELECT username , email, id FROM users WHERE ID=$1`;
  const response =  await pgClient2.query(query1, [id]);


  const query2 = `SELECT username , email, id FROM users WHERE ID=$1`;
  const response2 =  await pgClient2.query(query2, [id]);

  res.json({
    user: response.rows[0],
    address : response2.rows
  })
})

app.get('/bettermetadata', async (req: Request, res: Response) => {
  try {
    // Parse the query param and default to 0 if not provided
    const id = parseInt(req.query.id as string, 10) || 0;

    const query = `
      SELECT datauser1.id, datauser1.username, datauser1.email, 
             addresses.city, addresses.country, addresses.street, addresses.pincode
      FROM datauser1 
      JOIN addresses ON datauser1.id = addresses.user_id
      WHERE datauser1.id > $1
    `;

    const result = await pgClient2.query(query, [id]);

    res.json({
      rows: result.rows
    });

  } catch (err) {
    console.error("Error fetching metadata:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


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

