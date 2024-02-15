const express = require ('express')
const app = express();
const port =3000; 
const users = require('./users.js');
const morgan = require('morgan');

app.use(morgan('tiny'));

app.get("/", (req,res) => {
    res.send("This is the home page")
});

app.get("/users", (req,res) => {
    res.json({
        Status: 'success',
        Message: 'response success',
        Data: users,
    })
});

app.get('/users/:name', (req, res) => {
    const requestedName = req.params.name.toLowerCase(); // Ubah nama menjadi lowercase
    const user = users.find((user) => user.name.toLowerCase() === requestedName);//params

    if (user) {
        res.json({
          status: 'success',
          message: 'Data found',
          data: user,
        });
    } else {
        res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
    }
});
    
app.use((req,res, next) => {
    res.json({
        status:'error',
        message: 'resource tidak ditemukan'
    })
})

const errorHandling = (err, req, res, next) => {
    res.json({
        status: 'error',
        message: 'terjadi kesalahan pada server'
    })
}
app.use(errorHandling);
app.listen(port,() => 
    console.log(`Server running at http://localhost:${port}`)
);