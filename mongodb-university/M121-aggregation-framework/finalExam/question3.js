db.people.find()
/* Outputs 

{ "_id" : 0, "name" : "Bernice Pope", "age" : 69, "date" : ISODate("2017-10-04T18:35:44.011Z") }
{ "_id" : 1, "name" : "Eric Malone", "age" : 57, "date" : ISODate("2017-10-04T18:35:44.014Z") }
{ "_id" : 2, "name" : "Blanche Miller", "age" : 35, "date" : ISODate("2017-10-04T18:35:44.015Z") }
{ "_id" : 3, "name" : "Sue Perez", "age" : 64, "date" : ISODate("2017-10-04T18:35:44.016Z") }
{ "_id" : 4, "name" : "Ryan White", "age" : 39, "date" : ISODate("2017-10-04T18:35:44.019Z") }
{ "_id" : 5, "name" : "Grace Payne", "age" : 56, "date" : ISODate("2017-10-04T18:35:44.020Z") }
{ "_id" : 6, "name" : "Jessie Yates", "age" : 53, "date" : ISODate("2017-10-04T18:35:44.020Z") }
{ "_id" : 7, "name" : "Herbert Mason", "age" : 37, "date" : ISODate("2017-10-04T18:35:44.020Z") }
{ "_id" : 8, "name" : "Jesse Jordan", "age" : 47, "date" : ISODate("2017-10-04T18:35:44.020Z") }
{ "_id" : 9, "name" : "Hulda Fuller", "age" : 25, "date" : ISODate("2017-10-04T18:35:44.020Z") }

*/

db.people.aggregate(pipeline)

/* Outputs

{ "_id" : 8, "names" : ["Sue Perez"], "word" : "P" }
{ "_id" : 9, "names" : ["Ryan White"], "word" : "W" }
{ "_id" : 10, "names" : ["Eric Malone", "Grace Payne"], "word" : "MP" }
{ "_id" : 11, "names" : ["Bernice Pope", "Jessie Yates", "Jesse Jordan", "Hulda Fuller"], "word" : "PYJF" }
{ "_id" : 12, "names" : ["Herbert Mason"], "word" : "M" }
{ "_id" : 13, "names" : ["Blanche Miller"], "word" : "M" }

*/

// The following pipeline is the answer

var pipeline = [
  {
    "$project": {
      "surname_capital": { "$substr": [{ "$arrayElemAt": [{ "$split": ["$name", " "] }, 1] }, 0, 1] },
      "name_size": { "$add": [{ "$strLenCP": "$name" }, -1] },
      "name": 1
    }
  },
  {
    "$group": {
      "_id": "$name_size",
      "word": { "$push": "$surname_capital" },
      "names": { "$push": "$name" }
    }
  },
  {
    "$project": {
      "word": {
        "$reduce": {
          "input": "$word",
          "initialValue": "",
          "in": { "$concat": ["$$value", "$$this"] }
        }
      },
      "names": 1
    }
  },
  {
    "$sort": { "_id": 1 }
  }
]