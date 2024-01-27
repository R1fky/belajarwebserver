const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const { loadList, findList } = require("./utils/listproses");
const port = 3000;

app.use(express.static('public'))

app.set("view engine", "ejs");
app.use(expressLayouts);

app.get("/", (req, res) => {
  // res.sendFile('./index.html', {root: __dirname});
  const mahasiswa = [
    {
      nama: "Rifky Yudha Pratama",
      email: "rifky@gmail.com",
    },
    {
      nama: "Andi Muhammad",
      email: "muhammad@gmail.com",
    },
    {
      nama: "Anjay",
      email: "anjay@gmail.com",
    },
  ];
  res.render("index", {
    layout: "layouts/main-layouts",
    title: "halaman index",
    user: "rifky Yudha",
    mahasiswa,
  });
});

app.get("/list", (req, res) => {
  const lists = loadList();
  res.render("list", {
    layout: "layouts/main-layouts",
    title: "Halaman Daftar Buku",
    lists,
  });
});

app.get("/list/:judulbuku", (req, res) => {
  const list = findList(req.params.judulbuku);
  res.render("detail", {
    layout: "layouts/main-layouts",
    title: "Halaman Info lebih lanjut",
    list,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layouts",
    title: "halaman about",
  });
});

app.listen(port, () => {
  console.log(`port dijalankan adalah http://localhost:${port}`);
});
