var pipeline = [
  {
    $match: {
      name: "OneWorld"
    }
  },
  {
    $lookup: {
      from: "air_airlines",
      pipeline: [
        {
          $match: {
            $expr: {
              $in:["$country", ["Germany", "Spain", "Canada"] ]
            }
          }
        }
      ],
      as: "airlines"
    }
  },
  {
    $project: {
      _id: 0,
      airlines: {
        $map: {
          input: "$airlines",
          as: "a",
          in: {
            name: "$$a.name",
            base: "$$a.base",
            country: "$$a.country"
          }
        }
      }
    }
  },
  {
    $graphLookup: {
      from: "air_routes",
      startWith: "$airlines.base",
      connectFromField: "dst_airport",
      connectToField: "src_airport",
      as: "connections",
      maxDepth: 1,
    }
  },
  // TODO
]

db.air_alliances.aggregate(pipeline).pretty()

/* Course's Solution 

db.air_alliances.aggregate([
  {
    $match: { name: "OneWorld" }
  },
  {
    $graphLookup: {
      startWith: "$airlines",
      from: "air_airlines",
      connectFromField: "name",
      connectToField: "name",
      as: "airlines",
      maxDepth: 0,
      restrictSearchWithMatch: {
        country: { $in: ["Germany", "Spain", "Canada"] }
      }
    }
  },
  {
    $graphLookup: {
      from: "air_routes",
      startWith: "$airlines.base",
      connectFromField: "dst_airport",
      connectToField: "src_airport",
      as: "connections",
      maxDepth: 1
    }
  },
  {
    $project: {
      validAirlines: "$airlines.name",
      "connections.dst_airport": 1,
      "connections.airline.name": 1
    }
  },
  { $unwind: "$connections" },
  {
    $project: {
      isValid: {
        $in: ["$connections.airline.name", "$validAirlines"]
      },
      "connections.dst_airport": 1
    }
  },
  { $match: { isValid: true } },
  {
    $group: {
      _id: "$connections.dst_airport"
    }
  },
])

*/