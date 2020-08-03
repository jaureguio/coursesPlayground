var validateLab1 = (pipeline) => {
  let aggregations = db.getSiblingDB("aggregations");
  if (!pipeline) {
    print("var pipeline isn't properly set up!");
  } else {
    try {
      var result = aggregations.movies.aggregate(pipeline).toArray().length;
      let sentinel = result;
      let data = 0;
      while (result != 1) {
        data++;
        result = result % 2 === 0 ? result / 2 : result * 3 + 1;
      }
      if (sentinel === 23) {
        print("Answer is", data);
      } else {
        print("You aren't returning the correct number of documents");
      }
    } catch (e) {
      print(e.message);
    }
  }
};

var pipeline = [
  {
    $match: {
      $and: [
        { "imdb.rating": { $gte: 7 } },
        { $and: [{ genres: { $ne: "Crime" } }, { genres: { $ne: "Horror" } }] },
        { $or: [{ rated: "PG" }, { rated: "G" }] },
        { $and: [{ languages: "English" }, { languages: "Japanese" }] },
      ],
    },
  },
  {
    $project: {
      _id: 0,
      "imdb.rating": 1,
      genres: 1,
      rated: 1,
      languages: 1,
    },
  },
];

/* course answer
var pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: [ "Crime", "Horror" ] } ,
      rated: { $in: ["PG", "G" ] },
      languages: { $all: [ "English", "Japanese" ] }
    }
  }
]
*/
