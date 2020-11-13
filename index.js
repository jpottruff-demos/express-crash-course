const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const members= require('./models/Members');
// const logger = require('./middleware/logger');

// Initalize Express
const app = express();


// Initalize any necessary middleware (just an example - doesn't do much)
// Custom Middleware example
// app.use(logger); 

// Handlebars Middleware (template engine)
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
// allows us to parse JSON in the request
app.use(express.json());
// Allows us to handle the form data (sent from the form; see handlebars template)
app.use(express.urlencoded({extended: false}));



// Routing setup
// NOTE: we aren't doing it this way
// app.get('/', (req, res) => {
//     res.sendFile(
//         path.join(__dirname, 'public', 'index.html')
//     );
// });


// ROUTING FOR STATIC PAGES (note: use static OR handlebars; eg comment out as needed)
// Static Folder route
// app.use(express.static(
//     path.join(__dirname, 'public')
// ));


// Handlebars routing for Homepage
// Not sending in data
// app.get('/', (req, res) => res.render('index'));
// Sending in some data
app.get('/', (req, res) => res.render('index', {
    title: 'My fancy title',
    members
}));

// Setup some api routes
// Members API Routes
app.use('/api/members', require('./routes/api/members'));


// PORT Setup (defaults to 5000 if not defined in ENV)
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));