const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@cluster0.lblyw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 

async function run() {
    try {
      await client.connect();
      const dataCollection = client.db("database").collection('datas');
      app.get('/datas', async (req, res) => {
        const query = {};
        const cursor = dataCollection.find(query);
        const tools = await cursor.toArray();
        res.send(tools);
      });
    }
    finally {
        // await client.close();
      }
}
run().catch(console.dir);



// middleware
app.use(cors());
app.use(express.json());
 
app.get('/', (req, res) => {
   res.send('Running server!')
})
  app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})
