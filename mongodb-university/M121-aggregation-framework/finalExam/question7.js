// Using the air_alliances and air_routes collections, find which alliance has the most 
// unique carriers(airlines) operating between the airports JFK and LHR, in either directions.
// 
// Names are distinct, i.e.Delta != Delta Air Lines
// 
// src_airport and dst_airport contain the originating and terminating airport information.

var pipeline = [
  {
    $unwind: "$airlines"
  },
  {
    $lookup: {
      from: "air_routes",
      let: {
        airline: "$airlines",
      },
      pipeline: [
        { $match: 
          { $expr: 
            { $and: 
              [
                {
                  $eq: ["$$airline", "$airline.name"]
                },
                { 
                  $or: [
                    { 
                      $and: [ 
                        { $eq: ["$src_airport", "JFK"] },
                        { $eq: ["$dst_airport", "LHR"] },
                      ],
                    },
                    {
                      $and: [   
                        { $eq: ["$src_airport", "LHR"] },
                        { $eq: ["$dst_airport", "JFK"] },
                      ]
                    }
                  ]
                }
              ]     
            }
          }
        },
      ],
      as: "routes"
    }
  },
  {
    $match: {
      routes: { $elemMatch: { $exists: true } }
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      routes: {
        $arrayElemAt: ["$routes.airline.id", 0]
      }
    }
  },
  {
    $group: {
      _id: "$name",
      count: { $sum: 1 }
    }
  }
]

db.air_alliances.aggregate(pipeline).pretty()

/* Output

{ "_id" : "SkyTeam", "count" : 2 },
{ "_id" : "OneWorld", "count" : 4 }

*/

/* Course's solution

db.air_routes.aggregate([
  // fetch routes that originate or end at either LHR and JFK
  {
    $match: {
      src_airport: { $in: ["LHR", "JFK"] },
      dst_airport: { $in: ["LHR", "JFK"] }
    }
  },
  // matching member airline names in the airlines field to the local airline.name
  // field in the route
  {
    $lookup: {
      from: "air_alliances",
      foreignField: "airlines",
      localField: "airline.name",
      as: "alliance"
    }
  },
  {
    $match: { alliance: { $ne: [] } }
  },
  // remove routes that are not members of an alliance. We use $addFields to cast just 
  // the name of the alliance and extract a single element in one go
  {
    $addFields: {
      alliance: { $arrayElemAt: ["$alliance.name", 0] }
    }
  },
  // $group on the airline.id, since we don't want to count the same airline twice.
  // We take the $first alliance name to avoid duplicates. Then, we use $sortByCount to 
  // get our answer from the results
  {
    $group: {
      _id: "$airline.id",
      alliance: { $first: "$alliance" }
    }
  },
  {
    $sortByCount: "$alliance"
  }
]).pretty()

*/