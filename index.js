const express = require('express');
const path = require('path');

// Initalize Express
const app = express();


// Routing setup
// We aren't doing it this way
// app.get('/', (req, res) => {
//     res.sendFile(
//         path.join(__dirname, 'public', 'index.html')
//     );
// });

// Setup a static folder
app.use(express.static(
    path.join(__dirname, 'public')
))


// PORT Setup (defaults to 5000 if not defined in ENV)
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));