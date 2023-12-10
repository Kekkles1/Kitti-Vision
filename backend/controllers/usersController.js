const {getConnection} = require("../config/connection");

module.exports={

  //User can view all added users.
    getAllUsers: async function  (req, res){
        let connection ;
        try {
          console.log("hitttt--<<<<<<")
            connection = await getConnection();
            const table = await connection.execute("SELECT * FROM users");
            // console.log(table.rows);
            res.status(200).send(table);
          } catch (error) {
            console.error('Error executing SQL query to get all users:', error);
            res.status(500).send('Internal Server Error');
          } finally {
            if (connection) {
              try {
                // Release the connection when done
                await connection.close();
              } catch (error) {
                console.error('Error closing database connection:', error);
              }
            }
        } 
        // return table;
    },
    
    //User can create a new User (Sign Up)
    AddNewUser: async function (req, res){
      let connection ;
      try {
          connection = await getConnection();
          const query = `INSERT INTO users (username,password) VALUES (:1, :2)`;
          const binds = [req.body.username, req.body.password];
          const options = {
            autoCommit: true, 
          };
          
          await connection.execute(query,binds,options);
          res.status(202).send("Added User");
      } 
      catch (error) {
          console.error('Error executing SQL query to add user:', error);
          res.status(500).send('Internal Server Error');
        
      } 
      finally {
          if (connection) {
            try {
              // Release the connection when done
              await connection.close();
            } catch (error) {
              console.error('Error closing database connection:', error);
            }
          }
      }
  },

  //Browse feature
  getAllTvShows: async function  (req, res){
    let connection ;
    try {
      console.log("hitttt--<<<<<<")
        connection = await getConnection();
        const table = await connection.execute("SELECT * FROM tv_show");
        // console.log(table.rows);
        res.status(200).send(table);
      } catch (error) {
        console.error('Error executing SQL query to get all tv shows:', error);
        res.status(500).send('Internal Server Error');
      } finally {
        if (connection) {
          try {
            // Release the connection when done
            await connection.close();
          } catch (error) {
            console.error('Error closing database connection:', error);
          }
        }
    } 
},


//Checks if a User exists (matches username with table dummy data)
UsernameCheck: async function (req, res) {
  let connection;
  try {
    connection = await getConnection();
    const username = req.params.username;

    console.log("Printing username entered in param", username);
    console.log("checking");

    const query = `BEGIN 
    username_check(:input_username);
     END;`;

    const binds = { input_username: username };

    console.log(query, binds);

    try {
      const result = await connection.execute('BEGIN username_check(:input_username); END;',{input_username:req.params.username});
      console.log(result.rows);

      if (result.rows) {
        res.status(202).send("not empty :(");
       
      } else {
        res.status(202).send("haha loser empty");
      }
      
    } catch (error) {
      if (error && error.errorNum === 20001) {
        res.status(202).send("Username doesn't exist.");
      } else {
        console.error("Error executing SQL query:", error);
        res
          .status(500)
          .send("Internal Server Error while running the procedure");
      }
    }
  } catch (error) {
    console.error("Error executing SQL on an even bigger scale:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) {
      try {
        // Release the connection when done
        await connection.close();
      } catch (error) {
        console.error("Error closing database connection:", error);
      }
    }
  }
},


//Checks if a User exists (matches password with table dummy data)
PasswordCheck: async function (req, res) {
  let connection;
  try {
    connection = await getConnection();
    const password = req.params.password;

    console.log("password cehc",password);

    const query = `BEGIN 
    password_check(:input_password);
     END;`;

    const binds = { password: password };

    console.log(query, binds);

    try {
      const result = await connection.execute('BEGIN password_check(:input_password); END;',{input_password:req.params.password});
      console.log(result.rows);

      if (result.rows) {
        res.status(202).send("password not empty :(");
       
      } else {
        res.status(202).send("password haha loser empty");
      }

      res.status(200).send("Password exists!");
    } catch (error) {
      if (error && error.errorNum === 20001) {
        res.status(202).send("Password doesn't exist.");
      } else {
        console.error("Error executing SQL query:", error);
        res
          .status(500)
          .send("Internal Server Error while running the procedure");
      }
    }
  } catch (error) {
    console.error("Error executing SQL on an even bigger scale:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) {
      try {
        // Release the connection when done
        await connection.close();
      } catch (error) {
        console.error("Error closing database connection:", error);
      }
    }
  }
},

// User can view all watchlists.
getAllWatchlists: async function  (req, res){
  let connection ;
  try {
    console.log("hitttt--<<<<<<")
      connection = await getConnection();
      const table = await connection.execute("SELECT * FROM watchlist");
      // console.log(table.rows);
      res.status(200).send(table);
    } catch (error) {
      console.error('Error executing SQL query to get all users:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      if (connection) {
        try {
          // Release the connection when done
          await connection.close();
        } catch (error) {
          console.error('Error closing database connection:', error);
        }
      }
  } 
  // return table;
},

//DOESNT WORK
getAllEpisodes: async function (req, res) {
  let connection;
  try {
    connection = await getConnection();
    const query = `SELECT * FROM episodes WHERE ${req.body.tv_show_id}`;

    const table = await connection.execute(query);
    // console.log(table.rows);
    res.status(200).send(table);
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) {
      try {
        // Release the connection when done
        await connection.close();
      } catch (error) {
        console.error("Error closing database connection:", error);
      }
    }
  }
},

//User can view ALL written reviews (make it so that it gives for specific tv_show_id)
getAllReviews: async function  (req, res){
  let connection ;
  try {
    console.log("hitttt--<<<<<<")
      connection = await getConnection();
      const table = await connection.execute("SELECT * FROM reviews");
      // console.log(table.rows);
      res.status(200).send(table);
    } catch (error) {
      console.error('Error executing SQL query to get all tv shows:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      if (connection) {
        try {
          // Release the connection when done
          await connection.close();
        } catch (error) {
          console.error('Error closing database connection:', error);
        }
      }
  } 
},

//User can write a review
AddReview: async function (req, res){
  let connection ;
  try {
      connection = await getConnection();
      const query = `INSERT INTO reviews (review_written,tv_show_id,user_id) VALUES (:1, :2, :3)`;
      const binds = [req.body.review_written, req.body.tv_show_id, req.body.user_id];
      const options = {
        autoCommit: true, 
      };
      
      await connection.execute(query,binds,options);
      res.status(202).send("Added Review");
  } 
  catch (error) {
      console.error('Error executing SQL query to add user:', error);
      res.status(500).send('Internal Server Error');
    
  } 
  finally {
      if (connection) {
        try {
          // Release the connection when done
          await connection.close();
        } catch (error) {
          console.error('Error closing database connection:', error);
        }
      }
  }
},

//Get TV Show name based on tv_show_id
GetShowName: async function (req, res) {
  let connection;
  try {
    connection = await getConnection();
    const tv_show_id = req.params.id;
    const query = `SELECT name FROM tv_show WHERE tv_show_id =:tv_show_id`;
    const binds = { tv_show_id: tv_show_id };

    try {
      const result = await connection.execute(query, binds);
      console.log(result.rows);
      res.status(200).send(result.rows);
    } catch (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) {
      try {
        // Release the connection when done
        await connection.close();
      } catch (error) {
        console.error("Error closing database connection:", error);
      }
    }
  }
}
}