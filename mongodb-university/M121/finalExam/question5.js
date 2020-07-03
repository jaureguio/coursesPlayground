db.cities.findOne()

/* Outputs 

{
  "_id": 10,
    "city": "San Diego",
      "region": "CA",
        "country": "USA",
          "sunnydays": [220, 232, 205, 211, 242, 270]
}

*/

db.cities.getIndexes()

/* The collection also has the following indexes 

[
  {
    "v": 2,
    "key": {
      "_id": 1
    },
    "name": "_id_",
    "ns": "test.cities"
  },
  {
    "v": 2,
    "key": {
      "city": 1
    },
    "name": "city_1",
    "ns": "test.cities"
  },
  {
    "v": 2,
    "key": {
      "country": 1
    },
    "name": "country_1",
    "ns": "test.cities"
  }
]

*/

var pipeline = [
  { "$match": { "country": "USA" } },
  { "$addFields": { "mean": { "$avg": "$sunnydays" } } },
  { "$match": { "mean": { "$gte": 220 }, "sunnydays": { "$not": { "$lt": 200 } } } },
  { "$sort": { "city": 1 } }
]

/* 

In this case, we try to remove as much data as possible upfront, all cities not matching the 
right country, using the available index.

We then calculate the mean number of sunny days.

The $match stage then filters out documents where the mean isn't greater than or equal to 220, 
and there are no entries in the sunnydays vector less than 200.

We are left with a sort in memory, however the number should be small enough to not take much 
resources.There are 285 cities with 100, 000 habitants in the USA, and some are likely not to 
match the number of sunny days criteria. 

*/