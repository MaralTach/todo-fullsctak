"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
    
------------------------------------------------------- */
// const router = express.Router()
const router = require('express').Router()

const Todo = require('../models/todo.model')

//* LIST TODOS
//butun datalari almanin komutu findAll()
//listlemeke icin status kodu 200

router.get('/', async (req,res)=>{
    //    const data = await Todo.findAll()

    //datalarin kayit sayisinida verir findAndCountAll()
       const data = await Todo.findAndCountAll()


       res.status(200).send({
        error: false,
        result: data
    })
})


//?  CRUD: Create Read Update Delete

//CREATE TODOyeni todo ekleme
//* TODO metodlari async dir bunun icin await yapiyoruz ve routari async yapyoruz 
//create veritabaninda kayit eder
//Executing (default): INSERT INTO `todos` (`id`,`title`,`description`,`priority`,`isDone`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5,$6);
router.post('/', async (req,res)=>{

    // const receivedData = req.body
    // console.log(receivedData)

   
    // const data = await Todo.create({
    //     title:receivedData.title,
    //     description:receivedData.description,
    //     priority:receivedData.priority,
    //     isDone:false
    // })

    const data = await Todo.create(req.body)
    // console.log(data)

    res.status(201).send({
        error: false,
        result: data.dataValues
    })

})

//READ TODO:
router.get('/:id', async(req,res)=>{

    // const data = await Todo.findOne({where: {id: req.params.id}}) //TEK BIR KAYIT GETIRECEK olmasi gereken findOne

    //findByPk ilede id okuyabiliriz 
    const data = await Todo.findByPk(req.params.id)

    res.status(200).send({
        error:false,
        result: data
    })
})

//Nodejs de put-patch ayrimi yoktur. guncelliyor. normal sartlarda datanin tumunu gondermen gerekiyor
router.put('/:id', async (req, res)=>{

    //filter kaydini bul ve newData ile gonderilecek olani guncelle
    //newdata req.body ile gelecek
    // const data = await Todo.update({...newData}, {...filter})

    const data = await Todo.update(req.body,{where: {id: req.params.id} })
    // console.log(data)

    res.status(202).send({
        error:false,
        result:data,
        message:(data[0]>=1 ? 'Updated' : 'Can not updated'),
        //guncellendikten sonra yeni halini gormek icin:
        new: await Todo.findByPk(req.params.id) // guncellenmis kaydini goster

    })
})


router.delete('/:id',async (req,res)=>{
    //delete komutu destroy. bir parametre aliyor(neyi sileceksin)
    // const data = await Todo.destroy({...filter})
    const data = await Todo.destroy({where: {id: req.params.id}})
    // console.log(data)

    // res.status(204).send({
    //     error:false,
    //     result:data,
    //     message:(data>=1 ? 'Deleted' : 'data silinemedi Deleted')
    // })

    if (data >=1){
        //deleted

      //sadece status code ciktisi icin
          res.sendStatus(204)
       
    }else{
        //not deleted
        // 
        
        res.errorStatusCode = 404
        throw new Error('Can not Deleted,maybe already deleted?')
    }
})
module.exports = router