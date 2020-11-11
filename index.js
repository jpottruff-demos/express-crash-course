const express = require('express');
const path = require('path');

const logger = require('./middleware/logger');
const members = require('./models/Members');

// Initalize Express
const app = express();


// Initalize any necessary middleware (just an example - doesn't do much)
// app.use(logger); 

// Routing setup
// NOTE: we aren't doing it this way
// app.get('/', (req, res) => {
//     res.sendFile(
//         path.join(__dirname, 'public', 'index.html')
//     );
// });

// Setup a static folder
app.use(express.static(
    path.join(__dirname, 'public')
))



// Send back some JSON data

// Get all members
app.get('/api/members', (req, res) => res.json(members));

// Get a single member
app.get('/api/members/:id', (req, res) => {
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));
    (found) ?
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
        : res.status(400).json({msg: `No member with id ${req.params.id}`});
});

// PORT Setup (defaults to 5000 if not defined in ENV)
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));