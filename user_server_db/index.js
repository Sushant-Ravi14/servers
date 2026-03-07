const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect(
  'mongodb+srv://sushant123:usercg_123@cluster0.uzpmq5g.mongodb.net/users?retryWrites=true&w=majority'
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  city: { type: String, required: true },
  membership: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);


app.get("/", (req,res) => {
  res.send("server is live");
});


app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch(err) {
    res.status(500).json({error: err.message});
  }
});


app.get('/users/:id', async (req, res) => {
  try{
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  }catch(err){
    res.status(500).json({error: err.message});
  }
});


app.post('/users', async (req, res) => {
  try{
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  }catch(err){
    res.status(400).json({error: err.message});
  }
});


app.post('/users/many', async (req, res) => {
  try{
    const users = await User.insertMany(req.body);
    res.json(users);
  }catch(err){
    res.status(400).json({error: err.message});
  }
});


app.put('/users/:id', async (req, res) => {
  try{
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  }catch(err){
    res.status(400).json({error: err.message});
  }
});


app.patch('/users/:id', async (req, res) => {
  try{
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  }catch(err){
    res.status(400).json({error: err.message});
  }
});


app.delete('/users/:id', async (req, res) => {
  try{
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  }catch(err){
    res.status(500).json({error: err.message});
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});