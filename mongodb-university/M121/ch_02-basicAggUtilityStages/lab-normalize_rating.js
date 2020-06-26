// general scaling
min + (max - min) * ((x - x_min) / (x_max - x_min))

// we will use 1 as the minimum value and 10 as the maximum value for scaling,
// so all scaled votes will fall into the range [1,10]

scaled_votes = 1 + 9 * ((x - x_min) / (x_max - x_min))

// NOTE: We CANNOT simply do 10 * ((x - x_min))..., results will be wrong
// Order of operations is important!

// use these values for scaling imdb.votes
x_max = 1521105
x_min = 5
min = 1
max = 10
x = imdb.votes

// within a pipeline, it should look something like the following
/*
  {
    $add: [
      1,
      {
        $multiply: [
          9,
          {
            $divide: [
              { $subtract: [<x>, <x_min>] },
              { $subtract: [<x_max>, <x_min>] }
            ]
          }
        ]
      }
    ]
  }
*/

// given we have the numbers, this is how to calculated normalized_rating
// yes, you can use $avg in $project and $addFields!
normalized_rating = average(scaled_votes, imdb.rating)

/* 
Calculate an average rating for each movie in our collection where English is an available language, the minimum imdb.rating is at least 1, the minimum imdb.votes is at least 1, and it was released in 1990 or after.You'll be required to rescale (or normalize) imdb.votes. The formula to rescale imdb.votes and calculate normalized_rating is included as a handout.

What film has the lowest normalized_rating ?
*/

var pipeline = [
  {
    $match: {
      year: { $exists: true, $gte: 1990 },
      languages: "English",
      "imdb.rating": { $exists: true, $gte: 1 },
      "imdb.votes": { $exists: true, $gte: 1 },
    }

    /* course's solution (This is the only stage that differs from my solution)
    $match: {
      year: { $gte: 1990 },
      languages: { $in: ["English"] },
      "imdb.votes": { $gte: 1 },
      "imdb.rating": { $gte: 1 }
    }
    */

  },
  {
    $project: {
      "_id": 0,
      title: 1,
      imdb: 1,
      year: 1,
      languages: 1,
      normalized_rating: {
        $avg: [
          "$imdb.rating",
          {
            $add: [
              1,
              {
                $multiply: [
                  9,
                  {
                    $divide: [
                      { $subtract: ["$imdb.votes", 5] },
                      { $subtract: [1521105, 5] },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    $sort: { normalized_rating: 1 }
  }
  ,
  {
    $limit: 1
  }
]

db.movies.aggregate(pipeline).pretty()