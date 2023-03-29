const express = require('express');
const user = require('../routes/user');
const skills = require('../routes/skills');
const test = require('../routes/test');
const error = require('../middleware/error');

// Export a function to configure and start the Express application
module.exports = function(app) {
    // Set up middleware to parse incoming JSON data
    app.use(express.json());
    // Set up routes for the API endpoints
    app.use('/api/user', user);
    app.use('/api/skills', skills);
    app.use('/api/test', test);
    // for error handling
    app.use(error);
};