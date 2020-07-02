// Using the air_alliances and air_routes collections, find which alliance has the most 
// unique carriers(airlines) operating between the airports JFK and LHR, in either directions.
// 
// Names are distinct, i.e.Delta != Delta Air Lines
// 
// src_airport and dst_airport contain the originating and terminating airport information.

var pipeline = [ 
  {
    $group:{
      _id: null,
      airlines:{
        $push: "$airlines" 
      },
    }
  },
  {
    $addFields: {
      commonOneStar: "$airlines.0" ,
      commonOneSky: { $setIntersection: ["$airlines.0", "$airlines.2"] },
      commonStarSky: { $setIntersection: ["$airlines.1", "$airlines.2"] }
    }
  }
]

db.air_alliances.aggregate(pipeline).pretty()