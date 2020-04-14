const Task = require('../../db').Tasks1
const Note = require('../../db').Notes1
const route = require('express').Router()
const { Op } = require("sequelize");

//get all notes
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

//get a single note with id
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

//get notes by some id
route.get('/:id/notes', async (req,res)=>{
    const id = parseInt(req.params.id)
    const notes = await Note.findAll({where: {task_id: id}})
    res.send(notes)
})

// Add a new todo
route.post('/', async (req, res) => {
   
    const newTask = await Task.create({
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
        duedate: req.body.duedate,
        priority: req.body.priority
    })
    res.status(201).send({
        success: 'New task added'
    })
});

//post a note using id
route.post('/:id/notes',(req,res)=>{
    const id = parseInt(req.params.id);
    Note.create({
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

//update a note using its id
route.patch('/:id',async (req,res)=>{
    const id = parseInt(req.params.id);
     await Task.update({
         
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
        duedate: req.body.duedate,
        priority: req.body.priority
    },{
        where: {id: this.id}
    })
    res.status(201).send({
        success: ' task updated succesfully'
    })
})
    


exports = module.exports =route;