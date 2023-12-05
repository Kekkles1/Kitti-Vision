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

//This works because admin_id is not a foreign key anywhere
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

//Admin can view all episodes for a tv_show
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
}
}