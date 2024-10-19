const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

// Connect to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Check if db connection works
db.connect((err) => {
    if(err) return console.log("Error connecting to mysql db");
    
    console.log("Connected to mysql successfully as id: ", db.threadId)

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    
    // Question 1 Retrieving all patients displaying their ids, names and date of birth
    app.get('/data', (req, res) => {
        db.query('SELECT * FROM patients', (err, results) => {
            if(err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            }else {
                res.render('data', {results: results});
            }
        });
    });

    // Question 2 displaying all providers with their names and specialty
    app.get('/providers', (req, res) => {
        db.query('SELECT * FROM providers', (err, results) => {
            if(err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            }else {
                res.render('providers', {results: results});
            }
        });

    });

    // Question 3 retrieving all patients by their first name
    app.get('/patients', (req,res) => {
        db.query('SELECT * FROM patients', (err, results) => {
            if(err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            }else {
                res.render('patients', {results: results});
            }
        });
    });

    // Question 4 Retrieve all providers by their specialty
    app.get('/providers', (req,res) => {
        db.query('SELECT * FROM providers', (err,results) => {
            if(err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            }else {
                res.render('providers', {results: results});
            }
        });
    });

    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);

        // Send a message to the browser
        console.log('Sending message to the browser...');
        app.get('/', (req, res) => {
            res.send('Server started successfully!')
        });
    });
});

