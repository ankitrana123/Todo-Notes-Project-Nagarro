const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/todos.db',
  })

  const Notes1 =db.define('NotesTable',{ 
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      
    },
    task_id: {                         //--> foreign key PK can have multiple FK (1:M rel)
        type:Sequelize.INTEGER,         //one taskid can have multiple task_id
        // required:true,
        // allowNull:false
      },
    note:{
        // type:Sequelize.ARRAY(Sequelize.STRING),
        type:Sequelize.STRING,
        allowNull:true
    }
  })

  const Tasks1 = db.define('TasksTable', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      
    },
    title: {
      type: Sequelize.STRING(40),
      allowNull: false,
      
    },
    description:{
        type:Sequelize.STRING(500),
        allowNull:true,
    },
    duedate:{
        type:Sequelize.DATE
        ,allowNull:false
    },
    status:{
        type:Sequelize.STRING(10),
        allowNull:false,
        defaultValue:"Incomplete"
    },
    priority:{
        type:Sequelize.STRING(10),
        allowNull:false
        ,defaultValue:"Medium"
    },
       
   
  })
 


  
  async function task() {
    
  
    await db.sync({ force: true })
  
    await Tasks1.bulkCreate([
      {
         id:1,title:"Go to play ground",description:"For playing cricket",
         duedate:"12-04-2020",status:"Incomplete",priority:"High",
  },
      { 
        id:2,title:"Go to Gym ",description:"For Body Building",
      duedate:'15-04-2020',status:"Complete",priority:"Medium",
    }
    ])

    await Notes1.bulkCreate([
        {task_id:1,note:"Have to go to play tommorrow"},
        {task_id:2,note:"Have to go to morning walk tommorrow"},
        {task_id:3,note:"Have to go to Gym tommorrow"}
    ])
  }
  
   task()


  db.sync()
  .then(()=>console.log("Database has been synced"))
  .catch((err)=>console.error("Error creating the database"))

  

  module.exports = {
      Tasks1,db,Notes1
  }