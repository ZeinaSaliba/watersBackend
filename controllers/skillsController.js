const connection = require('../db');

// Export function to get all records of skills from the database
exports.getAll = (req, res, next) => {
    // Query the database for all records in the 'skills' table
    connection.query(`select * from skills`, (err, rows,fields) => {
        if(err) {
            next(err);
            return;
        }
        res.status(200).json(rows);
    });
}
