const connection = require("../db");

// Export function to retrieve skills from the database based on a given ID parameter.
exports.getskills = (req, res, next) => {
  // Retrieve the 'id' parameter from the request
  const id = req.params.id;
  // Query the database for all records in the 'test' table that match the given 'id'
  connection.query(`select * from test where idskills = ${id}`, (err, rows, fields) => {
    if (err) {
      next(err);
      return;
    }
    // Create empty array to store quiz questions/choices/results 
    choices = [];
    // Iterate through each row returned from the query and push an object with question/choices/result properties to the 'choices' array
    rows.forEach((row) => {
      choices.push({
        id: row.id,
        question: row.questions,
        question_fr: row.questions_fr,
        choices: [
          {
            label: row.choice1,
            label_fr: row.choice1_fr,
            value: 1,
          },
          {
            label: row.choice2,
            label_fr: row.choice2_fr,
            value: 2,
          },
          {
            label: row.choice3,
            label_fr: row.choice3_fr,
            value: 3,
          },
        ],
        result: row.result,
      });
    });
    res.status(200).json(choices);
  });
};
