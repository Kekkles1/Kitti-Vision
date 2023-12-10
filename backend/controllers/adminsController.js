const {getConnection} = require("../config/connection");

module.exports={

  //Admin can view all added admins
    getAllAdmins: async function  (req, res){
        let connection ;
        try {
          console.log("hitttt--<<<<<<")
            connection = await getConnection();
            const table = await connection.execute("SELECT * FROM admin");
            // console.log(table.rows);
            res.status(200).send(table);
          } catch (error) {
            console.error('Error executing SQL query to view all admins:', error);
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

    //Admin can view all users
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
    
    //Admin can create new admin
    AddNewAdmin: async function (req, res){
      let connection ;
      try {
          connection = await getConnection();
          const query = `INSERT INTO admin (username,password) VALUES (:1, :2) `;
          const binds = [req.body.username, req.body.password];
          const options = {
            autoCommit: true, 
          };
          
          await connection.execute(query,binds,options);
          res.status(202).send("Added Admin");
      } 
      catch (error) {
          console.error('Error executing SQL query to add admin:', error);
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

  //Only admins can add new tv shows
  AddNewShow: async function (req, res){
    let connection ;
    try {
        connection = await getConnection();
        const query = `INSERT INTO tv_show (name,season,genre,synopsis,lang,rating) VALUES (:1, :2, :3, :4, :5, :6)`;
        const binds = [req.body.name,req.body.season,req.body.genre,req.body.synopsis,req.body.lang,req.body.rating];
        const options = {
          autoCommit: true, 
        };
        
        await connection.execute(query,binds,options);
        res.status(202).send("Added TV Show");
    } 
    catch (error) {
        console.error('Error executing SQL query to add TV Show:', error);
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


/**
 *  Admin can ONLY delete their own admin_id. Need to use parameters. This is a frontend-backend problem.
 */
DeleteAdminID : async function (req, res){
  let connection ;
  try{
    connection = await getConnection();
    const query = `DELETE FROM admin WHERE admin_id = :1`;
    const binds = [req.body.admin_id];
    const options = {
      autoCommit: true, // Commit each insert immediately
    };

    await connection.execute(query,binds,options);
    res.status(202).send("Deleted Admin");
  }
  catch(error){
    console.log("Error executing SQL query to delete admin:" ,error)
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

//Only admins can add episodes to tv shows
AddNewEpisode: async function (req, res){
  let connection ;
  try {
      connection = await getConnection();
      const query = `INSERT INTO episodes (episode_id,title,runtime,tv_show_id) VALUES (:1, :2, :3, :4)`;
      const binds = [req.body.episode_id,req.body.title,req.body.runtime,req.body.tv_show_id];
      const options = {
        autoCommit: true, 
      };
      
      await connection.execute(query,binds,options);
      res.status(202).send("Added Episode to TV Show");
  } 
  catch (error) {
      console.error('Error executing SQL query to add episode:', error);
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

//DOESNT WORK
getAllEpisodes: async function (req, res) {
  let connection;
  try {
    connection = await getConnection();
    const query = `SELECT * from episodes where tv_show_id=:tv_show_id`;
    const binds = [req.params.tv_show_id];

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

//Checks if a Admin exists (matches username with table dummy data)
AdminUsernameCheck: async function (req, res) {
  let connection;
  try {
    connection = await getConnection();
    const username=req.query.username;

    const query = `
    BEGIN 
    admin_username(:username);
     END;`;

    const binds = { username: username};

    console.log(query, binds);

    try {
      const result = await connection.execute(query, binds);

      res.status(200).send("Admin Username is correct!");

    } catch (error) {
      if (error && error.errorNum === 20001) {
        res.status(202).send("Admin Useraname is incorrect");
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

//Checks if a Admin exists (matches password with table dummy data)
AdminPasswordCheck: async function (req, res) {
  let connection;
  try {
    connection = await getConnection();
    const password=req.query.password;

    const query = `
    BEGIN 
    admin_password(:password);
     END;`;

    const binds = { password: password};

    console.log(query, binds);


    try {
      const result = await connection.execute(query, binds);

      res.status(200).send("Admin Password is correct!");

    } catch (error) {
      if (error && error.errorNum === 20001) {
        res.status(202).send("Admin Password is incorrect.");
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
}

}