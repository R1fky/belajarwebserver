const fs = require("fs");

//membuat direktori
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file jika belum ada
const dataPath = "./data/list.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// fungsi untuk membaca file contacts.json
// ambil semuda data di contact.json

const loadList = () => {
  const fileBuffer = fs.readFileSync("data/list.json", "utf-8");
  const lists = JSON.parse(fileBuffer);
  return lists;
};

const findList = (judulbuku) => {
    const lists = loadList();
    const list = lists.find(
        (list) => list.judulbuku.toLowerCase() === judulbuku.toLowerCase()
    );
    return list;
}

module.exports = { loadList, findList }
