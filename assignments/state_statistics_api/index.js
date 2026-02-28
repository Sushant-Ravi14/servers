const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const states = [
  { id: 1, name: "Andhra Pradesh", population: 49386799, literacyRate: 67.02, annualBudget: 279279, gdp: 14000000 },
  { id: 2, name: "Arunachal Pradesh", population: 1383727, literacyRate: 65.38, annualBudget: 28000, gdp: 300000 },
  { id: 3, name: "Assam", population: 31205576, literacyRate: 72.19, annualBudget: 122000, gdp: 4500000 },
  { id: 4, name: "Bihar", population: 104099452, literacyRate: 61.80, annualBudget: 261885, gdp: 6500000 },
  { id: 5, name: "Chhattisgarh", population: 25545198, literacyRate: 70.28, annualBudget: 121500, gdp: 4000000 },
  { id: 6, name: "Goa", population: 1458545, literacyRate: 88.70, annualBudget: 25000, gdp: 800000 },
  { id: 7, name: "Gujarat", population: 63872399, literacyRate: 78.03, annualBudget: 243965, gdp: 21000000 },
  { id: 8, name: "Haryana", population: 25351462, literacyRate: 75.55, annualBudget: 180000, gdp: 9000000 },
  { id: 9, name: "Himachal Pradesh", population: 6864602, literacyRate: 82.80, annualBudget: 50000, gdp: 2000000 },
  { id: 10, name: "Jharkhand", population: 32988134, literacyRate: 66.41, annualBudget: 110000, gdp: 4500000 },
  { id: 11, name: "Karnataka", population: 61095297, literacyRate: 75.36, annualBudget: 275000, gdp: 18000000 },
  { id: 12, name: "Kerala", population: 33406061, literacyRate: 94.00, annualBudget: 150000, gdp: 12000000 },
  { id: 13, name: "Madhya Pradesh", population: 72626809, literacyRate: 69.32, annualBudget: 240000, gdp: 10000000 },
  { id: 14, name: "Maharashtra", population: 112374333, literacyRate: 82.34, annualBudget: 340000, gdp: 35000000 },
  { id: 15, name: "Manipur", population: 2855794, literacyRate: 79.85, annualBudget: 32000, gdp: 600000 },
  { id: 16, name: "Meghalaya", population: 2966889, literacyRate: 75.48, annualBudget: 30000, gdp: 500000 },
  { id: 17, name: "Mizoram", population: 1097206, literacyRate: 91.33, annualBudget: 25000, gdp: 400000 },
  { id: 18, name: "Nagaland", population: 1978502, literacyRate: 79.55, annualBudget: 27000, gdp: 500000 },
  { id: 19, name: "Odisha", population: 41974218, literacyRate: 72.87, annualBudget: 200000, gdp: 8000000 },
  { id: 20, name: "Punjab", population: 27743338, literacyRate: 75.84, annualBudget: 180000, gdp: 11000000 },
  { id: 21, name: "Rajasthan", population: 68548437, literacyRate: 66.11, annualBudget: 225000, gdp: 14000000 },
  { id: 22, name: "Sikkim", population: 610577, literacyRate: 81.42, annualBudget: 15000, gdp: 200000 },
  { id: 23, name: "Tamil Nadu", population: 72147030, literacyRate: 80.09, annualBudget: 300000, gdp: 22000000 },
  { id: 24, name: "Telangana", population: 35003674, literacyRate: 72.80, annualBudget: 290000, gdp: 15000000 },
  { id: 25, name: "Tripura", population: 3673917, literacyRate: 87.22, annualBudget: 25000, gdp: 700000 },
  { id: 26, name: "Uttar Pradesh", population: 199812341, literacyRate: 67.68, annualBudget: 350000, gdp: 25000000 },
  { id: 27, name: "Uttarakhand", population: 10086292, literacyRate: 78.82, annualBudget: 60000, gdp: 3000000 },
  { id: 28, name: "West Bengal", population: 91276115, literacyRate: 76.26, annualBudget: 310000, gdp: 16000000 }
];

// home route
app.get("/", (req,res) => {
    res.send("Server is running");
});

// Return complete list of states
app.get("/states", (req,res) => {
    res.status(200).json(states);
});

// Return the state with the highest GDP
app.get("/states/highest-gdp", (req, res) => {
    if (states.length === 0) {
        return res.status(404).json({ message: "No states available" });
    }

    const highestGDPState = states.reduce((max, state) => {
        return state.gdp > max.gdp ? state : max;
    });

    return res.status(200).json(highestGDPState);
});

// Return a single state by ID
app.get("/states/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const state = states.find(s => s.id === id);

    if(!state){
        return res.status(404).json({message: "State not found"});
    }

    res.status(200).json(state);
});

