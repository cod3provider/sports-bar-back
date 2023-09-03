const menu = require("./menu");

const invokeAction = async ({
  action,
  id,
  categories,
  favorite,
  name,
  price,
  description,
}) => {
  switch (action) {
    case "list":
      const allDishes = await menu.getAll();
      return console.log(allDishes);

    case "readById":
      const oneDish = await menu.getById(id);
      console.log(oneDish);

    case "add":
      const newDish = await menu.add({
        categories,
        favorite,
        name,
        price,
        description,
      });
      return console.log(newDish);

    case "updateById":
      const updateDish = await menu.updateById(id, {
        categories,
        favorite,
        name,
        price,
        description,
      });
      return console.log(updateDish);
    case "deleteById":
      const deleteDish = await menu.deleteById(id);
      return console.log(deleteDish);
  }
};

// invokeAction({ action: "readById", id: "21" });
// invokeAction({
//   action: "add",
//   categories: "bar",
//   favorite: "false",
//   name: "Dunkel",
//   price: "1.5",
//   description: "0.5L",
// });
// invokeAction({
//   action: "updateById",
//   id: "GEvxXt1R0itV__BCnjzoN",
//   categories: "bar",
//   favorite: "false",
//   name: "Dunkel",
//   price: "1.7",
//   description: "0.5L",
// });
// invokeAction({
//   action: "deleteById",
//   id: "GEvxXt1R0itV__BCnjzoN",
// });
