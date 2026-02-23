const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    branch: "CSE",
    semester: 8,
    cgpa: 9.3
  },
  {
    id: 2,
    name: "Ishita Verma",
    branch: "IT",
    semester: 7,
    cgpa: 8.9
  },
  {
    id: 3,
    name: "Rohan Kulkarni",
    branch: "ECE",
    semester: 6,
    cgpa: 8.4
  },
  {
    id: 4,
    name: "Meera Iyer",
    branch: "CSE",
    semester: 8,
    cgpa: 9.1
  },
  {
    id: 5,
    name: "Kunal Deshmukh",
    branch: "IT",
    semester: 5,
    cgpa: 7.8
  },
  {
    id: 6,
    name: "Ananya Reddy",
    branch: "CSE",
    semester: 6,
    cgpa: 8.7
  },
  {
    id: 7,
    name: "Vikram Patil",
    branch: "ECE",
    semester: 7,
    cgpa: 8.2
  },
  {
    id: 8,
    name: "Priyanka Nair",
    branch: "AI",
    semester: 4,
    cgpa: 8.8
  },
  {
    id: 9,
    name: "Harsh Mehta",
    branch: "Data Science",
    semester: 5,
    cgpa: 8.0
  },
  {
    id: 10,
    name: "Neha Gupta",
    branch: "CSE",
    semester: 6,
    cgpa: 7.9
  }
];

// Get all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// Return the student with the highest CGPA
app.get("/students/topper", (req, res) => {
    if(students === 0 ){
        return res.status(404).json("no student found");
    }

    const sortedStudents = [...students].sort((a,b) => b.cgpa - a.cgpa);
    res.status(200).json(sortedStudents[0]);
});

//Return average CGPA of all students
app.get("/students/average", (req, res) => {
    if(students === 0){
        return req.status(404).json("no student found");
    }

    const totalCGPA = students.reduce((sum, student) => sum + student.cgpa, 0);
    const avgCGPA = totalCGPA/students.length;

    res.status(200).json({averageCGPA: avgCGPA.toFixed(2)});
});

// return total number of students
app.get("/students/count", (req,res) => {
    if(students === 0){
        return req.status(404).json("no student found");
    }

    const count = students.length;
    res.status(200).json({totalStudents: count});
});

//Return student by ID
app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if(!student){
        return res.status(404).json("no student found");
    }

    res.status(200).json(student);
});

//Return all students from a specific branch
app.get("/students/branch/:branchName", (req, res) => {
    const { branchName } = req.params;

    if(!branchName){
        return res.status(404).json("no student found");
    }

    const result = students.filter(s => s.branch.toLowerCase() === branchName);

    res.status(200).json(result);
})


app.listen(3000, () => {
  console.log("Server started on port 3000");
});