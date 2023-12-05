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


/**
 * Write a procedure for this (or use cascade delete)
 * Has to delete user_id referenced in other tables. Create another table called deleted_history.
 *  Pre_deletion, insert data into new table
 * (DOESNT RUN)
 */
DeleteUserID : async function (req, res){
  
  let connection ;
  try{
    connection = await getConnection();
    const query = `DELETE FROM users WHERE user_id = :1`;
    const binds = [req.body.tv_show_id];
    const options = {
      autoCommit: true, // Commit each insert immediately
    };

    await connection.execute(query,binds,options);
    res.status(202).send("Deleted User");
  }
  catch(error){
    console.log("Error executing SQL query to delete users:" ,error)
    res.status(500).send('Internal Server Error');
  }
  finally{
    if(connection){
      try{
        await connection.close();
      }
      catch(error){
        console.log("Error closing database connection:", error);
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

//Admin can view all episodes for a tv_show
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
//NOT WORKING
GetShowName: async function (req, res){
  let connection ;
  try {
      connection = await getConnection();
      const query = `SELECT name FROM tv_show WHERE ${req.body.tv_show_id} `;
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
}