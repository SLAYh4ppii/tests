const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const dbName = "ATS";

const dbURL = process.env.DB_URL; // Set your MongoDB URL in environment variables
const jwtSecret = process.env.JWT_SECRET; // Set your JWT secret in environment variables

async function connectToDB() {
  const client = new MongoClient(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB server");
    return client.db(dbName);
  } catch (err) {
    throw new Error("Failed to connect to the database");
  }
}

async function findUser(db, username) {
  const collection = db.collection("user");
  return collection.findOne({ username });
}

async function createUser(db, username, password) {
  const collection = db.collection("user");
  const hash = await bcrypt.hash(password, saltRounds);

  const user = {
    userId: v4(),
    username,
    password: hash,
  };

  const result = await collection.insertOne(user);
  return result.ops[0];
}

module.exports = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { username, password } = req.body;

      assert(username, "Username required");
      assert(password, "Password required");

      const db = await connectToDB();

      const existingUser = await findUser(db, username);
      if (!existingUser) {
        const newUser = await createUser(db, username, password);

        const token = jwt.sign(
          { userId: newUser.userId, username: newUser.username },
          jwtSecret
        );

        res.status(200).json({ token });
      } else {
        res.status(403).json({ error: true, message: "Username exists" });
      }
    } else {
      res.status(200).json({ users: ["John Doe"] });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};