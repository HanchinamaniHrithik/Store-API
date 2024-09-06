require('dotenv').config();
const express = require('express');
const app = express();

const Tasks = require('./Routes/Tasks')


const connectedDB = require('./Db/Connect')



//middle

app.use(express.json())

//routes
app.get('/hello', (req,res)=>{
    res.send(`Task Manager app`)
})

app.use('/api/v1/tasks', Tasks)
const port =3001;

const start = async()=>{
    try {
        await connectedDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server Listening on port ${port}... `) )
    } catch (error) {
        console.log(error)
    }
}

start()