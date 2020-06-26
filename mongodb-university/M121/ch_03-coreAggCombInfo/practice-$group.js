// sales and books collections with the following documents
var sales = [
  { "_id": 1, "item": "abc", "price": 10, "quantity": 2, "date": ISODate("2014-01-01T08:00:00Z") },
  { "_id": 2, "item": "jkl", "price": 20, "quantity": 1, "date": ISODate("2014-02-03T09:00:00Z") },
  { "_id": 3, "item": "xyz", "price": 5, "quantity": 5, "date": ISODate("2014-02-03T09:05:00Z") },
  { "_id": 4, "item": "abc", "price": 10, "quantity": 10, "date": ISODate("2014-02-15T08:00:00Z") },
  { "_id": 5, "item": "xyz", "price": 5, "quantity": 10, "date": ISODate("2014-02-15T09:05:00Z") },
  { "_id": 6, "item": "xyz", "price": 5, "quantity": 5, "date": ISODate("2014-02-15T12:05:10Z") },
  { "_id": 7, "item": "xyz", "price": 5, "quantity": 10, "date": ISODate("2014-02-15T14:12:12Z") },
]

var books = [
  { "_id": 8751, "title": "The Banquet", "author": "Dante", "copies": 2 },
  { "_id": 8752, "title": "Divine Comedy", "author": "Dante", "copies": 1 },
  { "_id": 8645, "title": "Eclogues", "author": "Dante", "copies": 2 },
  { "_id": 7000, "title": "The Odyssey", "author": "Homer", "copies": 10 },
  { "_id": 7020, "title": "Iliad", "author": "Homer", "copies": 10 }
]

/* 
The following pipeline calculates the total sales amount, average sales quantity, and sale count for each day in the year 2014:
*/

db.sales.aggregate([
  {
    $match: {
      "date": { $gte: new ISODate("2014-01-01"), $lt: new ISODate("2015-01-01") }
    }
  },
  {
    $group: {
      "_id": {
        $dateToString: { format: "%Y-%m-%d", date: "$date" }
      },
      totalSalesAmount: { $sum: { $multiply: ["$price", "$quantity"] } },
      averageSalesQty: { $avg: "$quantity" },
      saleCount: { $sum: 1 }
    }
  }
]).pretty()

/* 
The following aggregation operation specifies a group _id of null, calculating the total sale amount, average quantity, and count of all documents in the collection.
*/

db.sales.aggregate([
  {
    $group: {
      _id: null,
      totalSalesAmount: { $sum: { $multiply: ["$price", "$quantity"] } },
      avgQtyPerSale: { $avg: "$quantity" },
      totalSales: { $sum: 1 } 
    } 
  }
]).pretty()


/* 
Grouping the documents on the sales collection by the day and the year of the date field, the following operation uses the $push accumulator to compute the list of items and quantities sold for each group:
*/

db.sales.aggregate([
  {
    $group: {
      _id: { day: { $dayOfYear: "$date" }, year: { $year: "$date" } },
      salesList: { $push: { item: "$item", qty: "$quantity" } }
    }
  }
]).pretty()

/* 
The following aggregation operation pivots the data in the books collection to have titles grouped by authors.
*/

db.books.aggregate([
  {
    $group: {
      _id: "$author",
      books: { $push: "$title"}
    }
  }
]).pretty()