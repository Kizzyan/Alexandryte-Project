const Item = require("../models/item");

const removeItem = (item, list) => {
  const index = list.indexOf(item);
  return list.splice(index, 1);
};

exports.getAddItem = (req, res, next) => {
  res.render("user/add-item.ejs", {
    pageTitle: "Add Item",
    isEdit: false,
    item: {},
  });
};

exports.postAddItem = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const type = req.body.type;
  const itemStatus = req.body.itemStatus;
  const userStatus = req.body.userStatus;
  const totalChap = req.body.totalChap;
  const stopChap = req.body.stopChap;
  const tags = req.body.tags;
  const user = req.user;

  const item = new Item({
    title: title,
    imageUrl: imageUrl,
    type: type,
    itemStatus: itemStatus,
    userStatus: userStatus,
    totalChap: totalChap,
    stopChap: stopChap,
    tags: tags.split(", "),
    userId: user,
  });

  try {
    await item.save();
    user.itemList.push(item);
    await user.save();
    res.redirect("/");
  } catch (error) {
    console.log("Could not create item due:", error);
  }
};

exports.getEditItem = async (req, res, next) => {
  const itemId = req.params.itemId;
  try {
    const item = await Item.findById(itemId);
    !item
      ? res.redirect("/")
      : res.render("user/add-item.ejs", {
          pageTitle: "Edit Item",
          item: item,
          isEdit: true,
        });
  } catch (error) {
    console.log(error);
  }
};

exports.postEditItem = async (req, res, next) => {
  const itemId = req.body.itemId;
  const newTags = req.body.tags;

  const item = await Item.findById(itemId);
  item.title = req.body.title;
  item.imageUrl = req.body.imageUrl;
  item.type = req.body.type;
  item.itemStatus = req.body.itemStatus;
  item.userStatus = req.body.userStatus;
  item.totalChap = req.body.totalChap;
  item.stopChap = req.body.stopChap;
  item.tags = newTags.split(", ");

  try {
    await item.save();
    res.redirect(`/item/${itemId}`);
  } catch (error) {
    console.log("Could not updated item due:", error);
  }
};

exports.deleteItem = async (req, res, next) => {
  const itemId = req.params.itemId;
  const user = req.user;
  try {
    removeItem(itemId, user.itemList);
    await user.save();
    await Item.findByIdAndDelete(itemId);
    res.redirect("/");
  } catch (error) {
    console.log("Could not delete due:", error);
  }
};
