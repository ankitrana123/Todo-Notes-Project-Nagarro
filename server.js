var PORT = process.env.PORT || 2223 
const express = require('express')
const app = express();

const path = require('path')
app.use('/',express.static(path.join(__dirname,'public')))//--> index.html file is visible here

app.use('/',express.json())
app.use('/',express.urlencoded({extended:true}))

app.use('/api',require('./routes/api').route) //--> include the index.js file 


app.listen(PORT,()=>console.log("server started at http://localhost:2222"));