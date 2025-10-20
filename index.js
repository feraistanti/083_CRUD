const express = require('express')
let mysql = require('mysql');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mahasiswa',
})

db.connect((err) => {
    if (er) {
        console.error('Error connection to Mysql:' + err.stack);
        return;
    }
})

//Buat Method  GET dan POST

//GET
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if(err) {
            console.error('Error executing query:0' + err.stack);
        return;
        }
        res.json(result);
    });
});

app.post('/api/users', (req, res) =>{
    const { nama, nim, kelas} = req.body;

   