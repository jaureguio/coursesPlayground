import app from "./server"
import { MongoClient } from "mongodb"
import MoviesDAO from "./dao/moviesDAO"
import UsersDAO from "./dao/usersDAO"
import CommentsDAO from "./dao/commentsDAO"

const port = process.env.PORT || 8000

/**
Ticket: Connection Pooling

Please change the configuration of the MongoClient object by setting the
maximum connection pool size to 50 active connections.
*/

/**
Ticket: Timeouts

Please prevent the program from waiting indefinitely by setting the write
concern timeout limit to 2500 milliseconds.
*/

MongoClient.connect(
  process.env.MFLIX_DB_URI,

  // Ticket: Principle of Least Privilege
  // DONE!
  // process.env.MFLIX_DB_URI_TEST,
  
  // DONE: Connection Pooling (poolSize is equal to 100 by default).
  // Set the poolSize to 50 connections: the configuration object should be { poolSize: 50, useNewUrlParser: true },
  // DONE: Timeouts
  // Set the write timeout limit to 2500 milliseconds: { wtimeout: 2500, useNewUrlParser: true },
  { useNewUrlParser: true },
)
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await MoviesDAO.injectDB(client)
    await UsersDAO.injectDB(client)
    await CommentsDAO.injectDB(client)
    
    // The following is a possible way (needs to be confirmed yet) to create a new user using the NodeJS MongoDB 
    // driver and this connection (given the appropiate URI's user permissions to perform such action)
    // 
    // let admin = client.db(process.env.MFLIX_NS).admin()
    // await admin.addUser("mflixAppUser", "mflixAppPwd", { roles: [{ db: process.env.MFLIX_NS, role: "readWrite" }] })

    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })
