/* 
How many movies are in both the top ten highest rated movies according to the imdb.rating and the metacritic fields? We should get these results with exactly one access to the database.

Hint: What is the intersection?
*/

var pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 0 },
      metacritic: { $gte: 0 },
    },
  },
  {
    $facet: {
      // Project stages should be taken out of the facet sub-pipelines. We are duplicating work doing it in both sub-pipelines.
      sortedByImdbRating: [
        {
          $project: {
            _id: 0,
            title: 1,
            "imdb.rating": 1,
          },
        },
        {
          $sort: { "imdb.rating": -1 },
        },
        {
          $limit: 10,
        },
      ],
      sortedByMetacritic: [
        {
          $project: {
            _id: 0,
            title: 1,
            metacritic: 1,
          },
        },
        {
          $sort: { metacritic: -1 },
        },
        {
          $limit: 10,
        },
      ],
    },
  },
  {
    $project: {
      moviesInCommon: {
        $size: {
          $setIntersection: [
            "$sortedByImdbRating.title",
            "$sortedByMetacritic.title",
          ],
        },
      },
    },
  },
];

db.movies.aggregate(pipeline).pretty();

/* Course's solution

var pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 0 },
      "metacritic": { $gte: 0 }
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      imdbRating: "$imdb.rating",
      metacritic: 1
    }
  },
  {
    $facet: {
      top_metacritic: [
        {
          $sort: {
            metacritic: -1,
            title: 1
          }
        },
        {
          $limit: 10
        },
        {
          $project: {
            title: 1
          }
        }
      ],
      top_imdb: [
        {
          $sort: {
            imdbRating: -1,
            title: 1
          }
        },
        {
          $limit: 10
        },
        {
          $project: {
            title: 1
          }
        }
      ]
    }
  },
  {
    $project: {
      top_movies: {
        $setIntersection: [ "$top_metacritic.title", "$top_imdb.title" ]
      }
    }
  }
]

*/
