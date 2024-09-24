
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


const breads = [

    {id:1, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/ghgh.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:2, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/rre.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:3, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/trrt.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:4, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/j.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:5, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/666662.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:6, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/fgfgfg.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:7, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/gfgffg.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:8, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/fgfgr.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' }


]

app.get('/breads', (req, res) => {
  res.send(breads)
})


////////////////////////////////////////mongoDB/////////////////////////////


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

   

    
    //create//

    app.post('/users',  async(req, res) => {

      const users = req.body 
      console.log(users) 
      const result = await userCollection.insertOne(users)
      res.send(result)
  
    }) 
    //create//

    //read// 

    app.get('/users', async(req, res) => {
     
         const cursor = userCollection.find();
         const result = await cursor.toArray();
         res.send(result)
 

    })
    //read//


    //delete//
      
    app.delete('/users/:id', async(req, res) => {
     
       const id = req.params.id 
       const query = { _id: new ObjectId(id)}
       const result = await userCollection.deleteOne(query)
       res.send(result)

    })
    //delete//


    //update// 
    
    
    app.get('/users/:id', async(req, res) => {
     
      const id = req.params.id 
      const query = { _id: new ObjectId(id)}
      const result = await userCollection.findOne(query)
      res.send(result)

   })

  
    app.put('/users/:id', async(req, res) => {
     
      const id = req.params.id 
      const upUser = req.body 
      console.log(id, upUser)
      const filter = { _id: new ObjectId(id)} 
      const option = {upsert: true}
      const upSer = {
        
        $set: {
          name: upUser.name,
          Chef: upUser.Chef,
          Supplier: upUser.Supplier,
          PhotoUrl: upUser.PhotoUrl,
          Taste: upUser.Taste,
          Category: upUser.Category,
          Details: upUser.Details
        }   
 
      }  
 
      const result = await userCollection.updateOne(filter, option, upSer)
      res.send(result)

 

   })
 
 
 
    //update//





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