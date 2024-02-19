const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connect = require('./db/conn.js')
const router = require('./router/route.js')

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8000;

app.get('/', (req, res) =>{
    res.status(201).json('home get request');
});

// api route
app.use('/api', router)

connect().then(() =>{
    try{
        app.listen(port, () =>{
            console.log(`Server connect to http://localhost:${port}`);
        })
    }catch(error){
        console.log('cannot connect to server')
    }
}).catch(error => {
    console.log("invalid database connection")
})
