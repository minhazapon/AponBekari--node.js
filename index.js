
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());

console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)


app.get('/', (req, res) => {
  res.send(' This is apon Bekari Server ')
})


////////////////////////////////////////mongoDB/////////////////////////////


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ruz4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // Connect the client to the server	(optional starting in v4.7)
     
    const database = client.db('usersDB') 
    const userCollection = database.collection('users')

    //crud//

    app.post('/users',  async(req, res) => {

        const users = req.body 
        console.log(users) 
        const result = await userCollection.insertOne(users)
        console.log(result)
        res.send(result)
    
    })

    
    //create//

    


    //create//





    //crud//


    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


////////////////////////////////////////mongoDB/////////////////////////////

app.listen(port, () => {
  console.log(` Apon Bekari port ${port}`)
})