const connection = require("../db");
const Joi = require("joi");
const bcrypt = require("bcrypt");

// Define a schema for user authentication
const authSchemaWeb = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

// Export function to register a new user and store their username and hashed password in the database
exports.register = async (req, res, next) => {
  // Define number of salt rounds for bcrypt hash
  const saltRounds = 10;
  let cryptpassword;
  
  // Use bcrypt to generate a salt and hash the password
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      cryptpassword = hash;
      // Insert new user into the database with their username and hashed password
      connection.query(
        `insert into user(user.username, user.password) values('` +
          req.body.userName +
          `','` +
          cryptpassword +
          `');`,
        (error, rowss, fields) => {
          if (error) {
            console.log(error);
            res.status(500).json(error);
            return;
          } else {
            res.status(200).json(rowss);
          }
        }
      );
    });
  });
};

// Export function to authenticate user login credentials and return a success/failure message
exports.login = async (req, res, next) => {
  const user = req.body;
  const { userName, password } = req.body;
  
  try {
    // Validate the user's login credentials using the defined schema
    const validCred = await authSchemaWeb.validateAsync(user);
    if (validCred) {
      // Query the database for the user's information using their username
      connection.query(
        `SELECT * FROM user where username = '${userName}';`,
        async (err, rows, fields) => {
          if (err) res.status(500).json(err);
          if (rows.length === 0) {
            // Return an error message if the user does not exist in the database
            res.status(400).json({
              crederror: true,
              message: `User ${userName} does not exist`,
            });
          } else {
            // Compare the entered password with the hashed password stored in the database
            const loged = await bcrypt.compare(password, rows[0].password);
            if (loged) {
              // Return a success status code and the user's information if the login is successful
              res.status(200).json({ status: "Success", userinfo: user });
            } else {
              res
                .status(400)
                .json({ crederror: true, message: `Incorrect password` });
            }
          }
        }
      );
    }
  } catch (error) {
    console.log("catch", error);
    res.status(400).json({ crederror: false, message: error.message });
    return;
  }
};

// Export function to get all records of users from the database
exports.getAll = (req, res, next) => {
  connection.query(`select * from user`, (err, rows, fields) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).json(rows);
  });
};
