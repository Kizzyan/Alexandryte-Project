const Item = require("../models/item");

const ITEMS_PER_PAGE = 9;

exports.getItem = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  Item.find()
    .countDocuments()
    .then((numItem) => {
      totalItems = numItem;
      return Item.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((items) => {
      res.render("index.ejs", {
        items: items,
        pageTitle: "Home",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    });
};

exports.getDetail = async (req, res, next) => {
  const itemId = req.params.itemId;
  try {
    const item = await Item.findById(itemId);
    res.render("home/detail.ejs", {
      item: item,
      pageTitle: "Item Detail",
    });
  } catch (error) {
    console.log(error);
  }
};
