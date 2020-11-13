const express = require('express');
const path = require('path');

const logger = require('./middleware/logger');

// Initalize Express
const app = express();


// Initalize any necessary middleware (just an example - doesn't do much)
// app.use(logger); 

// Body Parser Middleware - allows us to parse JSON in the request
app.use(express.json());
// Allows us to handle url encoded data
app.use(express.urlencoded({extended: false}));



// Routing setup
// NOTE: we aren't doing it this way
// app.get('/', (req, res) => {
//     res.sendFile(
//         path.join(__dirname, 'public', 'index.html')
//     );
// });

// Setup a static folder route
app.use(express.static(
    path.join(__dirname, 'public')
))

// Setup some api routes
// Members API Routes
app.use('/api/members', require('./routes/api/members'));


// PORT Setup (defaults to 5000 if not defined in ENV)
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));