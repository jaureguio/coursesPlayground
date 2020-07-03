/* example

db.movies.aggregate([
  { $match: { title: /\b(is.*beautiful|beautiful.*is)\b/gi } },
  {
    $project: {
      _id: 0,
      title: 1,
      cast: 1,
      writers: {
        $map: {
          input: "$writers",
          as: "writer",
          in: {
            $arrayElemAt: [
              {
                $split: ["$$writer", " ("],
              },
              0,
            ],
          },
        },
      },
    },
  },
]); 

*/

/* 

Let's find how many movies in our movies collection are a "labor of love", where the same person appears in cast, directors, and writers. 
Hint: You will need to use $setIntersection operator in the aggregation pipeline to find out the result.
Note that your dataset may have duplicate entries for some films. You do not need to count the duplicate entries. 

*/

db.movies.aggregate([
  {
    $project: {
      _id: 0,
      cast: 1,
      directors: 1,
      writers: {
        $map: {
          input: "$writers",
          as: "writer",
          in: {
            $arrayElemAt: [
              {
                $split: ["$$writer", " ("],
              },
              0,
            ],
          },
        },
      },
    },
  },
  {
    $project: {
      multiple_roles: {
        $setIntersection: ["$cast", "$directors", "$writers"],
      },
    },
  },
  {
    // There are times when we want to make sure that the field is an array, and 
    // that it is not empty. We can do this within $match.
    $match: {
      multiple_roles: { $elemMatch: { $exists: true } },
    },
  },
  {
    $count: "Labors of love",
  },
]);

/* Another count approach using .itcount()  (SLOWER ???)

db.movies.aggregate([
  {$stage1},
  {$stage2},
  {...$stageN}
]).itcount()

*/

/*  course's solution

db.movies.aggregate([
  {
    $match: {
      cast: { $elemMatch: { $exists: true } },
      directors: { $elemMatch: { $exists: true } },
      writers: { $elemMatch: { $exists: true } }
    }
  },
  {
    $project: {
      _id: 0,
      cast: 1,
      directors: 1,
      writers: {
        $map: {
          input: "$writers",
          as: "writer",
          in: {
            $arrayElemAt: [
              {
                $split: ["$$writer", " ("]
              },
              0
            ]
          }
        }
      }
    }
  },
  {
    $project: {
      labor_of_love: {
        // $gt will return true or false. WHEN USING $size WE NEED TO ENSURE THAT NO NULL VALUE ARRAYS ARE INVOLVED!!!
        $gt: [
          { $size: { $setIntersection: ["$cast", "$directors", "$writers"] } },
          0
        ]
      }
    }
  },
  {
    $match: { labor_of_love: true }
  },
  {
    $count: "labors of love"
  }
])

*/
