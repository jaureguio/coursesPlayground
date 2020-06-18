## Chapter 00 - Introduction

### Mongod

Mongod is the core database process that handles data requests and manages data access. Importants aspects of interacting with a Mongod process is enabling authentication and exploring the database logs.

## Chapter 01 - The Mongod

### The Mongod

Before understanding what Mongod is, we need to define the term 'daemon'. A daemon is a program or process that's meant to be run but not to be interacted with directly. Daemons usually have a 'D' appended to their name, which gives us the name 'mongod'.

Mongod is the main daemon process for MongoDB. It is the core server of the database, handling connections, requests, and most importantly, persisting our data. Mongod contains all of the configuration options we can use to make our database secure, distributed, and consistent.

Our MongoDB deployment may consist of more than one server. Our data may be distributed in a replica set or across a sharded cluster. When we launch mongod, we're essentially starting up a new database. But we don't interact with the mongod process directly. Instead, we use a database client that is programmed to communicate with mongod. We issue database commands, like document inserts or updates, to the client, and the client takes care of communicating with mongod to execute those commands. If our deployment has multiple servers, we can configure our client to communicate with each of these mongod processes as needed. So we don't need to figure out which server to connect to ourselves.

> The easiest way to start up a mongod process is to run the command mongod in the terminal. Notice that we no longer have a command prompt in our terminal. If we try to type a command, such as ls, we'll just get a new line. If we want to continue using the terminal, we need to open a new window. As we'll see in later lessons, we can configure mongod by providing a configuration file or specifying flags. But there are some default values to be aware of when launching mongod without any options. The port mongod listens on will default to 27017. Clients that want to access mongod should specify the same port. The default dbpath is /data/db. This is where the data files representing your databases, collections, and indexes are stored so that your data persists after mongod stops running. The dbpath also stores journaling information so that your data remains consistent in the case of an unexpected crash. mongod binds to localhost by default. This means that the only database clients that can connect with mongod are ones local to the machine where mongod is running. We'll learn in later lessons how to bind to other IP addresses and hosts to allow remote clients to connect. Authentication is turned off by default. This means that unless we enable off, database clients are not required to authenticate before accessing the database. Understanding the default values should make it easier to read the mongod output. On the first line, we can see the dbpath and the port. A little further down we also have two warnings, that access control is not enabled-- that is, we have not turned on authentication-- and that mongod is only bound to localhost. As we said before, we don't communicate with mongod directly when we issue commands to our database. Instead, we issue commands through a database client.

> The Mongo Shell allows us to interact with MongoDB directly in the terminal. By default, the Mongo Shell will connect to port 27017, which is the port our mongod process is currently listening on. To get the Mongo Shell up and running, we just need to type the command mongo. To verify the Mongo Shell is connected to our mongod process, we can check the output in the mongod window. The output shows that one connection is now open, and that the application is the MongoDB shell. Once the Mongo Shell is connected to mongod, we can issue database commands like insert and find. Let's try an example. Say we want to add an employees collection to our database. All we need to do is type in the command db.createCollection and pass in the name of the collection we want to create. The shell outputs an OK message to indicate that we successfully created a new collection. We can also see the results of the createCollection command in the mongod output. When we're done, we can use the shell to close our mongod connection with the following command-- use admin db.shutdownServer and exit. Again, let's check the mongod window to verify that mongod is no longer running. mongod outputs that it received the shell command and cleaned up after itself by closing sockets and shutting down. Of course, the Mongo Shell isn't the only way we can connect to mongod. MongoDB provides other database clients such as MongoDB Compass, which is a graphical user interface for MongoDB, and drivers in several different languages, which provide APIs to connect to mongod in your applications.

### Mongod Options

We can list all the available configuration options when running the mongod process using the `mongod --help` command in the shell.

Some of the most common ones are:

- dbpath
  - > It is the directory where all the data files for your database are stored. The dbpath also contains journaling logs to provide durability in case of a crash. As we saw before, the default dbpath is /data/db; however, you can specify any directory that exists on your machine. The directory must have read/write permissions since database and journaling files will be written to the directory. To use the dbpath option, include the dbpath flag and specify the name of your directory:

