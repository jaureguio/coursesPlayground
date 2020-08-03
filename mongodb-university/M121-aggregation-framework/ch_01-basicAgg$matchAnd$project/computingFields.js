var pipeline = [
  {
    $project: {
      _id: 0,
      words_in_title: {
        $size: {
          $split: ["$title", " "],
        },
      },
    },
  },
  {
    $match: {
      words_in_title: 1,
    },
  },
];

/* course's solution

var pipeline = [
  {
    $match: {
      title: {
        $type: "string"
      }
    }
  },
  {
    $project: {
      title: { $split: ["$title", " "] },
      _id: 0
    }
  },
  {
    $match: {
      title: { $size: 1 }
    }
  }
]

*/
