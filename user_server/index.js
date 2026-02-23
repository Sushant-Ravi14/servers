const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const users = [
  { att: "80", uid: 108243, total_sub: 14, bonus: "20", name: "Dax"},
  { att: "75", uid: 108244, total_sub: 14, bonus: "15", name: "Dev"},
  { att: "85", uid: 108245, total_sub: 14, bonus: "10", name: "Ankit"}
];


// home route
app.get("/", (req, res) => {
  res.send("Server is running ");
});


// get all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});


// get user by uid
app.get("/user/:uid", (req, res) => {
  const uid = parseInt(req.params.uid);
  const user = users.find(u => u.uid === uid);

  if (!user) {
    return res.status(404).send("User not found");
    console.log("User not found");
  }

  res.status(200).json(user);
  console.log(user)
});


// adding a new user
app.post("/user", (req, res) => {
  const { uid, name, att } = req.body;

  if (!uid || !name || !att) {
    return res.status(400).send("All fields are required");
  }

  const newUser = { uid, name, att };
  users.push(newUser);

  res.status(201).json(newUser);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});


// updating user details
app.put("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    uid: userId,
    name: req.body.name,
    att: req.body.att
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});


// to delete an user
app.delete("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});