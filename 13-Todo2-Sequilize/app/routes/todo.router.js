"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
    
------------------------------------------------------- */
// const router = express.Router()
const router = require('express').Router()

//Controller:
const todo = require('../controllers/todo.controller')


//* LIST TODOS
//butun datalari almanin komutu findAll()
//listlemeke icin status kodu 200

router.get('/', todo.list)


//?  CRUD: Create Read Update Delete

//CREATE TODOyeni todo ekleme
//* TODO metodlari async dir bunun icin await yapiyoruz ve routari async yapyoruz 
//create veritabaninda kayit eder
//Executing (default): INSERT INTO `todos` (`id`,`title`,`description`,`priority`,`isDone`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5,$6);
// router.post('/', todo.create )

// //READ TODO:
// router.get('/:id', todo.read)

// //Nodejs de put-patch ayrimi yoktur. guncelliyor. normal sartlarda datanin tumunu gondermen gerekiyor
// router.put('/:id', todo.update )


// router.delete('/:id',todo.delete)

/*------------------------------------------*/ 

router.route('/')
    .get(todo.list)
    .post(todo.create)

router.route('/:id')
    .get(todo.read)
    .put(todo.update)
    .delete(todo.delete)

module.exports = router