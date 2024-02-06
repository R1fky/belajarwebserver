const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const { loadDaftarbuku, findDaftarbuku, addBuku, cekDuplikat, deleteBuku } = require("./utils/daftarbuku");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const flash = require("connect-flash");

const port = 8080;

app.use(express.static("public")); // build-in middleware, tidak payah diinstall
app.use(express.urlencoded({ extended: true })); // buikd- in middleware

app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(cookieparser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

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

app.get("/daftarbuku", (req, res) => {
  const daftarbuku = loadDaftarbuku();
  res.render("daftarbuku", {
    layout: "layouts/main-layouts",
    title: "Halaman Daftar Buku",
    daftarbuku,
    msg: req.flash("msg"),
  });
});

//tambah-daftarbuku
app.get("/daftarbuku/add", (req, res) => {
  res.render("add-daftarbuku", {
    layout: "layouts/main-layouts",
    title: "Tambah daftar buku",
  });
});

//proses tambah daftar buku
app.post(
  "/daftarbuku",
  [
    body("judulbuku").custom((value) => {
      duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Buku ini sudah ada");
      }
      return true;
    }),
    check("penulis", "penulis harus berupa email").isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-daftarbuku", {
        title: "Form tambah daftar buku",
        layout: "layouts/main-layouts",
        errors: errors.array(),
      });
    } else {
      addBuku(req.body);
      req.flash("msg", "data berhasil ditambahkan");
      res.redirect("/daftarbuku");
    }
  }
);

//hapus data buku
app.get("/daftarbuku/delete/:judulbuku", (req, res) => {
  const daftarbuku = findDaftarbuku(req.params.judulbuku);
  if (!daftarbuku) {
    res.status(404);
    res.send("<h1>Error 404 </h1>");
  } else {
    deleteBuku(req.params.judulbuku);
    res.redirect("/daftarbuku");
  }
});

//halaman edit buku
app.get('/daftarbuku/edit/:judulbuku', (req, res) => {
  
})

// buat route sebelum detail
//detail buku
app.get("/daftarbuku/:judulbuku", (req, res) => {
  const buku = findDaftarbuku(req.params.judulbuku);
  res.render("detail", {
    layout: "layouts/main-layouts",
    title: "Halaman Info lebih lanjut",
    buku,
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