// Add a new state record
app.post("/states", (req, res) => {
    const {name, population, literacyRate, annualBudget, gdp} = req.body;

    if(!name || !population || !literacyRate || !annualBudget || !gdp){
        return res.status(404).json("All fields are required");
    }

    const newId = states.length > 0
                  ? states[states.length - 1].id + 1
                  : 1;
                  
    const newstate = {id: newId, name, population, literacyRate, annualBudget, gdp};
    states.push(newstate);
    res.status(201).json(newstate);
});

// Replace entire state record (except id)
app.put("/states/:id", (req,res) => {
    const stateId = parseInt(req.params.id);
    const index = states.findIndex(p => p.id === stateId);

    if(index === -1){
        return res.status(404).json("No state found");
    }

    const {name, population, literacyRate, annualBudget, gdp} = req.body;

    if(!name || !population || !literacyRate || !annualBudget || !gdp){
        return res.status(400).json("All fields are required");
    }

    const updatedState = {
        id: stateId, name, population, literacyRate, annualBudget, gdp
    };

    states[index] = updatedState;
    res.status(200).json(updatedState);

});

// Replace annualBudget value
app.put("/states/:id/budget", (req,res) => {
    const stateId = parseInt(req.params.id);
    const index = states.findIndex(s => s.id === stateId);

    if(index === -1){
        return res.status(404).json({ message: "State not found" });
    }

    const {annualBudget} = req.body;
    
    if (annualBudget == null || typeof annualBudget !== "number") {
        return res.status(400).json({ message: "Valid annualBudget value required" });
    }

    states[index].annualBudget = annualBudget;
    res.status(200).json(states[index]);
});

// Replace population value entirely
app.put("/states/:id/population", (req,res) => {
    const stateId = parseInt(req.params.id);
    const index = states.findIndex(s => s.id ===stateId);

    if(index === -1){
        return res.status(404).json({message: "State not found"});
    }

    const {population} = req.body;

    if(population == null || typeof population !== "number"){
        return res.status(400).json({ message: "Valid population value required" });
    }

    states[index].population = population;
    res.status(200).json(states[index]);
});

// Update literacyRate only
app.patch("/states/:id/literacy", (req, res) => {
    const stateId = parseInt(req.params.id);
    const state = states.find(s => s.id === stateId);

    if (!state) {
        return res.status(404).json({ message: "State not found" });
    }

    const { literacyRate } = req.body;

    if (literacyRate == null || typeof literacyRate !== "number") {
        return res.status(400).json({ message: "Valid literacyRate required" });
    }

    state.literacyRate = literacyRate;

    return res.status(200).json(state);
});

// Update gdp only
app.patch("/states/:id/gdp", (req, res) => {
    const stateId = parseInt(req.params.id);
    const state = states.find(s => s.id === stateId);

    if (!state) {
        return res.status(404).json({ message: "State not found" });
    }

    const { gdp } = req.body;

    if (gdp == null || typeof gdp !== "number") {
        return res.status(400).json({ message: "Valid literacyRate required" });
    }

    state.gdp = gdp;
    return res.status(200).json(state);
});

// Allow updating any provided fields without replacing entire object
app.patch("/states/:id", (req,res) => {
    const stateId = parseInt(req.params.id);
    const state = states.find(s => s.id === stateId);

    if(!state) {
        return res.status(404).json({message: "State not found"});
    }

    const allowedField = ["name", "population", "literacyRate", "annualBudget", "gdp"];

    Object.keys(req.body).forEach(key => {
        if(allowedField.includes(key)){
            state[key] = req.body[key];
        }
    });

    res.status(200).json(state);
});

// Delete state by id
app.delete("/states/:id", (req,res) => {
    const stateId = parseInt(req.params.id);
    const state = states.find(s => s.id === stateId);

    if(!state){
        return res.status(404).json({message: "State not found"});
    }

    states.splice(state, 1);
    return res.status(204).send();
});

// Delete state by name
app.delete("/states/name/:stateName", (req, res) => {
    const stateName = req.params.stateName;

    if (!stateName) {
        return res.status(400).json({ message: "State name required" });
    }

    const index = states.findIndex(
        s => s.name.toLowerCase() === stateName.toLowerCase()
    );

    if (index === -1) {
        return res.status(404).json({ message: "State not found" });
    }

    states.splice(index, 1);
    return res.status(204).send();
});

// Delete all states where literacyRate < given value
app.delete("/states/low-literacy/:percentage", (req,res) => {
    const percentage = parseFloat(req.params.percentage);
    
    if(isNaN(percentage)){
        return res.status(404).json({message: "Valid percentage required"});
    }

    const initialCount = states.length;

    for(let i=states.length-1; i>=0; i--){
        if(states[i].literacyRate < percentage){
            states.splice(i, 1);
        }
    }

    const deletedCount = initialCount - states.length;

    return res.status(200).json({deletedCount});
});

app.listen(3000, () => {
    console.log("Server has started on port 3000");
});