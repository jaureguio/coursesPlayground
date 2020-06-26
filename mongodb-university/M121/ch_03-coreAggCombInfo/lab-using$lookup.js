var pipeline = [
  {
    $match: {
      airplane: /747|380/
      // airplane: {
      //   $in: ["747", "380"] // Won't work because the airplane field with multiple airplanes is still and string, and not an array. Regex patterns are better suited for this case.
      // }
    }
  },
  {
    $lookup: {
      from: "air_alliances",
      // localField and foreignField can be array or single fields
      localField: "airline.name",
      foreignField: "airlines",
      as: "alliances"
    }
  },
  {
    $project: {
      _id: 0,
      alliances: {
        $map: {
          input: "$alliances",
          as: "a",
          in: "$$a.name"
        }
      }  
    }
  },
  {
    $unwind: "$alliances"
  },
  {
    $group: {
      _id: "$alliances",
      count: { $sum: 1 }
    }
  }
]

db.air_routes.aggregate(pipeline).pretty()

/* Course's Solution 

db.air_routes.aggregate([
  {
    $match: {
      airplane: /747|380/
    }
  },
  {
    $lookup: {
      from: "air_alliances",
      foreignField: "airlines",
      localField: "airline.name",
      as: "alliance"
    }
  },
  {
    $unwind: "$alliance" // alliance field would end up been an object instead of an array with an object after this unwind
  },
  {
    $group: {
      _id: "$alliance.name", // Grouping based on the name property/field from the alliance object
      count: { $sum: 1 }
    }
  },
  {
    $sort: { count: -1 }
  }
])

*/

var pipeline = [
  {
    $lookup: {
      from: "air_routes",
      let: { alliance: "$name" },
      pipeline: {
        {
          $match:
        }
      }
    }
  }
]
