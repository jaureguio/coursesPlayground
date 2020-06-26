var doc = {
  title: "The Woman Always Pays",
  cast: ["Asta Nielsen", "Robert Dinesen", "Poul Reumert", "Hans Neergaard"],
  countries: ["Denmark"],
  tomatoes: {
    viewer: {
      rating: 3.3,
      numReviews: 55,
      meter: 50,
    },
  },
};

var favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

var pipeline = [
  {
    $match: {
      cast: { $elemMatch: { $exists: true } },
      countries: "USA",
      "tomatoes.viewer.rating": {
        $gte: 3,
      },
    },
  },
  {
    $project: {
      title: 1,
      cast: 1,
      rating: "$tomatoes.viewer.rating",
      countries: 1,
      _id: 0,
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          // Practicing with $let aggregation operator
          $let: {
            vars: { favs: favorites },
            in: {
              $setIntersection: ["$cast", "$$favs"],
            },
          },
        },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      rating: -1,
      title: -1,
    },
  },
  {
    $limit: 25,
  },
  {
    $skip: 24,
  },
];

db.movies.aggregate(pipeline).pretty();

/* course's solution

var pipeline = [
  {
    $match: {
      "tomatoes.viewer.rating": { $gte: 3 },
      countries: "USA",
      cast: {
        $in: favorites
      }
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      "tomatoes.viewer.rating": 1,
      num_favs: {
        $size: {
          $setIntersection: [
            "$cast",
            favorites
          ]
        }
      }
    }
  },
  {
    $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 }
  },
  {
    $skip: 24
  },
  {
    $limit: 1
  }
])

db.movies.aggregate(pipeline).pretty()
*/
