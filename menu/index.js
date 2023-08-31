const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const { markAsUntransferable } = require("worker_threads");

const menuPath = path.join(__dirname, "baseMenu.json");

const getAll = async () => {
  const data = await fs.readFile(menuPath, "utf-8");
  return JSON.parse(data);
};

const getById = async (id) => {
  const allMenu = await getAll();
  const result = allMenu.find((item) => item.id === id);
  return result || null;
};

const add = async ({ categories, favorite, name, price, description }) => {
  const menu = await getAll();

  const newDish = {
    id: nanoid(),
    categories,
    favorite,
    name,
    price,
    description,
  };

  menu.push(newDish);
  await fs.writeFile(menuPath, JSON.stringify(menu, null, 2));
  return newDish;
};

const updateById = async (id, data) => {
  const menu = await getAll();
  const index = menu.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  menu[index] = { id, ...data };
  await fs.writeFile(menuPath, JSON.stringify(menu, null, 2));
  return menu[index];
};

const deleteById = async (id) => {
  const menu = await getAll();
  const index = menu.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = menu.splice(index, 1);
  await fs.writeFile(menuPath, JSON.stringify(menu, null, 2));
  return result;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
