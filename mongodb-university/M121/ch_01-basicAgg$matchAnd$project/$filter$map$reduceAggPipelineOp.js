/* 

---> sales collection: 
[
  { _id: 0, items: [ { item_id: 43, quantity: 2, price: 10 }, { item_id: 2, quantity: 1, price: 240 } ] },
  { _id: 1, items: [ { item_id: 23, quantity: 3, price: 110 }, { item_id: 103, quantity: 4, price: 5 }, { item_id: 38, quantity: 1, price: 300 } ] },
  { _id: 2, items: [ { item_id: 4, quantity: 1, price: 23 } ] }
]

---> pages collection (one document):
[
  {
    "category": "unix",
    "pages": [
      { "title": "awk for beginners", reviews: 5 },
      { "title": "sed for newbies", reviews: 0 },
      { "title": "grep made simple", reviews: 2 },
    ]
  }
]

*/
/* FILTER OPERATOR */

// Using the $filter operator to project docs whose items have a price greater than or equal to 100
db.sales.aggregate([
  {
    $project: {
      items: {
        $filter: {
          input: "$items",
          as: "i",
          cond: { $gte: ["$$i.price", 100] },
        },
      },
    },
  },
]);

/* Outputs:
{ "_id" : 0, "items" : [ { "item_id" : 2, "quantity" : 1, "price" : 240 } ] }
{ "_id" : 1, "items" : [ { "item_id" : 23, "quantity" : 3, "price" : 110 }, { "item_id" : 38, "quantity" : 1, "price" : 300 } ] }
{ "_id" : 2, "items" : [ ] }
*/

// Using the $filter, $zip, and $let operators to: zip the elements of the pages array with their given index and then filter out the pages with reviews lower than 1
db.pages.aggregate([
  {
    $project: {
      _id: false,
      pages: {
        $filter: {
          input: {
            $zip: {
              inputs: ["$pages", { $range: [0, { $size: "$pages" }] }],
            },
          },
          as: "pageWithIndex",
          cond: {
            $let: {
              vars: {
                page: { $arrayElemAt: ["$$pageWithIndex", 0] },
              },
              in: { $gte: ["$$page.reviews", 1] },
            },
          },
        },
      },
    },
  },
]);

/* Outputs
{
  "pages" : [
    [ { "title" : "awk for beginners", "reviews" : 5 }, 0 ],
    [ { "title" : "grep made simple", "reviews" : 2 }, 2 ] 
  ]
}
*/

/* MAP OPERATOR */

// Using the $map operator (in conjunction with $add) to retrieve each document in the items array and increment their quantity field by 1.

db.sales.aggregate([
  {
    $addFields: {
      items: {
        $map: {
          input: "$items",
          as: "i",
          in: {
            item_id: "$$i.item_id",
            quantity: { $add: ["$$i.quantity", 1] },
            price: "$$i.price",
          },
        },
      },
    },
  },
]);

/* Outputs:
{ "_id" : 0, "items" : [ { "item_id" : 43, "quantity" : 3, "price" : 10 }, { "item_id" : 2, "quantity" : 2, "price" : 240 } ] }
{ "_id" : 1, "items" : [ { "item_id" : 23, "quantity" : 4, "price" : 110 }, { "item_id" : 103, "quantity" : 5, "price" : 5 }, { "item_id" : 38, "quantity" : 2, "price" : 300 } ] }
{ "_id" : 2, "items" : [ { "item_id" : 4, "quantity" : 2, "price" : 23 } ] }
*/

/* REDUCE OPERATOR */

//
