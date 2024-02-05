const fs = require("fs");
const { stringify } = require("querystring");

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

const loadDaftarbuku = () => {
  const fileBuffer = fs.readFileSync("data/list.json", "utf-8");
  const daftarbuku = JSON.parse(fileBuffer);
  return daftarbuku;
};

const findDaftarbuku = (judulbuku) => {
    const daftarbuku = loadDaftarbuku();
    const buku = daftarbuku.find(
        (buku) => buku.judulbuku.toLowerCase() === judulbuku.toLowerCase()
    );
    return buku;
}

//menulis atau menimpa data list.json dengan data yang baru

const saveBuku = (daftarbuku) => {
  fs.writeFileSync('data/list.json', JSON.stringify(daftarbuku))
}

//menambahkan daftar buku baru 
const addBuku = (buku) => {
  const daftarbuku = loadDaftarbuku();
  daftarbuku.push(buku);
  saveBuku(daftarbuku);

};        

module.exports = { loadDaftarbuku, findDaftarbuku, addBuku }
