require('dotenv').config()
const express = require('express');

const app = express();

//DB connect file here, v2 adding connect

const connectDB = require('./Db/Connect')

//Middleware

const errorHandlerMW = require('./Middleware/ErrHandler')
const notFound = require('./Middleware/notFound')

app.use(express.json()) //Not useful but john said make it a habit

//Routes

app.get('/',(req, res)=>{
    res.send(`<h1> Store API's home get req success </h1> <a href ="/api/v1/products" > Products route here </a>`)
})

app.use('/api/v1/products', /*Controllers here*/)

//ErrorHMW
app.use(notFound);
app.use(errorHandlerMW);


const port = process.env.port || 3000 

const start = async()=>{

    try {

        //ConnectDB coming later/ Updating Connect
        await connectDB(process.env.MONGODB_URI)

        app.listen(port,console.log(`Server is listening at port ${port}`))
        
    } catch (error) {
        console.log(error)
        
    }
}

console.log('Hi basic app working');
start();