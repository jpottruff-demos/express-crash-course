const moment = require('moment');


// Create a Middleware function
const logger = (req, res, next) => {
    console.log(`Hey from middleware`);
    console.log(`Coming from: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    console.log(`${moment().format()}`);
    next()
}

module.exports = logger;