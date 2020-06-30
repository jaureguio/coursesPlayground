db.movies.aggregate([
  {
    $sortByCount: "$imdb.rating",
  },
  {
    $match: {
      _id: { $gte: 9 },
    },
  },
]);

/* Output

{ "_id" : 9, "count" : 22 },
{ "_id" : 9.2, "count" : 11 },
{ "_id" : 9.1, "count" : 10 },
{ "_id" : 9.5, "count" : 4 },
{ "_id" : 9.4, "count" : 4 },
{ "_id" : 9.3, "count" : 3 },
{ "_id" : 9.6, "count" : 1 }

*/

/* The previous pipeline using $sortByCount is analogous to using $group and $sort stages in that order */

db.movies.aggregate([
  {
    $group: {
      _id: "$imdb.rating",
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1 },
  },
  {
    $match: {
      _id: { $gte: 9 },
    },
  },
]);
