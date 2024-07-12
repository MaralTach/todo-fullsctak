"use strict"
/*----------------------------------------

-----------------------------------------*/

//! SEQUELIZE
// $ npm i sequelize sqlite3
//hangi veri tabanini kullanicaksak onun modulunu install ediyoruz
//sonra require yapacagiz  1.njisi Sequelize, 2.njsi Datatypes destr. ediyoruz

//Sequelize indirdikten sonra require yapiyoruz ve sonra 2 tane objeyi requiredan destr olarak aliyoruz
const {Sequelize, DataTypes, Error} = require('sequelize')

//Connection
//Sequelize(parantezin icin kullanacagimiz veri tab. ismi ve sonra onun nerede oldugunu yaziyoruz)
//sequelize instance dir
// const sequelize = new Sequelize('sqlite:./db.sqlite3')
// const sequelize = new Sequelize('sqlite:' + process.env.SQLITE)
//.env de bulamazsa || ./db.sqlite3  bu kodu yazacagiz 

const sequelize = new Sequelize('sqlite:' + (process.env.SQLITE || './db.sqlite3'))


//* Sequelize MODEL olusturma:
// model komutu icin: sequelize.define('tableName',{...columns})
//Herbir model, veritabaninda bir tabloya karsilik gelir
//model genelde Pascal case dir
//sutun ozelliklerini {} icinde table name dan sonra yaziyoruz
// mongodbde _id kullanilir
//sutunlere obje kullanirken Datatypes kullaniyoruz

const Todo = sequelize.define('todos', {
  //id belirtmegimize gerek yok. sequelize id sutununu otomatik olusturar 
    // id:{
    //     type:DataTypes.INTEGER, //DataType sutun veri tipi  //kesin kullanicagiz
    //     allowNull:false,    //default:true // sutun verisi bos olabilirmi //duruma gore kullanicagiz
    //     unique:true,        //default: false //  benzersiz kayitmi?
    //     defaultValue:'', //kayit eklendiginde default olarak ne yazilsin
    //     comment:"yorum icin",  
    //     primaryKey: true,       //default:false //tablonun her bir kaydini ifade edenbenzersiz numara
    //     autoIncrement:true,
    //     field:'custom_field_name'

    // },

    //cretedAt ve updateAt tanimlamaya gerek yok. sequelize otomatik tanimlar
    title:{
        type:DataTypes.STRING(256), //arka planda varchar(256)
        allowNull:false
    },

    description:DataTypes.TEXT, //ShortHand

    priority:{
        type:DataTypes.TINYINT,
        allowNull:false,
        defaultValue: 0 
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
})

//sync veritabani 0 sa tablo yoksa olusturur. var tabloyu olusturmaz degisikligi algylamaz
//! sequelize.sync() CREATE TABLE 

// degisikligi eklemek icin // !force:true  kullaniyoruz
// sequelize.sync({force:true})

//datalarin ucmamasi icin silinmemesi icin //! alter:true
//her kaydetdigimizde ekliyor ve siliyor. onun icin bir kere calistiktan sonra yoruma alinmasi gerekiyor.cok ciddi hatalara yol acabilir 
// sequelize.sync({ alter:true })



//* Connet to DB: veritabanina baglanmak then catch ()=>
sequelize.authenticate()
    .then(()=> console.log('* DB connect *'))
    .catch(()=> console.log('* DB not connect *'))





    //Model Export:
    module.exports = Todo