```powershell
mongod --dbpath <directory path>
```

- port
  - > The port option allows us to specify the port on which mongod will listen for client connections. If we don't specify a port, it will default to 27017. Database clients should specify the same port to connect to mongod. To specify a port, run:

```powershell
mongod --port <port number>
```

- auth
  - > auth enables authentication to control which users can access the database. When auth is specified, all database clients who want to connect to mongod first need to authenticate. Before any database users have been configured, a Mongo shell running on localhost will have access to the database. We can then configure users and their permission levels using the shell. It its important to note that the first user created should be granted 'admin' privileges (root' role). Once one or more users have been configured, the shell will no longer have default access. To enable authentication, run mongod with the auth option:

```powershell
mongod --auth
```

- bind_ip
  - > The bind_ip option allows us to specify which IP addresses mongod should bind to. When mongod binds to an IP address, clients from that address are able to connect to mongod. For instance, if we wanted to allow clients on IP address 123.123.123.123 to access our database, we'd use the following command:

```powershell
mongod --bind_ip 123.123.123.123
```

- > To bind to multiple addresses and/or hosts, you can specify them in a comma-separated list:

```powershell
mongod --bind_ip localhost,123.123.123.123
```

- > If using the bind_ip option with external IP addresses, it's recommended to enable auth to ensure that remote clients connecting to mongod have the proper credentials.

For documentation on all of the mongod options, check out the [mongod Reference Page](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)

### Mongod Configuration Options File

The MongoDB configuration file is a way to organize options we need to run the MongoD or MongoS process into an easy to parse YAML file. For the majority of use cases outside of the most basic of development or evaluation, we should be using a configuration file for storing our MongoD or MongoS startup options.

The configuration files is written in YAML syntax. YAML stands for 'YAML Ain't Markup Language'. Both the following configuration file and mongod shell script with flags are equivalent:

- Configuration File:

```yaml
storage:
  dbPath: "/data/db"
systemLog:
  path: "/data/log/mongod.log"
  destination: "file"
replication:
  replSetName: M103
net:
  bindIp: "127.0.0.1,192.168.103.100"
tls:
  mode: "requireTLS"
  certificateKeyFile: "/etc/tls/tls.pem"
  CAFile: "/etc/tls/TLSCA.pem"
security:
  keyFile: "/data/keyfile"
processManagement:
  fork: true
```

- To run mongod using the above config file, execute:

```powershell
mongo -f [--config] <path to config file>
```

- Shell script

```powershell
mongod --dbpath /data/db --logpath /data/log/mongod.log --fork --replSet "M103" --keyFile /data/keyfile --bind_ip "127.0.0.1,192.168.103.100" --tlsMode requireTLS --tlsCAFile "/etc/tls/TLSCA.pem" --tlsCertificateKeyFile "/etc/tls/tls.pem"
```

### MongoDB Data File Structure

![File Structure](mongodb-file-structure.jpg)

The above image shows the file structure we can expect to find in a data directory of a MongoDB server or standalone process. We should typically never need to interact with the files in this data folder unless directed to by MongoDB support personnel or through a procedure detailed in MongoDB documentation. None of these files are designed for user access or modification, and modifying them can cause crashes or data loss. Make sure to perform read only functions in the case of exploring these files.

- The first group of files are related to hor the WiredTiger storage engine keeps track of information like cluster metadata and WiredTiger-specific configuration options.

  - The 'WiredTiger.lock' file acts as a safety. If we ran a second simultaneous MongoDB process and pointed at this folder, the lock file helps prevent that second MongoDB process from starting up. If we experience an unclean shutdown such as the host machine losing power or a crash of some sort, we may find that we cannot start up the MongoD due to this lock file. We may be instructed to delete .lock files before restarting the MongoD.

- The next group of files ending with '.wt' are related to collection and index data itself. MongoDB WiredTiger stores index data as a separate structure from collection data. Even in a brand new MongoDB deployment, we typically have a few databases and collections by default, so we should always see some collection in index-\*.wt files.

  - These files are designed to be interacted with through the MongoDB server process, rather than a third party tool.

- The 'diagnostic.data' directory contains diagnostic data captured for specific use by MongoDB support. No private data is captured! The data is captured by the FTDC module (Full Time Data Capturez).

- QUERY 'journal' directory nqueriesti (?) including query planner activities.

REPL - With MongoDB WiredTreplica sets write opeinitial sync or heartbeats are buffered in meREPL_HB and flushed every 60 replica set heartbeats data. WiredTiger also uses a write-ahead logging system to an on disk journal file. Journal entries are first buffered in memory, and then WiredTiger syncs the journal to disk every 50 milliseconds. Each journal file is limited to 100mb of size.

- WiredTiger uses a file rotation method for syncing data to disk. In the event of a failure, WT can use the journal to recover data that occurred between checkpoints.

  - For example, during normal operations, WT flushes data to disk every 60 seconds, or when the journal file has 2 gigabytes of data. These flushes again create a durable checkpoint. If the MongoDB process gets back online, WT can check if there is any recovery to be made. In case that there are some incomplete writes, WT looks at the existing data files to find the identifier of the last checkpoint. It then searches the journal files for the record that matches the identifier of the last checkpoint. Finally, it applies operations in the journal files since the last checkpoint. At the end, MongoDB server can resume normal exection.

  ![Database recovery process using the journal files](recovery-process-journal.jpg)

- The 'mongod.lock' file has a similar function to the 'WiredTiger.lock' file. if this file is not empty, it means that a MongoDB process is currently active in this directory. Any other MongoDB process attempting to access this directory will fail to startup in that event. If this file is empty, then everything is clear.

  - In some unusual situations, like an unclean shutdown, the 'mongod.lock' file won't be empty, even though the MongoD is no longer running. We may need to delete the file if directed to by support or the documentation files.

- The ramaining files ('sizeStorer.wt' and 'storage.bson') are more support and metadata files for WiredTiger.

- There are more files related to the MongoDB process.
  - The log files (that are recommended to be stored in a different directory from the files already mentioned above) are vital for post failure diagnostics and should be treated with care as well.
  - The 'mongodb-27017.sock' file (which is not in any of the directories mentioned previously -- data and log directories), is a socket file used by MongoDB to create a socket connection at the specified port. MongoDB needs to use sockets for interprocess communications. Without this file, MongoDB cannot function. This file is created at startup and lets the MongoDB server own the port. If there is a crash or other unclean shutdown, we might find an error on startup related to this file.

### Basic Commands

There are basic commands necessary to interact with the MongoDB cluster. These are methods available in the MongoDB shell that wrap underlying database commands. The majority of our interactions, in general, will likely be using shell helpers.

- Command groups:

```javascript
db.method(); // database level methods

db.collection.method();

rs.method(); // Controls replica set deployment and management.

sh.method(); // Controls sharded cluster deployment and management.
```

- Note that "collection" and "method" are placeholders for the actual collection and method name we desire to be manipulate.

* Common (and most useful) db shell helper methods:

  - User Management:

    - db.createUser()
    - db.dropUser()

  - Collection Management:

    - db.renameCollection()
    - db.collection.createIndex()
    - db.collection.drop()

  - Database Management:

    - db.dropDatabase()
    - db.createCollection()

  - Database Status:

    - db.serverStatus()

#### Database Command vs Shell Helper

- Database Command:

  ```javascript
  db.runCommand({
    createIndexes: "<collection>",
    indexes: [
      {
        key: { product: 1 },
      },
      ("name": "name_index"),
    ],
  });
  ```

- Shell Helper:

  ```javascript
  db.collection.createIndex({ product: 1 }, { name: "name_index" });
  ```

  - Note that "collection" is a placeholder for the actual collection name we desire to run the method on.

### Logging Basics

MongoDB provides two logging facilities for tracking activities on our database.
The process log displays activity on the MongoDB instance. It collects activity into one of the following components:

| Components | Logged Activity                                                        |
| ---------- | ---------------------------------------------------------------------- |
| ACCESS     | messages related to access control, such as authentication.            |
| COMMAND    | messages related to database commands.                                 |
| CONTROL    | messages related to control activities, such as initialization.        |
| FTDC       | messages related to the diagnostic data collection mechanism.          |
| GEO        | messages related to parsing of geospatial shapes.                      |
| INDEX      | messages related to indexing operations.                               |
| NETWORK    | messages related to network activities, such as accepting connections. |
| QUERY      | messages related to queries, including query planner activities.       |
| REPL       | messages related to replica sets, such as initial sync or heartbeats.  |
| REPL_HB    | messages related to replica set heartbeats.                            |
| ROLLBACK   | messages related to rollback operations.                               |
| SHARDING   | messages related to sharding operations.                               |
| STORAGE    | messages related to storage activities.                                |
| JOURNAL    | messages related to journaling activities.                             |
| WRITE      | messages related to write operations, such as update commands.         |

Each of these componetes has an associated verbosity level. We can use `db.getLogComponents()` to retrieve the log components from the current database.

- The verbosity field at the top is the default verbosity level for the MongoDB server. Any of the other components can inherit from this field. The verbosity levels range between the following values:

  | Verbosity Level | Description                                                                                                                             |
  | --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
  | -1              | inherit from parent.                                                                                                                    |
  | 0               | Default verbosity. Includes informational messages only.                                                                                |
  | 1-5             | Increases the verbosity level to include debug messages. A higher verbosity level means more detailed and more frequent debug messages. |

- If we are not trying to actively identify and resolve an issue, we can leave the verbosity at 0 for a base level of monitoring.
- We'll notice that for some of these log components, there are actually subcomponents as well. The rules of inheritance and verbosity levels apply to these composed log components.

We can change the logging components levels using the `db.setLogLevel(level[, componentName])`. If no component is specified, the server verbosity (from which all components inherit from) level will be modified instead.

We can view the logs through the Mongo shell using the `db.adminCommand({ "getLog": "global" })`. If the mongod process is configured to have logs stored in a particular file, then we can inspect such file for the log messages outputted from the process.

**_we can use the `--eval` to run standalone MongoDB commands from the shell. For example:_**

```powershell
mongo --eval '
  db.products.update( { "sku" : 6902667 }, { $set : { "salePrice" : 39.99} } )
'
```

#### Dissecting the Log Message

![Dissecting the log message](dissecting-log-message.JPG)

- Timestamp: let us know when the event occurred.
- Severity Level: there are five types of severity levels:

  | Identifier | Level Description                  |
  | ---------- | ---------------------------------- |
  | F          | Fatal.                             |
  | E          | Error.                             |
  | W          | Warning.                           |
  | I          | Informational (verbosity level 0). |
  | D          | Debug (verbosity level 1-5).       |

- Component: the actual log component that the operation falls under.
- Connection: connection where the event occurred on. Connections are incremented and unique, so any events initiated by a specific connection are likely from the same client.
- Action and Namespace: more specific information on the event. From the image above, it comprises the 'command admin.$cmd' part. It means that we have a command action that was executed on the admin database. The '$cmd' indicates that this was a database command. In general, we can expect that what immediately follows the connection to be the operation that triggered the event.
- appName: indicates what client initiated the operation-- in this case, the mongo shell.
- Operation: the entire document is the skeleton of the command executed.
  - from `command: setParameter { ...` up until `... $db: "admin" }`. Under the hood, we have a set parameter commend that sets the log component verbosity of the index log component on the admin database. The command was spawned by unauthenticated user using the `db.setLogLevel` method. The `lsid: { id: ...}` is logged due to the usage of a unauthenticated user when running the command.
- Operation Metadata: relates to how the operation performed. The last data point is of particular interest; it's how long this operation took to complete.

### Profiling the Database

The database profiler can be used in conjunction with the database logs to inspect the performance and health of the server and database.

The log files are meant to give administrators operational information about an instance or process, so they can flag any errors, warningsm or interesting informational messages. For debugging slow operations, we need to be a bit more precise in the information we capture. So for this, we rely on the database profiler.

We enable profiler at the database level, meaning that the operations on each database are profiled separately. When it is enabled, the profiler will restore data for all operations on a given database, and a new collection called 'system.profile'. This collection will hold profiling data on CRUD operations, as well as administrative and configuration options. It has 3 settings:

| Level | Description                                                                            |
| ----- | -------------------------------------------------------------------------------------- |
| 0     | The profiler is off and does not collect any data. This is the default profiler level. |
| 1     | The profiler collects data for operations that take longer than the value of 'slowms'. |
| 2     | The profiler collects data for all operations, regardless how long they take.          |

- By default, MongoDB will consider any operation that takes longer than 100 milliseconds to be slow.
- Level 2 is a bit dangerous because it can result in a lot of writes to the 'system.profile' collection, and generate a lot of load on the system.

In any given database, we can get the profiling level using the `db.getProfilingLevel()` command. To set the profiling level we have to run `db.setProfilingLevel(<profilingLevel>)`. After running this command, the 'system.profile' collection is going to be created in the db. In order to see this collection, the usage of `show collection` is not enough, and we have to use the `db.runComman({ listCollections: 1 })` command.
The 'slowms' value can be set using the `db.setProfilingLevel( <profilingLevel>, { slowms: <msValue> } )` command.

The write statements in the profiler collection give us the number of document inserted, 'nInserted', and the number of index keys inserted by the operation, 'keyInserted', as well as how long the operation took in milliseconds. We can also profile read operations.

### Basic Security

MongoDB security is built around the process of authentication and authorization. When we enable authentication on a MongoDB cluster, every client must provide valid credentials for authentication.

| Authentication                       | Authorization                                       |
| ------------------------------------ | --------------------------------------------------- |
| Verifies the _identity_ of a user.   | Verifies the _privileges_ of a user.                |
| Answers the question: _Who are you?_ | Answers the question: _What do you have access to?_ |

MongoDB supports 4 different client authentication mechanisms:

- SCRAM (Salted Challenge Response Authentication Mechanism): the key here is "Challenge Response". Basically the MongoDB server presents a question or challenge to the client who must provide a valid answer or response for authentication. This is basically password security, and represents basic security for our MongoDB cluster. Every MongoDB cluster should have authentication enabled and at least SCRAM in place.

- X.509: with the community version of MongoDB, we also have the option of configuring X.509 security. This form of security uses an X.509 certificate for authentication. This is more secure, albeit more complex, authentication mechanism that is also available to us.

_MongoDB Enterprise Only_

- LDAP (Lightweight Directory Access Protocol)

- KERBEROS: designed by the MIT, it is a powerful authentication mechanism.

MongoDB also supports intra-cluster authentication, the mechanism by which nodes in a cluster authenticate to each other. Think of this like a secret handshake. Without knowing the handshake, we can't join the cluster.

All the above answer the question about "Who are you?". What about "what do you have access to?". MongoDB uses role based access control for authoring an authenticated user. Each MongoDB user has one or more roles associated to it. Each role has one or more privileges. These privileges represent a group of actions and the resources that those actions apply to. Role based access control allows us to ensure a high level of responsibility isolation among individual users. That means a user can be granted the exact roles required for that user to execute its expected workload.
Users exist per database, so we can isolate user privilege down to the database or even the collection that the user should have access to.
For the most basic security possible, create a user on the Admin database with one of the built in administrative super user roles, such as root.

#### Creating the first MongoDB Super User

To enable authentication/authorization in a MongoDB process we can specify the `--auth` flag when running the `mongod` command. Likewise, we can set the 'security.auth' field as enabled in the configuration file.

Prior to running the server, since it does not yet have any configured users in it, there's no way for us to authenticate to the server nor can we be authorized to do any considerable work. Instead we must use the 'Localhost Exception' to connect to the server; meaning we must connect to the Mongo shell from the same host that is running the MongoDB server process. Once the first user is created, the localhost exception closes. Because of this we need to always create a user with the administrative role first, so we can create other users after the localhost exception has closed.

- To ensure the we are connecting over the localhost interface, we can specify the host when running the mongoDB interface: `mongo --host 127.0.0.1:27017`.

When using the localhost exceptions, our privileges on the system are very restricted. We have to create the first user on the admin database because this is going to be an administrative super user and we are going to use the "root" built-in role. To create the user we must run the `db.createUser()` method:

```javascript
db.createUser({
  // user and pwd are used for authentication purposes and the role(s) for authorization steps
  user: "username",
  pwd: "pass",
  role: ["root"],
});
```

- The built-in role "root" provides the highest level of privilege action across all database resources.
- Since MongoDB 3.6, some additional user authentication restrictions were added in the form of an IP whitelist, meanning that the roles granted to a user depend on what IP they connect from.

The localhost exception at this point in time is exhausted, and we cannot create any additional users without authenticating first.

We can now authenticate using the `db.auth(<username>, <password>)` command from within the actual mongoDB session or running the mongo command from the shell as follows:

```powershell
mongo -u [--username] oscar -p [--password] oscar123 --authenticationDatabase admin
```

- That means if we have two users, Bob at inventory and Bob at sales, those are two different users. The authentication database dictates which user we authenticate as and what privileges we get. It is important to point the database which the user has to be authenticated against (`--authenticationDatabase` flag).

### Built-In Roles

There are two types of roles in MongoDB. They can be either _custom roles_, which are tailored roles to attend specific needs of specific users, and _built-in roles_, which are prepacked MongoDB roles.

#### Role Structure

A role is composed by the following:

- Set of privileges (actions allowed over a resource).
- Network Authentication Restrictions (clientSource and serverAddress).

If a new user is granted a given role, all privileges this role defines will be made available to the user. A privilege defines the action, or actions, that can be performed over a resource.

- A resource on its own can be defined by either of the following:

```javascript
// specific database and collection:
{ "db": "products", "collection": "inventory" }

// all databases and all collections:
{ "db": "", "collection": "" }

// any database and specific collection:
{ "db": "", "collection": "accounts" }

// specific database and any collection:
{ "db": "products", "collection": "" }

// or cluster resource:
{ "cluster": true }
```

- And the actions allowed over that same resource:

  ```javascript
  // allow to shutdown over the cluster:
  { "resource": { "cluster": true }, "actions": [ "shutdown" ] }
  ```

  - A role can also inherit from other roles, either one or several of them, making this a potentially quite elaborate achitecture of permission and privileges across several different roles.

#### Built-In Roles

- Database User:
  - 'read'
  - 'readWrite'
  - For all databases:
    - 'readAnyDatabase'
    - 'readWriteAnyDatabase'
- Database Administration:
  - 'dbAdmin'
  - 'userAdmin'
  - 'dbOwner'
  - For all databases:
    - 'dbAdminAnyDatabase'
    - 'userAdminAnyDatabase'
- Cluster Administration:
  - 'clusterAdmin'
  - 'clusterManager'
  - 'clusterMonitor'
  - 'hostManager'
- Backup/Restore:
  - 'backup'
  - 'restore'
- Super User:
  - 'root' (full privileges across all databases)

#### Creating Users and Granting Roles

To successfully create new users in our server, we must be authenticated/authorized with a role which grants user creation privileges such as "root", "userAdmin" or "dbOwner" roles. Once this is satisfied, we can use the following commands to create users and grant privileges through roles to each of them:

```javascript
db.createUser({
  user: "security_officer",
  pwd: "h3ll0th3r3",
  roles: [{ db: "admin", role: "userAdmin" }],
});

db.createUser({
  user: "dba",
  pwd: "c1lynd3rs",
  roles: [{ db: "admin", role: "dbAdmin" }],
});

// Assigning additional roles to an already existing user
db.grantRolesToUser("dba", [{ db: "playground", role: "dbOwner" }]);

// List all users from a given database with the given role, showing their privileges
db.runCommand({
  rolesInfo: { role: "dbOwner", db: "playground" },
  showPrivileges: true,
});
```

- _It is important to point out that is a recommended practice to create all new users from the "admin" database. This means that this database is going to be used to authenticate all users we create._
- Roles can also vary between databases.

_Some_ privileges on the "userAdmin", "dbAdmin" and "dbOwner" roles are the following:

| userAdmin                    | dbAdmin                  |
| ---------------------------- | ------------------------ |
| changeCustomData             | collStats                |
| changePassword               | dbHash                   |
| createRole                   | dbStats                  |
| createUser                   | killCursors              |
| dropRole                     | listIndexes              |
| dropUser                     | listCollections          |
| grantRole                    | bypassDocumentValidation |
| revokeRole                   | collMod                  |
| setAuthenticationRestriction | collStats                |
| viewRole                     | compact                  |
| viewUser                     | convertToCapped          |

- The "dbOwner" can perform any administrative action on the database. This role combines the privileges granted by the "readWrite", "dbAdmin" and "userAdmin" roles.
- Both "userAdmin" and "dbAdmin" cannot modify database data such as specific documents or fields on it. "dbAdmin" however, can drop and create collections.

### Server Tools

MongoDB installations comes with a several additional tools by default. These can be found inspecting the installation folder (on Windows: '...\Program Files\MongoDB\Server\4.0\bin'. On Linux/MacOS: '/usr/bin/'). We are going to be checking 5 of them:

- mongostat

  - It is a utility designed to give quick statistics on a running mongod or mongos process. We can check all the options available for this tool using the `--help` flag when running the command. In order to connect to a specific mongod process and get stats from it, we have to specify the port of such mongod process in the mongostat call, using the `port` flag: `mongostat --port <port>`.
  - After entering the command, it is going to return Mongo stats to the terminal every second, indefinitely, because we haven't specified when we want it to stop or how often to report. The output fields are described next:
    - > These first six fields represent the number of specific operations per second-- such as inserts, deletes, and just overall commands. The next seven fields represent lower-level memory statistics, such as dirty, which is the percentage of dirty bytes in the cache, used, which is the percentage of currently-used bytes in the cache, vsize, which is the total amount of virtual memory used by the process, and res, which is the total amount of resonant memory used by the process. Net_in and net_out are used to measure the amount of network traffic that's being received and sent out by the mongod or mongos process.

- mongodump
  - This is used to export dump files from MongoDB collections. These dump files are in BSON, or Binary JSON format. These tools are very quick because the data in MongoDB is already in BSON format, and mongodump simply needs to make a copy to export.
  - We can check all the options available for the command using the `--help` flag. A basic use of the command requires specifying a port and both a database and a collection to dump from:

```powershell
mongodump --port 30000 --db applicationData --collection products
```

  - The command is going to create a folder called 'dump' with dump files (BSON and JSON formats) related to the database and collection specified. The file with JSON format has a list of the indexes, which right now is just the one on "_id" that comes by default, and then the namespace of the collection that we dumped. The BSON file is the actual data from the collection, but it is not very readable.

- mongorestore
  - This tool achieves the inverse of mongodump. It takes a BSON dump file and creates a MongoDB collection from it. We can use the `--drop` flag to drop the current collection, and then replace it with what's in the dump file. All we need to pass is the 'dump' directory (just as the one created when running `mongodump`) because that had the metadata in JSON format, which is going to indicate any indexes and namespaces to restore.

```powershell
mongorestore --drop --port 30000 dump/
```

- mongoexport and mongoimport
  - These commands/tools deals with data in JSON format instead. The full list of options available for them can be inspected using the `--help` flag.
  - Unlike mongodump, mongoexport is not going to create a folder for us with the data. It instead is going to output the data to standard output (terminal window). We can provide a file name to contain the outputted data using the `-o` flag following the name of the file.

```powershell
mongoexport --help
mongoexport --port 30000 --db applicationData --collection products
mongoexport --port 30000 --db applicationData --collection products -o products.json
```

  - To use mongoimport we can run the commands as follows:

```powershell
mongoimport --help
mongoimport --port 30000 --db applicationData --collection products products.json
```

_It is important to note that we must provide authentication when the mongod process requires it._

## Chapter 02 - Replication

### What is Replication?

