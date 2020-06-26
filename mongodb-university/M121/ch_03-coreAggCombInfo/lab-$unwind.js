var pipeline = [
  {
    $match: {
      cast: {
        $elemMatch: { $exists: true }
      },
      "imdb.rating": {
        $type: 1
      },
      languages: "English"
    }
  },
  {
    $project: {
      _id: 0,
      cast: 1,
      rating: "$imdb.rating",
    }
  },
  {
    $unwind: "$cast"
  },
  {
    $group: {
      _id: "$cast",
      numFilms: { $sum: 1 },
      average: { $avg: "$rating" }
    }
  },
  {
    $addFields: {
      average: {
        $trunc: [ "$average", 1 ]
      }
    }
  },
  {
    $sort: { numFilms: -1 }
  },
  {
    $limit: 10
  }
]

db.movies.aggregate(pipeline).pretty()

/* Course's solution

var pipeline = [
  {
    $match: {
      languages: "English"
    }
  },
  {
    $project: { _id: 0, cast: 1, "imdb.rating": 1 }
  },
  {
    $unwind: "$cast"
  },
  {
    $group: {
      _id: "$cast",
      numFilms: { $sum: 1 },
      average: { $avg: "$imdb.rating" }
    }
  },
  {
    $project: {
      numFilms: 1,
      average: {
        // By the time of this solution, $trunc just converted values to integers.
        // Because of this, the need to multiply the average by 10 to preserve the first decimal at the moment of truncating the value.
        $divide: [{ $trunc: { $multiply: ["$average", 10] } }, 10]
      }
    }
  },
  {
    $sort: { numFilms: -1 }
  },
  {
    $limit: 1
  }
]

*/