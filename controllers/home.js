const Item = require("../models/item");

const ITEMS_PER_PAGE = 9;

exports.getIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  if (!req.user) {
    return res.redirect('/login')
  }
  const numItem = await Item.find({userId: req.user._id}).countDocuments();
  totalItems = numItem;
  const items = await Item.find({userId: req.user._id})
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);
  res.render("index.ejs", {
    items: items,
    pageTitle: "Alexandryte",
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
  });
};

exports.getSearch = async (req,res,next) => {
  const page = +req.query.page || 1;
  let totalItems; 
  let searchTitle = req.query.title
  let searchType = req.query.type
  let searchStatus = req.query.userStatus
  let searchTags = req.query.tags
  if (!req.user) {
    return res.redirect('/login')
  }
  const numItem = await Item.find(
    {
      userId: req.user._id,
      $or: [
        {title: searchTitle == "" ? "" : {"$regex": searchTitle}},
        {type: searchType == "" ? "" : {"$regex": searchType}},
        {userStatus: searchStatus },
        {tags: {$in: searchTags.slice(', ')}}
      ]
    }).countDocuments();
  totalItems = numItem;
  const items = await Item.find(
    {
      userId: req.user._id,
      $or: [
        {title: searchTitle == "" ? "" : {"$regex": searchTitle}},
        {type: searchType == "" ? "" : {"$regex": searchType}},
        {userStatus: searchStatus == "" ? "" : {"$regex": searchStatus}},
        {tags: {$in: searchTags.slice(', ')}}
      ]
    })
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);
  res.render("index.ejs", {
    items: items,
    pageTitle: "Alexandryte",
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
  });
}

exports.getDetail = async (req, res, next) => {
  const itemId = req.params.itemId;
  try {
    const item = await Item.findById(itemId);
    res.render("home/detail.ejs", {
      item: item,
      pageTitle: item.title + " details",
    });
  } catch (error) {
    console.log(error);
  }
};
