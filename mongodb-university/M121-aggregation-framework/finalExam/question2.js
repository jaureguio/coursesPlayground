db.collection.find()

/* Outputs 

  {
    "a": [1, 34, 13]
  }

  *** _id fiels is automatically added by MongoDB
 
*/

db.collection.aggregate([
  { "$project": { "a": { "$max": "$a" } } },
  { "$group": { "_id": "$$ROOT._id", "all_as": { "$sum": "$a" } } }
])

/* 
  This is correct. Although we may argue that $ROOT variable is totally unnecessary, since _id field
  will be projected by default from the first $project stage of this pipeline, there are no observable
  errors with the use of this expression variable
*/