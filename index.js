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

    if (!nama || !nim|| !kelas) {
        return res.status(400).json({ message: 'nama, nim, kelas wajib diisi'});
    }
    db.query(
        'INSERT INTO mahasiswa (nama, nim, kelas) VALUES (?>, ?, ?)',
        [nama, nim, kelas],
        (err, results) => {
            if(err) {
                console.error(err);
                return res.status(500).json({mesage: 'Database Error'});
            }

            res.status(201).json({ message: 'User created successfully'});
        }
    )
});

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const {nama, nim, kelas} = req.body;
    db.query(
        'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ?, WHERE id = ?',
        [nama, nim, kelas, userId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database' });
            }
            res.json({ message: 'User update successfully'});
        }
    );
});

app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM mahasiswa WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database Error' });
    }
    res.json({ message: 'User deleted successfully' });
  });
});