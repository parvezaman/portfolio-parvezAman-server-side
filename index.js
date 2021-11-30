const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;


const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kbuol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db("portfolio-parvez-aman");
        const test = database.collection("test");
        const myProjects = database.collection("my-projects");

        // my projects related codes start  my projects related codes start     my projects related codes start

        app.get('/myprojects', async (req, res) => {
            const cursor = myProjects.find({});
            const projects = await cursor.toArray();
            res.send(projects);
        });
        // Get specific project
        app.get('/myprojects/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const project = await myProjects.findOne(query);
            res.json(project);
        });
        // my projects related codes end    my projects related codes end   my projects related codes end

        
        // const result = await test.insertOne(doc);
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World! portfolio Parvez Aman server Running!!!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
