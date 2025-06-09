
const { MongoClient } = require('mongodb');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const client = new MongoClient("mongodb+srv://RobertMF:zVz8C3as1iXclvIV@cluster0.jrj3qzj.mongodb.net/");

const app = express();
const PORT = 3000;


app.get("/", async (req, res) => {

    try {
        const db = client.db("sample_mflix");
        const collection = db.collection("movies");
        const results = await collection.find({}, { projection: { _id: 0, title: 1, poster: 1, year: 1 } }).sort({ year: -1 }).limit(10).toArray();

        console.log(results);
        res.json(results);
    } catch (err) {
        console.log(err.message);
    }
}


)

async function start() {
    try {
        await client.connect();


        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        })




    } catch (err) {
        console.log(err.message);
    }

}

start();


// app.use(express.json());
// app.use(express.urlencoded({ extended: true}));

// app.get('/', (req, res) => {
//   const filePath = path.join(__dirname, 'views', 'home.ejs');
//   res.sendFile(filePath);
// });
