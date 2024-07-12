"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
    
------------------------------------------------------- */
//! Nodejs -de SQL veritabanlarini kullanmak icin, data islemlerini yapmak icin SEQUELIZE isimli ORM modulu kullaniyoruz
//! yeni proje icin yapilacak
// 1. npm init -y
// 2. .gitignore //gitignore io giderek create paste
// 3. .env PORT=800
// 4. .env'ye SQLITE= ./db.sqlite3 yaz veritabanina birikmek icin
// 5. npm i express dotenv express-async-errors
// 6. npm i sequelize sqlite3 
const express = require("express");
const app = express();
const cors = require("cors")

app.use(cors())
require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
//* Async hatayyi yakalamak icin 
require('express-async-errors')

// Accept json data:
//gonderilecek json datayi kabul et ve objeye cevir
app.use(express.json())


// app.all('/', (req, res) => {
//     res.send('WELCOME TO TODO API')
// })


//! Models:
//model controller'da kullanicagi icin todo routerda require etmemiz lazim
// const Todo = require('./app/models/todo.model.js')

/* ------------------------------------------------------- */


//! Routes:

app.use(require('./app/routes/todo.router.js'))

/* ------------------------------------------------------- */

//Error handler. (baska sayfada olan error handleri cagiriyoruz ve kullaniyoruz)
app.use(require('./app/middlewares/errorHandler'))
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));