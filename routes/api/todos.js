const Task = require('../../db').Tasks1
const Note = require('../../db').Notes1
const route = require('express').Router()
const { Op } = require("sequelize");


route.get('/',(req,res)=>{
    Task.findAll()
        .then((tasks)=>{
            res.status(200).send(tasks)
        })
        .catch((error)=>{
            res.status(500).send({
                error:"Could not find the required task"
            })
        })
})

route.get('/:id',(req,res)=>{
    const id = req.params.id
    Task.findByPk(id)
    .then((tasks)=>{
        res.status(200).send(tasks)
    })
    .catch((error)=>{
        res.status(500).send({
            error:"Could not find the user with id"+res.id
        })
        
    })
})

route.post('/',async (req,res)=>{
     await Task.create({
        
        description:"desc value ",
        title: req.body.title,
        duedate: req.body.duedate,
        status:req.body.status,
        priority:req.body.priority
        

    })
    res.status(201).send(task)
    
    // .catch((user)=>{
    //     res.status(501).send({
    //         error:"Could not add new task"
    //     })

    })

route.get('/:id/notes', async (req,res)=>{
    const id = parseInt(req.params.id)
    const notes = await Note.findAll({where: {task_id: id}})
    res.send(notes)
})

route.post('/:id/notes',(req,res)=>{
    const id = parseInt(req.params.id);
    Note.Create({
        note_id:id,
        note:req.body.note
        

    }).then((task)=>{
        res.status(201).send(task)
    })
    .catch((user)=>{
        res.status(501).send({
            error:"Could not add new task"
        })

    })
})

route.patch('/:id/notes',async (req,res)=>{
    const id = parseInt(req.params.id);
    await Note.update({
        note_id:id,
        note:"updating the notes using patch"
    })
})
    


exports = module.exports =route;